/**
 * OmniPrep English - Main Application Controller
 * Bright, Clean & High-Legibility UI
 * Supports:
 * - Curated ETS 2024 & Cambridge IELTS 19 Actual Tests
 * - 1-Click Online Auto-Collector (Tự thu thập các bộ đề thi thật mới nhất)
 * - Real-time Exam Search & Skill Filtering
 * - Full 4-skill testing: Listening, Reading, Speaking (Micro + Waveform), Writing (Editor + Word count)
 * - 3D Flashcard vocabulary with authentic TTS pronunciation
 */

import { DEFAULT_EXAMS, DEFAULT_VOCABULARY } from './data/defaultExams.js';
import { ONLINE_ARCHIVE_EXAMS } from './data/onlineExamArchive.js';
import { AudioManager } from './modules/audioManager.js';
import { ExamManager } from './modules/examManager.js';
import { ExamImporter } from './modules/importer.js';
import { VocabularyManager } from './modules/vocabularyManager.js';

class App {
  constructor() {
    this.audioManager = new AudioManager();
    this.importer = new ExamImporter();
    this.vocabManager = new VocabularyManager(DEFAULT_VOCABULARY, this.audioManager);
    this.examManager = new ExamManager({
      onTick: (formattedTime, remainingSec) => this.handleTimerTick(formattedTime, remainingSec),
      onTimeUp: () => this.handleTimeUp(),
      onStateChange: () => this.renderActiveQuestion()
    });

    this.allExams = [];
    this.currentToeicFilter = "all";
    this.currentIeltsFilter = "all";
    this.toeicSearchKeyword = "";
    this.ieltsSearchKeyword = "";
    this.currentReviewFilter = "all";

    this.init();
  }

  init() {
    this.loadTheme();
    this.loadExams();
    this.bindNavigation();
    this.bindThemeToggle();
    this.bindToeicFilters();
    this.bindIeltsFilters();
    this.bindSearchInputs();
    this.bindAutoCollector();
    this.bindImporterEvents();
    this.bindVocabEvents();
    this.bindExamControls();
    this.bindHistoryEvents();
    this.bindHighlighter();

    // Render initial state
    this.renderExams();
    this.renderVocabCard();
    this.renderHistoryTable();
    this.updateStatsCounters();
  }

