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
  isChatStarted: boolean
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
  isChatStarted: false,

  // Actions
  startChat: (translations) => {
    // Prevent multiple starts
    if (get().isChatStarted) {
      return
    }
    
    // Generate a text-based session ID with timestamp
    const sessionId = `session_${Date.now()}`
    set({
      showChat: true,
      sessionId,
      userPreferences: { sessionId },
      messages: [],
      currentStep: "welcome",
      messageIdCounter: 0,
      isChatStarted: true,
    })

    get().addMessage({
      sender: "ai",
      content: translations?.chat?.welcome || "",
      translationKey: "chat.welcome"
    })
    
    setTimeout(() => {
        get().addMessage({
            sender: "ai",
            content: translations?.chat?.introduction || "",
            translationKey: "chat.introduction"
        });
        get().setCurrentStep("introduction");
    }, 1500)
    
    setTimeout(() => {
        get().addMessage({
            sender: "ai",
            content: translations?.chat?.moodQuestion || "",
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
    isChatStarted: false,
  }),
  
  closeChat: () => set({
    showChat: false,
  }),

  retranslateMessages: (translations) => set((state) => ({
    messages: state.messages.map(message => {
      if (message.sender === 'ai' && message.translationKey) {
        // Get the translation using dot notation
        const keys = message.translationKey.split('.');
        let translatedContent = translations;
        for (const key of keys) {
          translatedContent = translatedContent?.[key];
        }
        
        // Force update content to translated version
        const newContent = (translatedContent && typeof translatedContent === 'string') 
          ? translatedContent 
          : message.content;
        
        // Handle options translation
        let newOptions = message.options;
        if (message.optionKeys) {
          for (const optionKey of message.optionKeys) {
            if (optionKey.includes('touchStyleOptions')) {
              newOptions = translations.chat?.touchStyleOptions || message.options;
            } else if (optionKey.includes('therapistPrefOptions')) {
              newOptions = translations.chat?.therapistPrefOptions || message.options;
            } else if (optionKey.includes('locationOptions')) {
              newOptions = translations.chat?.locationOptions || message.options;
            } else if (optionKey.includes('timeOptions')) {
              newOptions = translations.chat?.timeOptions || message.options;
            } else if (optionKey.includes('atmosphereOptions')) {
              newOptions = translations.chat?.atmosphereOptions || message.options;
            } else if (optionKey.includes('bringsHereOptions')) {
              newOptions = [
                translations.chat?.bringsHereOptions?.therapist,
                translations.chat?.bringsHereOptions?.trainee,
                translations.chat?.bringsHereOptions?.consult,
                translations.chat?.bringsHereOptions?.massage,
                translations.chat?.bringsHereOptions?.more
              ].filter(Boolean);
            } else if (optionKey.includes('experienceOptions')) {
              newOptions = [
                translations.chat?.experienceOptions?.yes,
                translations.chat?.experienceOptions?.no
              ].filter(Boolean);
            } else if (optionKey.includes('scentOptions')) {
              newOptions = [
                translations.chat?.scentOptions?.yes,
                translations.chat?.scentOptions?.no
              ].filter(Boolean);
            }
          }
        }

        // Handle multi-choice options translation
        let newMultiChoiceOptions = message.multiChoiceOptions;
        if (message.multiChoiceOptionKeys) {
          for (const optionKey of message.multiChoiceOptionKeys) {
            if (optionKey.includes('treatmentMattersOptions')) {
              const treatmentOptions = translations.chat?.treatmentMattersOptions;
              newMultiChoiceOptions = Array.isArray(treatmentOptions) ? treatmentOptions : message.multiChoiceOptions;
              break;
            }
          }
        }

        return {
          ...message,
          content: newContent,
          options: newOptions,
          multiChoiceOptions: newMultiChoiceOptions
        };
      }
      return message;
    })
  })),
}))
