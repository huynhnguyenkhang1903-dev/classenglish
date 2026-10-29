/**
 * Exam Manager Module
 * Coordinates exam flow, countdown timer, question navigation,
 * state persistence, and authentic TOEIC/IELTS scoring.
 */

export class ExamManager {
  constructor(options = {}) {
    this.currentExam = null;
    this.currentQuestionIndex = 0;
    this.answers = {}; // { questionId: answerValue }
    this.flags = new Set(); // Set of flagged questionIds
    this.mode = "exam"; // "exam" | "practice"
    this.timeRemaining = 0;
    this.timerInterval = null;
    this.isSubmitted = false;
    this.results = null;

    this.onTick = options.onTick || null;
    this.onTimeUp = options.onTimeUp || null;
    this.onStateChange = options.onStateChange || null;
  }

  startExam(exam, mode = "exam") {
    this.currentExam = exam;
    this.currentQuestionIndex = 0;
    this.answers = {};
    this.flags.clear();
    this.mode = mode;
    this.isSubmitted = false;
    this.results = null;

    // Timer setup
    this.stopTimer();
    this.timeRemaining = (exam.durationMinutes || 45) * 60;

    if (this.mode === "exam") {
      this.startTimer();
    }

    if (this.onStateChange) this.onStateChange();
  }

  startTimer() {
    this.stopTimer();
    this.timerInterval = setInterval(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
        if (this.onTick) this.onTick(this.formatTime(this.timeRemaining), this.timeRemaining);
      } else {
        this.stopTimer();
        if (this.onTimeUp) this.onTimeUp();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  getCurrentQuestion() {
    if (!this.currentExam || !this.currentExam.questions) return null;
    return this.currentExam.questions[this.currentQuestionIndex] || null;
  }

  goToQuestion(index) {
    if (!this.currentExam || index < 0 || index >= this.currentExam.questions.length) return;
    this.currentQuestionIndex = index;
    if (this.onStateChange) this.onStateChange();
  }

  nextQuestion() {
    if (!this.currentExam) return;
    if (this.currentQuestionIndex < this.currentExam.questions.length - 1) {
      this.currentQuestionIndex++;
      if (this.onStateChange) this.onStateChange();
    }
  }

  prevQuestion() {
    if (!this.currentExam) return;
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      if (this.onStateChange) this.onStateChange();
    }
  }

  selectAnswer(questionId, value) {
    this.answers[questionId] = value;
    if (this.onStateChange) this.onStateChange();
  }

  toggleFlag(questionId) {
    if (this.flags.has(questionId)) {
      this.flags.delete(questionId);
    } else {
      this.flags.add(questionId);
    }
    if (this.onStateChange) this.onStateChange();
  }

  // Calculate TOEIC or IELTS score
  submitExam() {
    this.stopTimer();
    this.isSubmitted = true;

    const questions = this.currentExam.questions || [];
    let correctCount = 0;
    let answeredCount = 0;
    const detailList = [];

    questions.forEach((q, idx) => {
      const userAns = this.answers[q.id];
      const hasAnswered = userAns !== undefined && userAns !== null && userAns !== "";
      if (hasAnswered) answeredCount++;

      let isCorrect = false;
      if (q.type === "single-choice") {
        isCorrect = (userAns === q.answer);
      } else if (q.type === "writing-essay" || q.type === "speaking-record") {
        // Qualitative tasks
        isCorrect = hasAnswered;
      }

      if (isCorrect) correctCount++;

      detailList.push({
        index: idx + 1,
        question: q,
        userAnswer: userAns || null,
        correctAnswer: q.answer || null,
        isCorrect: isCorrect,
        isAnswered: hasAnswered,
        isFlagged: this.flags.has(q.id)
      });
    });

    const totalQuestions = questions.length;
    const rawPercentage = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;

    let scaledScore = "";
    let bandLevel = "";

    if (this.currentExam.category === "toeic") {
      // Approximate TOEIC scaled score out of 495 (per skill) or 990
      const maxScore = (this.currentExam.skill === "listening" || this.currentExam.skill === "reading") ? 495 : 200;
      const estimated = Math.round((correctCount / (totalQuestions || 1)) * (maxScore - 20) + 20);
      scaledScore = `${estimated} / ${maxScore}`;

      if (estimated >= 450) bandLevel = "TOEIC 850-990 (C1 Advanced)";
      else if (estimated >= 380) bandLevel = "TOEIC 750-845 (B2 Upper-Intermediate)";
      else if (estimated >= 275) bandLevel = "TOEIC 550-745 (B1 Intermediate)";
      else if (estimated >= 150) bandLevel = "TOEIC 350-545 (A2 Elementary)";
      else bandLevel = "TOEIC 10-345 (A1 Beginner)";
    } else {
      // IELTS Band Score mapping (1.0 to 9.0)
      const ratio = correctCount / (totalQuestions || 1);
      let band = 1.0;
      if (ratio >= 0.95) band = 9.0;
      else if (ratio >= 0.88) band = 8.5;
      else if (ratio >= 0.80) band = 8.0;
      else if (ratio >= 0.72) band = 7.5;
      else if (ratio >= 0.65) band = 7.0;
      else if (ratio >= 0.58) band = 6.5;
      else if (ratio >= 0.50) band = 6.0;
      else if (ratio >= 0.40) band = 5.5;
      else if (ratio >= 0.30) band = 5.0;
      else if (ratio >= 0.20) band = 4.5;
      else band = 4.0;

      scaledScore = `Band ${band.toFixed(1)}`;
      bandLevel = `IELTS ${scaledScore} (Cefr ${band >= 7.0 ? "C1" : band >= 5.5 ? "B2" : "B1"})`;
    }

    const elapsedSeconds = ((this.currentExam.durationMinutes || 45) * 60) - this.timeRemaining;

    this.results = {
      examId: this.currentExam.id,
      examTitle: this.currentExam.title,
      category: this.currentExam.category,
      skill: this.currentExam.skill,
      totalQuestions,
      answeredCount,
      correctCount,
      incorrectCount: totalQuestions - correctCount,
      rawPercentage: rawPercentage.toFixed(1),
      scaledScore,
      bandLevel,
      elapsedTime: this.formatTime(Math.max(0, elapsedSeconds)),
      submittedAt: new Date().toLocaleString("vi-VN"),
      detailList
    };

    // Save to test history
    this.saveTestHistory(this.results);

    if (this.onStateChange) this.onStateChange();
    return this.results;
  }

  saveTestHistory(result) {
    try {
      const history = JSON.parse(localStorage.getItem("english_exam_history") || "[]");
      history.unshift({
        id: "hist-" + Date.now(),
        ...result
      });
      // Keep last 50 tests
      localStorage.setItem("english_exam_history", JSON.stringify(history.slice(0, 50)));
    } catch (e) {
      console.error("Failed to save exam history:", e);
    }
  }

  getTestHistory() {
    try {
      return JSON.parse(localStorage.getItem("english_exam_history") || "[]");
    } catch (e) {
      return [];
    }
  }

  clearTestHistory() {
    localStorage.removeItem("english_exam_history");
  }
}