  // ==========================================
  // THEME MANAGEMENT (DEFAULT: LIGHT - BRIGHT & CLEAN)
  // ==========================================
  loadTheme() {
    // Default to 'light' for bright, eye-friendly readability
    const savedTheme = localStorage.getItem("omniprep_theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    this.updateThemeIcon(savedTheme);
  }

  bindThemeToggle() {
    const btn = document.getElementById("themeToggleBtn");
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      const nextTheme = current === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", nextTheme);
      localStorage.setItem("omniprep_theme", nextTheme);
      this.updateThemeIcon(nextTheme);
    });
  }

  updateThemeIcon(theme) {
    const icon = document.getElementById("themeIcon");
    if (icon) {
      icon.textContent = theme === "light" ? "🌙" : "☀️";
    }
  }

  // ==========================================
  // EXAM REPOSITORY & AUTO-COLLECTOR
  // ==========================================
  loadExams() {
    const customExams = this.importer.getCustomExams();
    this.allExams = [...customExams, ...DEFAULT_EXAMS];
    this.updateStatsCounters();
  }

  updateStatsCounters() {
    const toeicCount = this.allExams.filter(e => e.category === "toeic").length;
    const ieltsCount = this.allExams.filter(e => e.category === "ielts").length;
    const customCount = this.importer.getCustomExams().length;

    const elToeic = document.getElementById("statToeicCount");
    const elIelts = document.getElementById("statIeltsCount");
    const elCustom = document.getElementById("statCustomCount");
    const elCustomBadge = document.getElementById("customExamsCount");

    if (elToeic) elToeic.textContent = toeicCount;
    if (elIelts) elIelts.textContent = ieltsCount;
    if (elCustom) elCustom.textContent = customCount;
    if (elCustomBadge) elCustomBadge.textContent = customCount;
  }

  // Auto-collect real exams from the online archive into local library
  bindAutoCollector() {
    const autoCollectHandler = () => {
      let addedCount = 0;
      const currentExams = this.importer.getCustomExams();
      const existingIds = new Set(this.allExams.map(e => e.id));

      ONLINE_ARCHIVE_EXAMS.forEach(archiveExam => {
        if (!existingIds.has(archiveExam.id)) {
          archiveExam.isAutoCollected = true;
          this.importer.addCustomExam(archiveExam);
          addedCount++;
        }
      });

      this.loadExams();
      this.renderExams();

      if (addedCount > 0) {
        this.showToast(`⚡ Đã tự động thu thập thành công ${addedCount} bộ đề mới (ETS 2024 & Cambridge 19)!`, "success");
      } else {
        this.showToast("Kho đề của bạn đã được cập nhật toàn bộ các đề thi thật mới nhất!", "info");
      }
    };

    const topBtn = document.getElementById("quickAutoCollectBtn");
    const heroBtn = document.getElementById("heroAutoCollectBtn");
    const syncBannerBtn = document.getElementById("autoSyncArchiveBtn");

    if (topBtn) topBtn.addEventListener("click", autoCollectHandler);
    if (heroBtn) heroBtn.addEventListener("click", autoCollectHandler);
    if (syncBannerBtn) syncBannerBtn.addEventListener("click", autoCollectHandler);
  }

  // ==========================================
  // NAVIGATION & TAB SWITCHING
  // ==========================================
  bindNavigation() {
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
      item.addEventListener("click", () => {
        const targetTab = item.getAttribute("data-tab");
        this.switchTab(targetTab);
      });
    });

    document.getElementById("brandLogoBtn").addEventListener("click", () => {
      this.switchTab("tab-dashboard");
    });

    document.getElementById("heroStartToeicBtn").addEventListener("click", () => {
      this.switchTab("tab-toeic");
    });
    document.getElementById("heroStartIeltsBtn").addEventListener("click", () => {
      this.switchTab("tab-ielts");
    });

    document.querySelectorAll(".quick-skill-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const skill = btn.getAttribute("data-target");
        const category = btn.getAttribute("data-cat");
        if (category === "toeic") {
          this.switchTab("tab-toeic");
          this.setToeicSkillFilter(skill);
        } else {
          this.switchTab("tab-ielts");
          this.setIeltsSkillFilter(skill);
        }
      });
    });
  }

  switchTab(tabId) {
    if (this.examManager.currentExam && !this.examManager.isSubmitted && tabId !== "examActiveWorkspace") {
      if (!confirm("Bạn đang làm bài thi. Bạn có chắc muốn rời đi không? Tiến trình hiện tại sẽ bị hủy.")) {
        return;
      }
      this.exitActiveExam();
    }

    if (tabId !== "examActiveWorkspace") {
      const workspace = document.getElementById("examActiveWorkspace");
      workspace.classList.remove("active");
      workspace.style.display = "none";
    }

    document.querySelectorAll(".nav-item").forEach(nav => {
      if (nav.getAttribute("data-tab") === tabId) {
        nav.classList.add("active");
      } else {
        nav.classList.remove("active");
      }
    });

    document.querySelectorAll(".tab-pane").forEach(pane => {
      if (pane.id === tabId) {
        pane.classList.add("active");
      } else {
        pane.classList.remove("active");
      }
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ==========================================
  // SEARCH BARS (REAL-TIME KEYWORD FILTER)
  // ==========================================
  bindSearchInputs() {
    const toeicInput = document.getElementById("toeicSearchInput");
    if (toeicInput) {
      toeicInput.addEventListener("input", (e) => {
        this.toeicSearchKeyword = e.target.value.toLowerCase().trim();
        this.renderToeicExams();
      });
    }

    const ieltsInput = document.getElementById("ieltsSearchInput");
    if (ieltsInput) {
      ieltsInput.addEventListener("input", (e) => {
        this.ieltsSearchKeyword = e.target.value.toLowerCase().trim();
        this.renderIeltsExams();
      });
    }
  }

  // ==========================================
  // TOEIC & IELTS FILTERS & RENDERING
  // ==========================================
  bindToeicFilters() {
    const buttons = document.querySelectorAll("#toeicSkillTabs .skill-tab-btn");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.currentToeicFilter = btn.getAttribute("data-skill");
        this.renderToeicExams();
      });
    });
  }

  setToeicSkillFilter(skill) {
    const buttons = document.querySelectorAll("#toeicSkillTabs .skill-tab-btn");
    buttons.forEach(b => {
      if (b.getAttribute("data-skill") === skill) b.classList.add("active");
      else b.classList.remove("active");
    });
    this.currentToeicFilter = skill;
    this.renderToeicExams();
  }

  bindIeltsFilters() {
    const buttons = document.querySelectorAll("#ieltsSkillTabs .skill-tab-btn");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.currentIeltsFilter = btn.getAttribute("data-skill");
        this.renderIeltsExams();
      });
    });
  }

  setIeltsSkillFilter(skill) {
    const buttons = document.querySelectorAll("#ieltsSkillTabs .skill-tab-btn");
    buttons.forEach(b => {
      if (b.getAttribute("data-skill") === skill) b.classList.add("active");
      else b.classList.remove("active");
    });
    this.currentIeltsFilter = skill;
    this.renderIeltsExams();
  }

  renderExams() {
    this.renderToeicExams();
    this.renderIeltsExams();
    this.renderCustomExamsList();
  }

  renderToeicExams() {
    const container = document.getElementById("toeicExamsContainer");
    if (!container) return;

    let exams = this.allExams.filter(e => e.category === "toeic");

    if (this.currentToeicFilter !== "all") {
      exams = exams.filter(e => e.skill === this.currentToeicFilter);
    }

    if (this.toeicSearchKeyword) {
      exams = exams.filter(e => 
        (e.title && e.title.toLowerCase().includes(this.toeicSearchKeyword)) ||
        (e.subtitle && e.subtitle.toLowerCase().includes(this.toeicSearchKeyword)) ||
        (e.source && e.source.toLowerCase().includes(this.toeicSearchKeyword)) ||
        (e.tags && e.tags.some(t => t.toLowerCase().includes(this.toeicSearchKeyword)))
      );
    }

    if (!exams.length) {
      container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted); background: var(--bg-card); border-radius: var(--radius-md); border: 1px dashed var(--border-subtle);">Không tìm thấy đề thi TOEIC phù hợp với từ khóa "${this.toeicSearchKeyword || this.currentToeicFilter}".</div>`;
      return;
    }

    container.innerHTML = exams.map(exam => this.createExamCardHtml(exam)).join("");
    this.attachExamCardEvents(container);
  }

  renderIeltsExams() {
    const container = document.getElementById("ieltsExamsContainer");
    if (!container) return;

    let exams = this.allExams.filter(e => e.category === "ielts");

    if (this.currentIeltsFilter !== "all") {
      exams = exams.filter(e => e.skill === this.currentIeltsFilter);
    }

    if (this.ieltsSearchKeyword) {
      exams = exams.filter(e => 
        (e.title && e.title.toLowerCase().includes(this.ieltsSearchKeyword)) ||
        (e.subtitle && e.subtitle.toLowerCase().includes(this.ieltsSearchKeyword)) ||
        (e.source && e.source.toLowerCase().includes(this.ieltsSearchKeyword)) ||
        (e.tags && e.tags.some(t => t.toLowerCase().includes(this.ieltsSearchKeyword)))
      );
    }

    if (!exams.length) {
      container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted); background: var(--bg-card); border-radius: var(--radius-md); border: 1px dashed var(--border-subtle);">Không tìm thấy đề thi IELTS phù hợp với từ khóa "${this.ieltsSearchKeyword || this.currentIeltsFilter}".</div>`;
      return;
    }

    container.innerHTML = exams.map(exam => this.createExamCardHtml(exam)).join("");
    this.attachExamCardEvents(container);
  }

  createExamCardHtml(exam) {
    const skillNameMap = {
      listening: "🎧 Nghe (Listening)",
      reading: "📖 Đọc (Reading)",
      speaking: "🗣️ Nói (Speaking)",
      writing: "✍️ Viết (Writing)"
    };

    return `
      <div class="exam-card" data-exam-id="${exam.id}">
        <div class="exam-card-header">
          <span class="skill-pill ${exam.skill}">${skillNameMap[exam.skill] || exam.skill}</span>
          <span class="source-badge">${exam.source || (exam.isCustom ? "Đã nhập" : "Đề thi thật")}</span>
        </div>
        <h4 class="exam-title">${exam.title}</h4>
        <p class="exam-desc">${exam.subtitle || exam.instructions || "Đề thi đánh giá năng lực tiếng Anh toàn diện."}</p>
        <div class="exam-meta-row">
          <div class="exam-meta-item"><span>⏱️</span> ${exam.durationMinutes || 45} phút</div>
          <div class="exam-meta-item"><span>❓</span> ${exam.questions ? exam.questions.length : (exam.totalQuestions || 0)} câu</div>
          <div class="exam-meta-item"><span>🏷️</span> ${exam.category.toUpperCase()}</div>
        </div>
        <div class="exam-card-actions">
          <button class="btn btn-secondary start-practice-btn" data-id="${exam.id}">
            <span>📖</span> Luyện tập
          </button>
          <button class="btn btn-primary start-exam-btn" data-id="${exam.id}">
            <span>⏱️</span> Thi thử
          </button>
        </div>
      </div>
    `;
  }

  attachExamCardEvents(container) {
    container.querySelectorAll(".start-practice-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        this.launchExam(id, "practice");
      });
    });
    container.querySelectorAll(".start-exam-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        this.launchExam(id, "exam");
      });
    });
  }

  // ==========================================
  // LAUNCHING & RUNNING AN EXAM
  // ==========================================
  launchExam(examId, mode = "exam") {
    const exam = this.allExams.find(e => e.id === examId);
    if (!exam) {
      this.showToast("Không tìm thấy dữ liệu đề thi!", "error");
      return;
    }

    this.examManager.startExam(exam, mode);

    document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));
    const workspace = document.getElementById("examActiveWorkspace");
    workspace.classList.add("active");
    workspace.style.display = "flex";

    document.getElementById("workspaceExamTitle").textContent = exam.title;
    const modeBadge = document.getElementById("workspaceModeBadge");
    modeBadge.textContent = mode === "exam" ? "Thi thử tính giờ" : "Luyện tập tự do";
    modeBadge.className = `exam-mode-badge ${mode}`;

    const timerBox = document.getElementById("workspaceTimerBox");
    if (mode === "practice") {
      timerBox.style.display = "none";
    } else {
      timerBox.style.display = "flex";
      timerBox.classList.remove("warning");
      document.getElementById("workspaceTimerText").textContent = this.examManager.formatTime(exam.durationMinutes * 60);
    }

    this.renderActiveQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.showToast(`Bắt đầu bài thi: ${exam.title}`, "info");
  }

  handleTimerTick(formattedTime, remainingSec) {
    const timerText = document.getElementById("workspaceTimerText");
    const timerBox = document.getElementById("workspaceTimerBox");
    if (timerText) timerText.textContent = formattedTime;

    if (timerBox) {
      if (remainingSec <= 300) {
        timerBox.classList.add("warning");
      } else {
        timerBox.classList.remove("warning");
      }
    }
  }

  handleTimeUp() {
    this.showToast("Hết thời gian làm bài! Hệ thống đang tự động nộp bài...", "warning");
    this.submitCurrentExam();
  }

  exitActiveExam() {
    this.examManager.stopTimer();
    this.audioManager.stopSpeaking();
    this.audioManager.stopRecording();
    this.examManager.currentExam = null;

    const workspace = document.getElementById("examActiveWorkspace");
    workspace.classList.remove("active");
    workspace.style.display = "none";

    this.switchTab("tab-dashboard");
  }

  // ==========================================
  // RENDER ACTIVE QUESTION
  // ==========================================
  renderActiveQuestion() {
    const exam = this.examManager.currentExam;
    if (!exam) return;

    const q = this.examManager.getCurrentQuestion();
    if (!q) return;

    const totalQuestions = exam.questions.length;
    const currentIdx = this.examManager.currentQuestionIndex;

    document.getElementById("workspaceQuestionCounter").textContent = `Câu ${currentIdx + 1} / ${totalQuestions}`;

    const splitLayout = document.getElementById("splitExamLayout");
    const speakingLayout = document.getElementById("speakingExamLayout");
    const writingLayout = document.getElementById("writingExamLayout");

    this.audioManager.stopSpeaking();

    // 1. SPEAKING
    if (exam.skill === "speaking" || q.type === "speaking-record") {
      splitLayout.style.display = "none";
      writingLayout.style.display = "none";
      speakingLayout.style.display = "flex";
      this.renderSpeakingQuestion(q, currentIdx, totalQuestions);
      return;
    }

    // 2. WRITING
    if (exam.skill === "writing" || q.type === "writing-essay") {
      splitLayout.style.display = "none";
      speakingLayout.style.display = "none";
      writingLayout.style.display = "grid";
      this.renderWritingQuestion(q, currentIdx, totalQuestions);
      return;
    }

    // 3. READING / LISTENING SPLIT VIEW
    splitLayout.style.display = "grid";
    speakingLayout.style.display = "none";
    writingLayout.style.display = "none";
    this.renderSplitQuestion(q, currentIdx, totalQuestions);
  }

  renderSplitQuestion(q, currentIdx, totalQuestions) {
    const isListening = this.examManager.currentExam.skill === "listening";

    const audioWidget = document.getElementById("audioPlayerWidget");
    if (isListening) {
      audioWidget.style.display = "block";
      document.getElementById("audioStatusText").textContent = "Nhấn Play để nghe câu hỏi và hội thoại";
      const playBtn = document.getElementById("audioPlayBtn");
      playBtn.onclick = () => {
        const textToSpeak = q.audioText || q.passageText || q.prompt;
        const speed = parseFloat(document.getElementById("audioSpeedSelect").value) || 1.0;
        this.audioManager.speakText(textToSpeak, {
          rate: speed,
          accent: "en-US",
          onStart: () => {
            playBtn.innerHTML = "<span>⏸</span>";
            document.getElementById("audioStatusText").textContent = "Đang phát âm thanh...";
          },
          onEnd: () => {
            playBtn.innerHTML = "<span>▶</span>";
            document.getElementById("audioStatusText").textContent = "Đã phát xong. Nhấn để nghe lại.";
          }
        });
      };
    } else {
      audioWidget.style.display = "none";
    }

    // Context image
    const imgWrapper = document.getElementById("questionContextImageWrapper");
    const imgEl = document.getElementById("questionContextImage");
    if (q.contextImage) {
      imgWrapper.style.display = "block";
      imgEl.src = q.contextImage;
    } else {
      imgWrapper.style.display = "none";
    }

    // Passage text
    const passageContent = document.getElementById("passageTextContent");
    const passageLabel = document.getElementById("passageTypeLabel");
    if (q.passageText) {
      passageLabel.textContent = isListening ? "🎧 PHỤ ĐỀ / AUDIO TRANSCRIPT" : "📄 ĐOẠN VĂN / BÀI ĐỌC HIỂU";
      passageContent.textContent = q.passageText;
    } else if (isListening) {
      passageLabel.textContent = "🎧 THÔNG TIN PHẦN NGHE";
      passageContent.textContent = "Lắng nghe file âm thanh từ trình phát phía trên và lựa chọn câu trả lời tương ứng.";
    } else {
      passageLabel.textContent = "📄 CÂU HỎI ĐỘC LẬP (PART 5)";
      passageContent.textContent = "Chọn từ hoặc cụm từ thích hợp nhất để hoàn thành câu hỏi bên phải.";
    }

    // Right Panel
    document.getElementById("currentQuestionNum").textContent = `Câu hỏi ${currentIdx + 1} (${q.part || "Trắc nghiệm"})`;
    document.getElementById("questionPromptText").textContent = q.prompt || "";

    const flagBtn = document.getElementById("flagQuestionBtn");
    const isFlagged = this.examManager.flags.has(q.id);
    flagBtn.className = `flag-btn ${isFlagged ? "flagged" : ""}`;
    flagBtn.onclick = () => {
      this.examManager.toggleFlag(q.id);
    };

    // Render Options
    const optionsContainer = document.getElementById("optionsListContainer");
    const currentAnswer = this.examManager.answers[q.id];
    const isPractice = this.examManager.mode === "practice";

    optionsContainer.innerHTML = (q.options || []).map(opt => {
      let optionClass = "option-item";
      if (currentAnswer === opt.key) {
        optionClass += " selected";
        if (isPractice) {
          optionClass += (opt.key === q.answer) ? " correct" : " wrong";
        }
      }
      return `
        <div class="${optionClass}" data-key="${opt.key}">
          <div class="option-bubble">${opt.key}</div>
          <div class="option-text">${opt.text}</div>
        </div>
      `;
    }).join("");

    optionsContainer.querySelectorAll(".option-item").forEach(item => {
      item.addEventListener("click", () => {
        const key = item.getAttribute("data-key");
        this.examManager.selectAnswer(q.id, key);
        this.renderActiveQuestion();
      });
    });

    const expBox = document.getElementById("practiceExplanationBox");
    if (isPractice && currentAnswer) {
      expBox.style.display = "block";
      document.getElementById("practiceExplanationText").textContent = q.explanation || "Không có giải thích chi tiết cho câu hỏi này.";
    } else {
      expBox.style.display = "none";
    }

    document.getElementById("prevQuestionBtn").disabled = (currentIdx === 0);
    document.getElementById("nextQuestionBtn").disabled = (currentIdx === totalQuestions - 1);

    this.renderQuestionPalette();
  }

  // Render Speaking Question
  renderSpeakingQuestion(q, currentIdx, totalQuestions) {
    document.getElementById("speakingPromptTitle").textContent = q.part || `Speaking Task ${currentIdx + 1}`;
    document.getElementById("speakingPromptSubtitle").textContent = `Thời gian chuẩn bị: ${q.preparationTime || 30}s • Thời gian nói: ${q.speakingTime || 45}s`;
    document.getElementById("speakingPromptQuestion").textContent = q.prompt || q.passageText || "";

    const examinerVoiceBtn = document.getElementById("playSpeakingPromptAudioBtn");
    examinerVoiceBtn.onclick = () => {
      const speechPrompt = q.audioText || q.prompt;
      this.audioManager.speakText(speechPrompt, { rate: 0.95, accent: "en-US" });
    };

    const recordBtn = document.getElementById("speakingRecordBtn");
    const recordText = document.getElementById("recordBtnText");
    const waveformCanvas = document.getElementById("speakingWaveformCanvas");
    const idleText = document.getElementById("waveformIdleText");
    const transcriptBox = document.getElementById("speakingTranscriptBox");
    const playbackAudio = document.getElementById("speakingPlaybackAudio");

    const existingAnswer = this.examManager.answers[q.id];
    if (existingAnswer && typeof existingAnswer === "string") {
      transcriptBox.textContent = existingAnswer;
    } else {
      transcriptBox.textContent = "(Nội dung bài nói của bạn sẽ hiển thị tại đây khi bạn bắt đầu phát âm...)";
    }

    this.audioManager.onTranscriptUpdate = (text) => {
      transcriptBox.textContent = text;
      this.examManager.selectAnswer(q.id, text);
    };

    recordBtn.className = "record-btn idle";
    recordText.textContent = "Bắt đầu ghi âm";
    idleText.style.display = "block";

    recordBtn.onclick = async () => {
      if (!this.audioManager.isRecording) {
        try {
          await this.audioManager.startRecording(
            waveformCanvas,
            null,
            (audioUrl) => {
              playbackAudio.src = audioUrl;
              playbackAudio.style.display = "block";
              this.examManager.selectAnswer(q.id, transcriptBox.textContent);
            }
          );
          recordBtn.className = "record-btn recording";
          recordText.textContent = "Đang thu âm... Nhấn để Dừng";
          idleText.style.display = "none";
        } catch (err) {
          this.showToast("Không thể kết nối Micro. Hãy cấp quyền microphone trên trình duyệt!", "error");
        }
      } else {
        this.audioManager.stopRecording();
        recordBtn.className = "record-btn idle";
        recordText.textContent = "Ghi âm lại";
        idleText.style.display = "none";
        this.showToast("Đã lưu đoạn ghi âm của bạn!", "success");
      }
    };

    const sampleBox = document.getElementById("speakingSampleContainer");
    const sampleText = document.getElementById("speakingSampleText");
    sampleText.innerHTML = `
      <p style="margin-bottom: 0.75rem;">${q.sampleResponse || "Chưa có bài mẫu cho câu hỏi này."}</p>
      ${q.tips ? `<div style="color: var(--accent-blue); font-size: 0.88rem; font-weight:600;"><strong>Mẹo làm bài:</strong> ${q.tips}</div>` : ""}
    `;
    document.getElementById("toggleSpeakingSampleBtn").onclick = () => {
      sampleBox.style.display = (sampleBox.style.display === "none") ? "block" : "none";
    };

    document.getElementById("prevSpeakingQuestionBtn").disabled = (currentIdx === 0);
    document.getElementById("nextSpeakingQuestionBtn").disabled = (currentIdx === totalQuestions - 1);
  }

  // Render Writing Question
  renderWritingQuestion(q, currentIdx, totalQuestions) {
    document.getElementById("writingPromptTitle").textContent = q.part || `Writing Task ${currentIdx + 1}`;
    document.getElementById("writingPromptDescription").textContent = q.prompt || "";
    document.getElementById("writingMinWords").textContent = q.minWords || 150;

    const rubricList = document.getElementById("writingRubricList");
    if (q.rubric && q.rubric.length) {
      rubricList.innerHTML = q.rubric.map(r => `<li>${r}</li>`).join("");
    } else {
      rubricList.innerHTML = `
        <li>Task Response: Hoàn thành đầy đủ yêu cầu đề bài</li>
        <li>Coherence & Cohesion: Mạch lạc, liên kết câu và đoạn chặt chẽ</li>
        <li>Lexical Resource: Vốn từ vựng phong phú và học thuật</li>
        <li>Grammatical Range: Cấu trúc câu đa dạng và chính xác</li>
      `;
    }

    const sampleBox = document.getElementById("writingSampleEssayBox");
    sampleBox.textContent = q.sampleEssay || "Chưa có bài viết mẫu cho phần này.";
    document.getElementById("toggleWritingSampleBtn").onclick = () => {
      sampleBox.style.display = (sampleBox.style.display === "none") ? "block" : "none";
    };

    const textarea = document.getElementById("writingTextarea");
    const wordCountSpan = document.getElementById("writingWordCount");
    const existingText = this.examManager.answers[q.id] || "";
    textarea.value = existingText;

    const updateWords = () => {
      const words = textarea.value.trim().split(/\s+/).filter(w => w.length > 0);
      wordCountSpan.textContent = words.length;
      this.examManager.selectAnswer(q.id, textarea.value);
    };

    updateWords();
    textarea.oninput = updateWords;

    document.getElementById("prevWritingQuestionBtn").disabled = (currentIdx === 0);
    document.getElementById("nextWritingQuestionBtn").disabled = (currentIdx === totalQuestions - 1);
  }

  renderQuestionPalette() {
    const palette = document.getElementById("questionGridPalette");
    if (!palette) return;

    const exam = this.examManager.currentExam;
    const currentIdx = this.examManager.currentQuestionIndex;

    palette.innerHTML = exam.questions.map((q, idx) => {
      let btnClass = "palette-btn";
      if (idx === currentIdx) btnClass += " current";
      if (this.examManager.answers[q.id]) btnClass += " answered";
      if (this.examManager.flags.has(q.id)) btnClass += " flagged";

      return `<button class="${btnClass}" data-index="${idx}">${idx + 1}</button>`;
    }).join("");

    palette.querySelectorAll(".palette-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-index"), 10);
        this.examManager.goToQuestion(idx);
      });
    });
  }

  bindExamControls() {
    document.getElementById("prevQuestionBtn").addEventListener("click", () => this.examManager.prevQuestion());
    document.getElementById("nextQuestionBtn").addEventListener("click", () => this.examManager.nextQuestion());

    document.getElementById("prevSpeakingQuestionBtn").addEventListener("click", () => this.examManager.prevQuestion());
    document.getElementById("nextSpeakingQuestionBtn").addEventListener("click", () => this.examManager.nextQuestion());

    document.getElementById("prevWritingQuestionBtn").addEventListener("click", () => this.examManager.prevQuestion());
    document.getElementById("nextWritingQuestionBtn").addEventListener("click", () => this.examManager.nextQuestion());

    document.getElementById("exitExamBtn").addEventListener("click", () => {
      if (confirm("Bạn có chắc muốn thoát bài thi hiện tại? Tiến trình sẽ không được lưu.")) {
        this.exitActiveExam();
      }
    });

    document.getElementById("workspaceSubmitExamBtn").addEventListener("click", () => {
      const totalQ = this.examManager.currentExam.questions.length;
      const answeredQ = Object.keys(this.examManager.answers).length;
      if (answeredQ < totalQ) {
        if (!confirm(`Bạn mới hoàn thành ${answeredQ}/${totalQ} câu hỏi. Bạn có chắc muốn nộp bài ngay bây giờ?`)) {
          return;
        }
      }
      this.submitCurrentExam();
    });

    document.getElementById("modalCloseBtn").addEventListener("click", () => {
      document.getElementById("scoreReportModal").classList.remove("active");
      this.exitActiveExam();
    });

    document.getElementById("modalRetakeBtn").addEventListener("click", () => {
      document.getElementById("scoreReportModal").classList.remove("active");
      const currentExam = this.examManager.currentExam;
      if (currentExam) {
        this.launchExam(currentExam.id, this.examManager.mode);
      }
    });

    document.querySelectorAll("#reviewFilterBtns .btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#reviewFilterBtns .btn").forEach(b => b.classList.remove("active-filter"));
        btn.classList.add("active-filter");
        this.currentReviewFilter = btn.getAttribute("data-filter");
        this.renderModalReviewList();
      });
    });
  }

  // ==========================================
  // SUBMISSION & SCORE REPORT
  // ==========================================
  submitCurrentExam() {
    this.audioManager.stopSpeaking();
    this.audioManager.stopRecording();
    const results = this.examManager.submitExam();

    document.getElementById("modalExamTitle").textContent = results.examTitle;
    document.getElementById("modalSubmittedTime").textContent = `Hoàn thành lúc: ${results.submittedAt}`;
    document.getElementById("modalScoreValue").textContent = results.scaledScore;
    document.getElementById("modalScoreScale").textContent = results.category === "toeic" ? "TOEIC Scale" : "IELTS Band Scale";
    document.getElementById("modalBandLevelPill").textContent = results.bandLevel;
    document.getElementById("modalCorrectCount").textContent = `${results.correctCount}/${results.totalQuestions}`;
    document.getElementById("modalIncorrectCount").textContent = results.incorrectCount;
    document.getElementById("modalElapsedTime").textContent = results.elapsedTime;

    this.currentReviewFilter = "all";
    this.renderModalReviewList();

    document.getElementById("scoreReportModal").classList.add("active");
    this.renderHistoryTable();
  }

  renderModalReviewList() {
    const listContainer = document.getElementById("modalReviewList");
    const results = this.examManager.results;
    if (!results || !results.detailList) return;

    let items = results.detailList;
    if (this.currentReviewFilter === "wrong") {
      items = items.filter(d => !d.isCorrect);
    } else if (this.currentReviewFilter === "correct") {
      items = items.filter(d => d.isCorrect);
    }

    if (!items.length) {
      listContainer.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 1.5rem;">Không có câu hỏi nào trong danh mục lọc này.</div>`;
      return;
    }

    listContainer.innerHTML = items.map(d => {
      const statusIcon = d.isCorrect ? "✅ Đúng" : "❌ Sai";
      const statusColor = d.isCorrect ? "var(--accent-emerald)" : "var(--accent-rose)";
      return `
        <div style="padding: 1.15rem; background: var(--bg-tertiary); border-radius: var(--radius-md); border-left: 4px solid ${statusColor};">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem; font-weight: 700;">
            <span>Câu ${d.index}: ${d.question.part || "Trắc nghiệm"}</span>
            <span style="color: ${statusColor}; font-size: 0.85rem;">${statusIcon}</span>
          </div>
          <div style="font-size: 0.95rem; color: var(--text-primary); margin-bottom: 0.5rem;">${d.question.prompt || ""}</div>
          <div style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 0.35rem;">
            <strong>Câu trả lời của bạn:</strong> ${d.userAnswer || "(Bỏ trống)"} | <strong>Đáp án đúng:</strong> ${d.correctAnswer || "Xem bài mẫu"}
          </div>
          ${d.question.explanation ? `
            <div style="font-size: 0.85rem; color: #1e293b; background: #ffffff; padding: 0.65rem 0.85rem; border-radius: var(--radius-sm); margin-top: 0.5rem; border: 1px solid #cbd5e1;">
              <strong style="color: var(--accent-blue);">Giải thích:</strong> ${d.question.explanation}
            </div>
          ` : ""}
        </div>
      `;
    }).join("");
  }

  // ==========================================
  // TEXT HIGHLIGHTER
  // ==========================================
  bindHighlighter() {
    const applyHighlight = (color) => {
      const selection = window.getSelection();
      if (!selection.rangeCount || selection.isCollapsed) return;

      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      span.style.backgroundColor = color;
      span.style.color = "#000000";
      span.style.padding = "2px 4px";
      span.style.borderRadius = "3px";
      span.className = "text-highlight-span";

      try {
        range.surroundContents(span);
        selection.removeAllRanges();
      } catch (e) {
        console.warn("Could not highlight selection:", e);
      }
    };

    document.getElementById("hlYellowBtn").addEventListener("click", () => applyHighlight("#fef08a"));
    document.getElementById("hlGreenBtn").addEventListener("click", () => applyHighlight("#bbf7d0"));
    document.getElementById("hlCyanBtn").addEventListener("click", () => applyHighlight("#a5f3fc"));

    document.getElementById("hlClearBtn").addEventListener("click", () => {
      const passage = document.getElementById("passageTextContent");
      const highlights = passage.querySelectorAll(".text-highlight-span");
      highlights.forEach(h => {
        const parent = h.parentNode;
        while (h.firstChild) parent.insertBefore(h.firstChild, h);
        parent.removeChild(h);
      });
    });
  }

  // ==========================================
  // EXAM IMPORTER
  // ==========================================
  bindImporterEvents() {
    const subtabs = document.querySelectorAll(".importer-subtab-btn");
    subtabs.forEach(btn => {
      btn.addEventListener("click", () => {
        subtabs.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const targetId = btn.getAttribute("data-subtab");

        document.querySelectorAll(".importer-subcontent").forEach(content => {
          if (content.id === targetId) {
            content.style.display = "block";
          } else {
            content.style.display = "none";
          }
        });
      });
    });

    document.getElementById("loadSampleTextBtn").addEventListener("click", () => {
      const template = this.importer.getSampleTextTemplate();
      const input = document.getElementById("textImportInput");
      input.value = template;
      this.updateParsePreview(template);
      this.showToast("Đã dán mẫu đề thi chuẩn vào ô nhập liệu!", "info");
    });

    document.getElementById("clearTextBtn").addEventListener("click", () => {
      document.getElementById("textImportInput").value = "";
      document.getElementById("parsePreviewBox").style.display = "none";
    });

    const textInput = document.getElementById("textImportInput");
    textInput.addEventListener("input", () => {
      this.updateParsePreview(textInput.value);
    });

    document.getElementById("parseAndSaveTextBtn").addEventListener("click", () => {
      const text = textInput.value.trim();
      if (!text) {
        this.showToast("Vui lòng dán nội dung đề thi vào ô nhập!", "error");
        return;
      }

      try {
        const parsedExam = this.importer.parsePlainTextExam(text);
        if (!parsedExam.questions || parsedExam.questions.length === 0) {
          this.showToast("Không tìm thấy câu hỏi nào hợp lệ! Hãy kiểm tra cú pháp 'Question 1:' hoặc 'Câu 1:'.", "error");
          return;
        }

        const saved = this.importer.addCustomExam(parsedExam);
        this.loadExams();
        this.renderExams();
        textInput.value = "";
        document.getElementById("parsePreviewBox").style.display = "none";
        this.showToast(`Nhập đề thi thành công: "${saved.title}" (${saved.questions.length} câu hỏi)!`, "success");

        if (saved.category === "toeic") this.switchTab("tab-toeic");
        else this.switchTab("tab-ielts");
      } catch (e) {
        this.showToast("Lỗi khi phân tích cú pháp đề thi: " + e.message, "error");
      }
    });

    const jsonFileInput = document.getElementById("jsonFileInput");
    const jsonDropzone = document.getElementById("jsonDropzone");
    const browseBtn = document.getElementById("browseJsonBtn");

    browseBtn.addEventListener("click", () => jsonFileInput.click());
    jsonDropzone.addEventListener("click", (e) => {
      if (e.target !== browseBtn) jsonFileInput.click();
    });

    jsonDropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      jsonDropzone.style.borderColor = "var(--accent-blue)";
    });
    jsonDropzone.addEventListener("dragleave", () => {
      jsonDropzone.style.borderColor = "#93c5fd";
    });
    jsonDropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      jsonDropzone.style.borderColor = "#93c5fd";
      if (e.dataTransfer.files.length) {
        this.handleJsonFile(e.dataTransfer.files[0]);
      }
    });

    jsonFileInput.addEventListener("change", (e) => {
      if (e.target.files.length) {
        this.handleJsonFile(e.target.files[0]);
      }
    });

    document.getElementById("downloadJsonTemplateBtn").addEventListener("click", () => {
      const template = this.importer.getSampleJsonTemplate();
      const blob = new Blob([template], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "mau_de_thi_toeic_reading.json";
      a.click();
      URL.revokeObjectURL(url);
      this.showToast("Đã tải xuống file JSON đề thi mẫu!", "success");
    });

    document.getElementById("exportAllExamsBtn").addEventListener("click", () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.allExams, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `tat_ca_de_thi_english_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      this.showToast("Đã xuất toàn bộ kho đề thi ra file JSON!", "success");
    });

    document.getElementById("clearAllCustomExamsBtn").addEventListener("click", () => {
      if (confirm("Bạn có chắc chắn muốn xóa tất cả các đề đã tự nhập?")) {
        this.importer.clearAllCustomExams();
        this.loadExams();
        this.renderExams();
        this.showToast("Đã xóa tất cả các đề tự nhập!", "info");
      }
    });
  }

  updateParsePreview(text) {
    const previewBox = document.getElementById("parsePreviewBox");
    const previewDetails = document.getElementById("parsePreviewDetails");

    if (!text.trim()) {
      previewBox.style.display = "none";
      return;
    }

    try {
      const parsed = this.importer.parsePlainTextExam(text);
      previewBox.style.display = "block";
      previewDetails.innerHTML = `
        <div><strong>Tiêu đề:</strong> ${parsed.title} | <strong>Kỳ thi:</strong> ${parsed.category.toUpperCase()} | <strong>Kỹ năng:</strong> ${parsed.skill}</div>
        <div><strong>Số câu hỏi phát hiện:</strong> <span style="color: var(--accent-emerald); font-weight:700;">${parsed.questions.length} câu</span></div>
      `;
    } catch (e) {
      previewBox.style.display = "none";
    }
  }

  handleJsonFile(file) {
    if (!file.name.endsWith(".json")) {
      this.showToast("Vui lòng tải lên file định dạng .JSON!", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        const validation = this.importer.validateExamObject(json);
        if (!validation.isValid) {
          alert("File JSON không hợp lệ:\n" + validation.errors.join("\n"));
          return;
        }

        const saved = this.importer.addCustomExam(json);
        this.loadExams();
        this.renderExams();
        this.showToast(`Import thành công đề thi: "${saved.title}"!`, "success");
        if (saved.category === "toeic") this.switchTab("tab-toeic");
        else this.switchTab("tab-ielts");
      } catch (err) {
        this.showToast("Không thể đọc file JSON: " + err.message, "error");
      }
    };
    reader.readAsText(file);
  }

  renderCustomExamsList() {
    const container = document.getElementById("customExamsGrid");
    if (!container) return;

    const customExams = this.importer.getCustomExams();
    if (!customExams.length) {
      container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 2rem;">Bạn chưa nhập đề thi nào. Hãy dùng chức năng Nhập văn bản hoặc bấm nút "Thu thập đề mới"!</div>`;
      return;
    }

    container.innerHTML = customExams.map(exam => `
      <div class="exam-card" data-exam-id="${exam.id}">
        <div class="exam-card-header">
          <span class="skill-pill ${exam.skill}">${exam.skill.toUpperCase()}</span>
          <span class="source-badge">${exam.source || "Đã thu thập"}</span>
        </div>
        <h4 class="exam-title">${exam.title}</h4>
        <p class="exam-desc">${exam.subtitle || `Đề thi gồm ${exam.questions.length} câu hỏi.`}</p>
        <div class="exam-meta-row">
          <div class="exam-meta-item"><span>⏱️</span> ${exam.durationMinutes || 45} phút</div>
          <div class="exam-meta-item"><span>❓</span> ${exam.questions.length} câu</div>
        </div>
        <div class="exam-card-actions">
          <button class="btn btn-primary start-exam-btn" data-id="${exam.id}">Thi thử</button>
          <button class="btn btn-danger delete-custom-btn" data-id="${exam.id}">Xóa đề</button>
        </div>
      </div>
    `).join("");

    container.querySelectorAll(".start-exam-btn").forEach(btn => {
      btn.addEventListener("click", () => this.launchExam(btn.getAttribute("data-id"), "exam"));
    });

    container.querySelectorAll(".delete-custom-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        if (confirm("Bạn có chắc chắn muốn xóa đề thi này?")) {
          this.importer.deleteCustomExam(id);
          this.loadExams();
          this.renderExams();
          this.showToast("Đã xóa đề thi!", "info");
        }
      });
    });
  }

  // ==========================================
  // FLASHCARD VOCABULARY SYSTEM
  // ==========================================
  bindVocabEvents() {
    document.getElementById("flashcardElement").addEventListener("click", () => {
      this.flipVocabCard();
    });

    document.getElementById("vocabFlipBtn").addEventListener("click", () => {
      this.flipVocabCard();
    });

    document.getElementById("vocabNextBtn").addEventListener("click", () => {
      this.vocabManager.next();
      this.renderVocabCard();
    });

    document.getElementById("vocabPrevBtn").addEventListener("click", () => {
      this.vocabManager.prev();
      this.renderVocabCard();
    });

    document.getElementById("vocabShuffleBtn").addEventListener("click", () => {
      this.vocabManager.shuffle();
      this.renderVocabCard();
      this.showToast("Đã xáo trộn danh sách từ vựng!", "info");
    });

    document.getElementById("vocabPronounceBtn").addEventListener("click", () => {
      this.vocabManager.pronounceCurrentWord();
    });

    document.querySelectorAll(".vocab-filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".vocab-filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const cat = btn.getAttribute("data-cat");
        this.vocabManager.filter(cat);
        this.renderVocabCard();
      });
    });
  }

  flipVocabCard() {
    const inner = document.getElementById("flashcardInner");
    this.vocabManager.flip();
    if (this.vocabManager.isFlipped) {
      inner.classList.add("flipped");
    } else {
      inner.classList.remove("flipped");
    }
  }

  renderVocabCard() {
    const wordObj = this.vocabManager.getCurrentWord();
    if (!wordObj) return;

    const inner = document.getElementById("flashcardInner");
    inner.classList.remove("flipped");

    document.getElementById("vocabTagPill").textContent = wordObj.category;
    document.getElementById("vocabWord").textContent = wordObj.word;
    document.getElementById("vocabIpa").textContent = wordObj.ipa;
    document.getElementById("vocabPos").textContent = `(${wordObj.pos})`;
    document.getElementById("vocabMeaning").textContent = wordObj.meaning;
    document.getElementById("vocabExample").textContent = `"${wordObj.example}"`;
    document.getElementById("vocabTopic").textContent = `Chủ đề: ${wordObj.topic}`;

    document.getElementById("vocabCurrentIndex").textContent = this.vocabManager.currentIndex + 1;
    document.getElementById("vocabTotalCount").textContent = this.vocabManager.filteredWords.length;
  }

  // ==========================================
  // TEST HISTORY & ANALYTICS
  // ==========================================
  bindHistoryEvents() {
    document.getElementById("clearHistoryBtn").addEventListener("click", () => {
      if (confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử thi?")) {
        this.examManager.clearTestHistory();
        this.renderHistoryTable();
        this.showToast("Đã xóa lịch sử thi!", "info");
      }
    });
  }

  renderHistoryTable() {
    const tableBody = document.getElementById("historyTableBody");
    const noHistoryMsg = document.getElementById("noHistoryMsg");
    if (!tableBody) return;

    const history = this.examManager.getTestHistory();
    if (!history.length) {
      tableBody.innerHTML = "";
      noHistoryMsg.style.display = "block";
      return;
    }

    noHistoryMsg.style.display = "none";
    tableBody.innerHTML = history.map(h => `
      <tr style="border-bottom: 1px solid var(--border-subtle);">
        <td style="padding: 1rem 0.5rem; color: var(--text-muted); font-size: 0.85rem;">${h.submittedAt || "N/A"}</td>
        <td style="padding: 1rem 0.5rem; font-weight: 600;">${h.examTitle}</td>
        <td style="padding: 1rem 0.5rem;"><span class="skill-pill" style="font-size: 0.75rem;">${h.category.toUpperCase()}</span></td>
        <td style="padding: 1rem 0.5rem;"><span class="skill-pill ${h.skill}" style="font-size: 0.75rem;">${h.skill.toUpperCase()}</span></td>
        <td style="padding: 1rem 0.5rem; font-weight: 700; color: var(--accent-blue);">${h.scaledScore}</td>
        <td style="padding: 1rem 0.5rem; color: var(--accent-emerald); font-weight: 600;">${h.rawPercentage}% (${h.correctCount}/${h.totalQuestions})</td>
        <td style="padding: 1rem 0.5rem; color: var(--text-secondary);">${h.elapsedTime}</td>
      </tr>
    `).join("");
  }

  // ==========================================
  // TOAST NOTIFICATIONS
  // ==========================================
  showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";

    const icons = {
      info: "💡",
      success: "✅",
      warning: "⚠️",
      error: "❌"
    };

    toast.innerHTML = `<span>${icons[type] || "ℹ️"}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
}

// Instantiate application when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.app = new App();
});
