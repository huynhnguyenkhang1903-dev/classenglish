/**
 * Importer Module
 * Supports:
 * 1. JSON file upload & validation
 * 2. Smart Plain-Text / Word format parser
 * 3. Sample template generation (JSON & Text)
 * 4. LocalStorage persistence & Exam Exporting
 */

export class ExamImporter {
  constructor(storageKey = "custom_english_exams") {
    this.storageKey = storageKey;
  }

  // Retrieve custom exams from localStorage
  getCustomExams() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Error reading custom exams from localStorage:", e);
      return [];
    }
  }

  // Save custom exams list
  saveCustomExams(exams) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(exams));
      return true;
    } catch (e) {
      console.error("Error saving custom exams to localStorage:", e);
      return false;
    }
  }

  // Add single exam
  addCustomExam(examData) {
    const exams = this.getCustomExams();
    // Check if ID already exists, generate new ID if needed
    if (!examData.id || exams.some(e => e.id === examData.id)) {
      examData.id = "custom-" + Date.now();
    }
    examData.isCustom = true;
    examData.createdAt = new Date().toISOString();
    exams.unshift(examData);
    this.saveCustomExams(exams);
    return examData;
  }

  // Delete an imported exam by ID
  deleteCustomExam(id) {
    let exams = this.getCustomExams();
    exams = exams.filter(e => e.id !== id);
    this.saveCustomExams(exams);
  }

  // Clear all custom exams
  clearAllCustomExams() {
    localStorage.removeItem(this.storageKey);
  }

  // Validate JSON Exam Structure
  validateExamObject(obj) {
    const errors = [];
    if (!obj.title || typeof obj.title !== "string") {
      errors.push("Tiêu đề đề thi ('title') không được để trống.");
    }
    if (!obj.category || !["toeic", "ielts"].includes(obj.category.toLowerCase())) {
      errors.push("Danh mục ('category') phải là 'toeic' hoặc 'ielts'.");
    }
    if (!obj.skill || !["listening", "reading", "speaking", "writing"].includes(obj.skill.toLowerCase())) {
      errors.push("Kỹ năng ('skill') phải là một trong các giá trị: listening, reading, speaking, writing.");
    }
    if (!obj.questions || !Array.isArray(obj.questions) || obj.questions.length === 0) {
      errors.push("Đề thi cần có ít nhất 1 câu hỏi trong mảng 'questions'.");
    } else {
      obj.questions.forEach((q, idx) => {
        if (!q.prompt && !q.passageText) {
          errors.push(`Câu số ${idx + 1}: Thiếu nội dung câu hỏi ('prompt').`);
        }
        if (q.type === "single-choice" && (!q.options || q.options.length < 2)) {
          errors.push(`Câu số ${idx + 1}: Câu hỏi trắc nghiệm cần ít nhất 2 đáp án lựa chọn.`);
        }
        if (q.type === "single-choice" && !q.answer) {
          errors.push(`Câu số ${idx + 1}: Chưa thiết lập đáp án đúng ('answer').`);
        }
      });
    }

    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }

  // Parse Text / Word / Markdown Exam format
  parsePlainTextExam(text) {
    const lines = text.split(/\r?\n/);
    const exam = {
      title: "Đề thi tự nhập",
      category: "toeic",
      skill: "reading",
      durationMinutes: 45,
      instructions: "Đề thi được tạo từ bộ nhập thông minh",
      questions: []
    };

    let currentPassage = "";
    let currentQuestion = null;
    let inPassageBlock = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Header directives: [Title: ...], [Category: ...], [Skill: ...], [Time: ...]
      if (line.match(/^\[?(Title|Tên đề|Tiêu đề)\s*[:=]\s*(.*)\]?$/i)) {
        exam.title = line.replace(/^\[?(Title|Tên đề|Tiêu đề)\s*[:=]\s*/i, "").replace(/\]$/, "").trim();
        continue;
      }
      if (line.match(/^\[?(Category|Loại|Kỳ thi)\s*[:=]\s*(.*)\]?$/i)) {
        const val = line.replace(/^\[?(Category|Loại|Kỳ thi)\s*[:=]\s*/i, "").replace(/\]$/, "").trim().toLowerCase();
        exam.category = val.includes("ielts") ? "ielts" : "toeic";
        continue;
      }
      if (line.match(/^\[?(Skill|Kỹ năng|Phần thi)\s*[:=]\s*(.*)\]?$/i)) {
        const val = line.replace(/^\[?(Skill|Kỹ năng|Phần thi)\s*[:=]\s*/i, "").replace(/\]$/, "").trim().toLowerCase();
        if (val.includes("listen") || val.includes("nghe")) exam.skill = "listening";
        else if (val.includes("read") || val.includes("đọc")) exam.skill = "reading";
        else if (val.includes("speak") || val.includes("nói")) exam.skill = "speaking";
        else if (val.includes("write") || val.includes("viết")) exam.skill = "writing";
        continue;
      }
      if (line.match(/^\[?(Duration|Time|Thời gian|Phút)\s*[:=]\s*(\d+)/i)) {
        const match = line.match(/\d+/);
        if (match) exam.durationMinutes = parseInt(match[0], 10);
        continue;
      }

      // Passage block detection
      if (line.match(/^\[?(Passage|Đoạn văn|Bài đọc|Transcript)\]?/i)) {
        inPassageBlock = true;
        currentPassage = "";
        continue;
      }

      // Question detection: Question 1:, Câu 1:, 1., 1)
      const qMatch = line.match(/^(\[?Question\s*\d+|Câu\s*\d+|\d+[\.\)])\s*[:\.]?\s*(.*)/i);
      if (qMatch) {
        inPassageBlock = false;
        if (currentQuestion) {
          exam.questions.push(currentQuestion);
        }
        currentQuestion = {
          id: "cq-" + (exam.questions.length + 1),
          part: exam.skill === "listening" ? "Listening Question" : "Reading Question",
          type: "single-choice",
          prompt: qMatch[2] ? qMatch[2].trim() : "",
          options: [],
          answer: "",
          explanation: "",
          passageText: currentPassage || undefined
        };
        continue;
      }

      // Inside passage block
      if (inPassageBlock) {
        currentPassage += (currentPassage ? "\n" : "") + line;
        continue;
      }

      // Options detection: A., B., C., D. or A), B), C), D)
      const optMatch = line.match(/^([A-D])[\.\)]\s*(.*)/i);
      if (optMatch && currentQuestion) {
        const key = optMatch[1].toUpperCase();
        const textVal = optMatch[2].trim();
        currentQuestion.options.push({ key, text: textVal });
        continue;
      }

      // Answer detection: Answer: A, Đáp án: A
      const ansMatch = line.match(/^(Answer|Đáp án|Key)\s*[:=]\s*([A-D])/i);
      if (ansMatch && currentQuestion) {
        currentQuestion.answer = ansMatch[2].toUpperCase();
        continue;
      }

      // Explanation detection: Explanation: ..., Giải thích: ...
      const expMatch = line.match(/^(Explanation|Explain|Giải thích)\s*[:=]\s*(.*)/i);
      if (expMatch && currentQuestion) {
        currentQuestion.explanation = expMatch[2].trim();
        continue;
      }

      // Extra prompt lines if current question doesn't have options yet
      if (currentQuestion && currentQuestion.options.length === 0) {
        currentQuestion.prompt += (currentQuestion.prompt ? " " : "") + line;
      }
    }

    if (currentQuestion) {
      exam.questions.push(currentQuestion);
    }

    // Default total questions count
    exam.totalQuestions = exam.questions.length;
    exam.subtitle = `Đề thi gồm ${exam.totalQuestions} câu hỏi được nhập tự động`;

    return exam;
  }

  // Generate Sample JSON template string for download
  getSampleJsonTemplate() {
    const template = {
      title: "Đề thi TOEIC Reading Mẫu 2024",
      category: "toeic",
      skill: "reading",
      durationMinutes: 75,
      instructions: "Đọc kỹ câu hỏi và các phương án trả lời.",
      questions: [
        {
          id: "q1",
          part: "Part 5: Incomplete Sentences",
          type: "single-choice",
          prompt: "The marketing director announced that the company will ______ a new branch next month.",
          options: [
            { key: "A", text: "open" },
            { key: "B", text: "opening" },
            { key: "C", text: "opened" },
            { key: "D", text: "opener" }
          ],
          answer: "A",
          explanation: "Sau trợ động từ tương lai 'will' dùng động từ nguyên mẫu không 'to' (open)."
        },
        {
          id: "q2",
          part: "Part 7: Reading Comprehension",
          type: "single-choice",
          passageText: "Dear Employees,\nPlease note that our main server will undergo maintenance on Sunday from 2 AM to 6 AM.\nSincerely, IT Support Team",
          prompt: "What will happen on Sunday morning?",
          options: [
            { key: "A", text: "An office party" },
            { key: "B", text: "Server maintenance" },
            { key: "C", text: "A client visit" },
            { key: "D", text: "New staff training" }
          ],
          answer: "B",
          explanation: "Email nêu rõ: 'main server will undergo maintenance on Sunday'."
        }
      ]
    };
    return JSON.stringify(template, null, 2);
  }

  // Generate Sample Text template string for copy-pasting
  getSampleTextTemplate() {
    return `[Title: Đề Thi Thử TOEIC Part 5 & 7 Siêu Nhanh]
[Category: TOEIC]
[Skill: Reading]
[Time: 45]

[Passage]
MEMO: All staff members must submit their quarterly expense receipts to the finance department by this Friday at 5:00 PM. Late submissions will not be reimbursed until the following month.

Question 1: What is the deadline for expense submissions?
A. Friday at 5:00 PM
B. Next Monday morning
C. At the end of the year
D. Today before noon
Answer: A
Explanation: Đoạn thông báo ghi rõ: 'by this Friday at 5:00 PM'.

Question 2: What happens if an employee submits their receipt late?
A. They receive a penalty fee
B. Their reimbursement is delayed to the following month
C. They must attend a financial meeting
D. Their contract is terminated
Answer: B
Explanation: 'Late submissions will not be reimbursed until the following month'.

Question 3: The software update will be installed _______ to prevent disruptions during working hours.
A. overnight
B. over
C. night
D. nightly
Answer: A
Explanation: Cần phó từ chỉ thời gian 'overnight' (qua đêm/vào ban đêm) để bổ nghĩa cho hành động cài đặt.`;
  }

  // Export current exam to downloadable JSON file
  exportExamToFile(exam) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exam, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${(exam.title || "exam").replace(/[^a-zA-Z0-9]/g, "_")}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }
}
