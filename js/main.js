function phrasebookApp() {
  return {
    currentStep: 1,
    selectedTravel: null,
    selectedLanguage: null,
    travelTypes: [
      { id: 'adventure', name: 'Adventure', emoji: '🏔️' },
      { id: 'business', name: 'Business', emoji: '💼' },
      { id: 'relaxation', name: 'Relaxation', emoji: '🌴' },
    ],
    languages: [
      { id: 'es', name: 'Spanish', flag: '🇪🇸' },
      { id: 'fr', name: 'French', flag: '🇫🇷' },
      { id: 'de', name: 'German', flag: '🇩🇪' },
    ],
    phrasebook: [],
    showToast: false,
    toastMessage: '',
    showBackToTop: false,

    init() {
      // Optional startup logic
    },

    selectTravel(id) {
      this.selectedTravel = id;
    },

    selectLanguage(id) {
      this.selectedLanguage = id;
    },

    getTravelName() {
      const travel = this.travelTypes.find(t => t.id === this.selectedTravel);
      return travel ? travel.name : '';
    },

    getLanguageName() {
      const language = this.languages.find(l => l.id === this.selectedLanguage);
      return language ? language.name : '';
    },

    generatePhrasebook() {
      this.phrasebook = generatePhrases(this.selectedTravel, this.selectedLanguage);
      this.currentStep = 3;
    },

    nextStep() {
      this.currentStep++;
    },

    previousStep() {
      this.currentStep--;
    },

    resetForm() {
      this.currentStep = 1;
      this.selectedTravel = null;
      this.selectedLanguage = null;
      this.phrasebook = [];
    },

    copyToClipboard(text) {
      navigator.clipboard.writeText(text);
      this.toastMessage = 'Copied!';
      this.showToast = true;
      setTimeout(() => (this.showToast = false), 2000);
    },

    copyAllPhrases() {
      const allText = this.phrasebook.flatMap(c => c.phrases.map(p => p.translation)).join('\n');
      this.copyToClipboard(allText);
    },

    toggleTheme() {
      document.body.classList.toggle('dark-mode');
    },

    backToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
}