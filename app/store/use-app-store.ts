import { create } from "zustand"

interface Message {
  id: number
  sender: "user" | "ai"
  content: string
  subContent?: string
  timestamp: Date
  options?: string[]
  multiChoiceOptions?: string[]
  isResearchSummary?: boolean
  therapistInfo?: Therapist
  translationKey?: string
  optionKeys?: string[]
  multiChoiceOptionKeys?: string[]
}

interface Therapist {
  id: string
  name: string
  image: string
  experience: string
  availability: string
  specialties: string
  rating: number
  reviewCount: number
  verified: boolean
  gender: string
  phone: string
  telegram?: string
  services: string
  prices: string
  location: string
  timeAvailable: string[]
  specialty: string
}

interface UserPreferences {
  // Q1
  mood?: string
  // Q2
  wantsResearchInfo?: boolean
  wantsToExperience?: boolean
  // Q3
  bringsHereToday?: "therapist" | "trainee" | "consult" | "massage" | "other" | string
  contactInfo?: string
  preferredContactTime?: string
  // Q4
  treatmentMatters?: string[]
  // Q5
  touchStyle?: string
  therapistPreference?: string
  sessionLocation?: string
  locationLive?: string
  preferredTime?: string
  conversationStyle?: string
  // Q6
  additionalNotes?: string
  budget?: string
  // Q7
  wantsScentInfo?: boolean
  scentPreferences?: string
  // Q9
  experienceRating?: number
  // Session data
  sessionId?: string
  hasAgreed?: boolean
}

interface AppState {
  messages: Message[]
  currentStep: string
  isTyping: boolean
  showChat: boolean
  userPreferences: UserPreferences
  sessionId: string
  recommendedTherapist: any | null
  showResearchModal: boolean
  messageIdCounter: number
  // Actions
  startChat: (translations?: any) => void
  closeChat: () => void
  addMessage: (message: Omit<Message, "id" | "timestamp">) => void
  updateUserPreferences: (preferences: Partial<UserPreferences>) => void
  setCurrentStep: (step: string) => void
  setIsTyping: (typing: boolean) => void
  resetChat: () => void
  setRecommendedTherapist: (therapist: any | null) => void
  toggleResearchModal: () => void
  retranslateMessages: (translations: any) => void
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial State
  messages: [],
  currentStep: "welcome",
  isTyping: false,
  showChat: true,
  userPreferences: {},
  sessionId: '',
  recommendedTherapist: null,
  showResearchModal: false,
  messageIdCounter: 0,

  // Actions
  startChat: (translations) => {
    // Generate a text-based session ID with timestamp
    const sessionId = `session_${Date.now()}`
    set({
      showChat: true,
      sessionId,
      userPreferences: { sessionId },
      messages: [],
      currentStep: "welcome",
      messageIdCounter: 0,
    })

    get().addMessage({
      sender: "ai",
      content: translations?.chat?.welcome || "Let's find the therapist and therapy that's just right for you…",
      translationKey: "chat.welcome"
    })
    
    setTimeout(() => {
        get().addMessage({
            sender: "ai",
            content: translations?.chat?.introduction || "Nice to meet you! I'm Tomer – a professional massage therapist and coordinator between skilled therapists and clients seeking unique experiences across the country. If you're a therapist looking to grow your business, feel free to reach out at 09-7961414 or answer below, \"I am a therapist.\"",
            translationKey: "chat.introduction"
        });
        get().setCurrentStep("introduction");
    }, 1500)
    
    setTimeout(() => {
        get().addMessage({
            sender: "ai",
            content: translations?.chat?.moodQuestion || "How are you today?",
            translationKey: "chat.moodQuestion"
        });
        get().setCurrentStep("q1_mood");
    }, 3000)
  },

  addMessage: (message) =>
    set((state) => {
      const nextId = state.messageIdCounter + 1;
      return {
      messages: [
        ...state.messages,
          { ...message, id: nextId, timestamp: new Date() },
        ],
        messageIdCounter: nextId,
      };
    }),

  updateUserPreferences: (preferences) =>
    set((state) => ({
      userPreferences: { ...state.userPreferences, ...preferences },
    })),

  setCurrentStep: (step) => set({ currentStep: step }),

  setIsTyping: (typing) => set({ isTyping: typing }),

