/**
 * Audio Manager Module
 * Handles:
 * 1. Web Speech Synthesis (TTS for listening questions & examiner speaking)
 * 2. MediaRecorder (Microphone recording for Speaking practice)
 * 3. Web Audio API Canvas Waveform Visualizer
 * 4. Web Speech Recognition (Real-time transcription of user speech)
 */

export class AudioManager {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.voices = [];
    this.currentUtterance = null;
    this.playbackRate = 1.0;
    
    // Media recorder state
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.recordedAudioUrl = null;
    this.isRecording = false;

    // Visualizer state
    this.audioCtx = null;
    this.analyser = null;
    this.visualizerAnimationId = null;

    // Speech recognition
    this.recognition = null;
    this.isRecognizing = false;
    this.transcriptResult = "";

    this.initVoices();
    this.initSpeechRecognition();
  }

  initVoices() {
    if (!this.synth) return;
    const loadVoices = () => {
      this.voices = this.synth.getVoices().filter(v => v.lang.startsWith("en"));
    };
    loadVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoices;
    }
  }

  getBestVoice(accent = "en-US") {
    if (!this.voices.length && this.synth) {
      this.voices = this.synth.getVoices().filter(v => v.lang.startsWith("en"));
    }
    const matched = this.voices.find(v => v.lang.includes(accent));
    return matched || this.voices[0] || null;
  }

  speakText(text, options = {}) {
    if (!this.synth) {
      console.warn("SpeechSynthesis not supported in this browser.");
      return;
    }

    this.stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = options.rate || this.playbackRate;
    utterance.pitch = options.pitch || 1.0;
    utterance.voice = options.voice || this.getBestVoice(options.accent || "en-US");

    if (options.onStart) utterance.onstart = options.onStart;
    if (options.onEnd) utterance.onend = options.onEnd;
    if (options.onError) utterance.onerror = options.onError;

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  pauseSpeaking() {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  resumeSpeaking() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  setPlaybackRate(rate) {
    this.playbackRate = parseFloat(rate) || 1.0;
  }

  // ==========================================
  // MICROPHONE RECORDING & CANVAS WAVEFORM
  // ==========================================
  async startRecording(canvasElement, onDataAvailableCallback, onStopCallback) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error("Trình duyệt không hỗ trợ truy cập Micro (MediaDevices).");
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioChunks = [];
      this.mediaRecorder = new MediaRecorder(stream);

      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          this.audioChunks.push(e.data);
          if (onDataAvailableCallback) onDataAvailableCallback(e.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: "audio/webm" });
        if (this.recordedAudioUrl) {
          URL.revokeObjectURL(this.recordedAudioUrl);
        }
        this.recordedAudioUrl = URL.createObjectURL(audioBlob);
        this.stopVisualizer();

        // Stop stream tracks
        stream.getTracks().forEach(track => track.stop());

        if (onStopCallback) onStopCallback(this.recordedAudioUrl, audioBlob);
      };

      // Set up AudioContext for waveform visualizer
      if (canvasElement) {
        this.setupVisualizer(stream, canvasElement);
      }

      this.mediaRecorder.start(100);
      this.isRecording = true;

      // Start speech recognition concurrently if supported
      this.startRecognition();

      return true;
    } catch (err) {
      console.error("Lỗi khi mở micro:", err);
      throw err;
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;
    }
    this.stopRecognition();
  }

  setupVisualizer(stream, canvas) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    this.audioCtx = new AudioContext();
    const source = this.audioCtx.createMediaStreamSource(stream);
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 256;

    source.connect(this.analyser);

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const ctx = canvas.getContext("2d");

    const draw = () => {
      this.visualizerAnimationId = requestAnimationFrame(draw);
      this.analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height;

        // Gradient for waveform
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, "#06b6d4"); // cyan
        gradient.addColorStop(0.5, "#3b82f6"); // blue
        gradient.addColorStop(1, "#8b5cf6"); // purple

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    draw();
  }

  stopVisualizer() {
    if (this.visualizerAnimationId) {
      cancelAnimationFrame(this.visualizerAnimationId);
      this.visualizerAnimationId = null;
    }
    if (this.audioCtx && this.audioCtx.state !== "closed") {
      this.audioCtx.close().catch(() => {});
      this.audioCtx = null;
    }
  }

  // ==========================================
  // SPEECH RECOGNITION (TRANSCRIBE VOICE)
  // ==========================================
  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("SpeechRecognition is not supported in this browser.");
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = "en-US";

    this.recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + " ";
        }
      }
      if (finalTranscript) {
        this.transcriptResult += finalTranscript;
        if (this.onTranscriptUpdate) {
          this.onTranscriptUpdate(this.transcriptResult.trim());
        }
      }
    };

    this.recognition.onerror = (e) => {
      console.warn("Speech recognition error:", e.error);
    };
  }

  startRecognition() {
    if (!this.recognition) return;
    this.transcriptResult = "";
    try {
      this.recognition.start();
      this.isRecognizing = true;
    } catch (e) {
      // might already be running
    }
  }

  stopRecognition() {
    if (this.recognition && this.isRecognizing) {
      try {
        this.recognition.stop();
      } catch (e) {}
      this.isRecognizing = false;
    }
  }
}
