/**
 * Vocabulary Manager Module
 * Coordinates flashcards, pronunciation, filtering by exam (TOEIC / IELTS),
 * and tracking learned words.
 */

export class VocabularyManager {
  constructor(initialWords = [], audioManager) {
    this.words = initialWords;
    this.filteredWords = [...initialWords];
    this.currentIndex = 0;
    this.isFlipped = false;
    this.audioManager = audioManager;
    this.masteredWords = new Set(this.loadMasteredWords());
  }

  loadMasteredWords() {
    try {
      const data = localStorage.getItem("mastered_vocabulary");
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveMasteredWords() {
    try {
      localStorage.setItem("mastered_vocabulary", JSON.stringify([...this.masteredWords]));
    } catch (e) {}
  }

  filter(category = "ALL") {
    if (category === "ALL") {
      this.filteredWords = [...this.words];
    } else {
      this.filteredWords = this.words.filter(w => w.category.toUpperCase() === category.toUpperCase());
    }
    this.currentIndex = 0;
    this.isFlipped = false;
  }

  getCurrentWord() {
    if (!this.filteredWords.length) return null;
    return this.filteredWords[this.currentIndex];
  }

  flip() {
    this.isFlipped = !this.isFlipped;
    return this.isFlipped;
  }

  next() {
    if (this.currentIndex < this.filteredWords.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // loop around
    }
    this.isFlipped = false;
    return this.getCurrentWord();
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.filteredWords.length - 1;
    }
    this.isFlipped = false;
    return this.getCurrentWord();
  }

  shuffle() {
    for (let i = this.filteredWords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.filteredWords[i], this.filteredWords[j]] = [this.filteredWords[j], this.filteredWords[i]];
    }
    this.currentIndex = 0;
    this.isFlipped = false;
    return this.getCurrentWord();
  }

  pronounceCurrentWord() {
    const wordObj = this.getCurrentWord();
    if (wordObj && this.audioManager) {
      this.audioManager.speakText(wordObj.word, { rate: 0.9, accent: "en-US" });
    }
  }

  toggleMastered() {
    const wordObj = this.getCurrentWord();
    if (!wordObj) return false;
    if (this.masteredWords.has(wordObj.word)) {
      this.masteredWords.delete(wordObj.word);
    } else {
      this.masteredWords.add(wordObj.word);
    }
    this.saveMasteredWords();
    return this.isMastered(wordObj.word);
  }

  isMastered(word) {
    return this.masteredWords.has(word);
  }
}