  setRecommendedTherapist: (therapist) => set({ recommendedTherapist: therapist }),
  
  toggleResearchModal: () => set((state) => ({ showResearchModal: !state.showResearchModal })),

  resetChat: () => set({
    messages: [],
    currentStep: "welcome",
    showChat: false,
    userPreferences: {},
    sessionId: '',
    messageIdCounter: 0,
  }),
  
  closeChat: () => set({
    showChat: false,
  }),

  retranslateMessages: (translations) => set((state) => ({
    messages: state.messages.map(message => {
      if (message.sender === 'ai' && message.translationKey) {
        // Get the translation using dot notation (e.g., "chat.welcome")
        const keys = message.translationKey.split('.');
        let translatedContent = translations;
        for (const key of keys) {
          translatedContent = translatedContent?.[key];
        }
        
        // Handle options - for arrays, use the array directly from translations
        let translatedOptions = message.options;
        let translatedMultiChoiceOptions = message.multiChoiceOptions;
        
        // Handle specific option arrays based on the message content/context
        if (message.options && message.optionKeys) {
          // Use Set to avoid duplicates and only process unique option keys
          const uniqueOptionKeys = [...new Set(message.optionKeys)];
          
          translatedOptions = [];
          for (const optionKey of uniqueOptionKeys) {
            if (optionKey.includes('touchStyleOptions')) {
              translatedOptions = translations.chat.touchStyleOptions;
              break;
            } else if (optionKey.includes('therapistPrefOptions')) {
              translatedOptions = translations.chat.therapistPrefOptions;
              break;
            } else if (optionKey.includes('locationOptions')) {
              translatedOptions = translations.chat.locationOptions;
              break;
            } else if (optionKey.includes('timeOptions')) {
              translatedOptions = translations.chat.timeOptions;
              break;
            } else if (optionKey.includes('atmosphereOptions')) {
              translatedOptions = translations.chat.atmosphereOptions;
              break;
            } else if (optionKey.includes('bringsHereOptions')) {
              translatedOptions = [
                translations.chat.bringsHereOptions.therapist,
                translations.chat.bringsHereOptions.trainee,
                translations.chat.bringsHereOptions.consult,
                translations.chat.bringsHereOptions.massage,
                translations.chat.bringsHereOptions.more
              ];
              break;
            } else if (optionKey.includes('experienceOptions')) {
              translatedOptions = [
                translations.chat.experienceOptions.yes,
                translations.chat.experienceOptions.no
              ];
              break;
            } else if (optionKey.includes('scentOptions')) {
              translatedOptions = [
                translations.chat.scentOptions.yes,
                translations.chat.scentOptions.no
              ];
              break;
            } else {
              // Handle individual option keys
              const optionKeys = optionKey.split('.');
              let translatedOption = translations;
              for (const key of optionKeys) {
                translatedOption = translatedOption?.[key];
              }
              if (translatedOption && typeof translatedOption === 'string') {
                if (!translatedOptions.includes(translatedOption)) {
                  translatedOptions.push(translatedOption);
                }
              }
            }
          }
        }

        // Handle multi-choice options
        if (message.multiChoiceOptions && message.multiChoiceOptionKeys) {
          // Use Set to avoid duplicates
          const uniqueMultiChoiceKeys = [...new Set(message.multiChoiceOptionKeys)];
          
          translatedMultiChoiceOptions = [];
          for (const optionKey of uniqueMultiChoiceKeys) {
            if (optionKey.includes('treatmentMattersOptions')) {
              translatedMultiChoiceOptions = translations.chat.treatmentMattersOptions;
              break;
            } else {
              const optionKeys = optionKey.split('.');
              let translatedOption = translations;
              for (const key of optionKeys) {
                translatedOption = translatedOption?.[key];
              }
              if (Array.isArray(translatedOption)) {
                translatedMultiChoiceOptions = translatedOption;
                break;
              } else if (translatedOption && typeof translatedOption === 'string') {
                if (!translatedMultiChoiceOptions.includes(translatedOption)) {
                  translatedMultiChoiceOptions.push(translatedOption);
                }
              }
            }
          }
        }

        return {
          ...message,
          content: translatedContent || message.content,
          options: translatedOptions,
          multiChoiceOptions: translatedMultiChoiceOptions
        };
      }
      return message;
    })
  })),
}))
