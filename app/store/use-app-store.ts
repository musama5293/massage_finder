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
  preferredTime?: string
  conversationStyle?: string
  // Q6
  additionalNotes?: string
  // Q7
  scentPreferences?: string
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
  startChat: () => void
  closeChat: () => void
  addMessage: (message: Omit<Message, "id" | "timestamp">) => void
  updateUserPreferences: (preferences: Partial<UserPreferences>) => void
  setCurrentStep: (step: string) => void
  setIsTyping: (typing: boolean) => void
  resetChat: () => void
  setRecommendedTherapist: (therapist: any | null) => void
  toggleResearchModal: () => void
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial State
  messages: [],
  currentStep: "welcome",
  isTyping: false,
  showChat: false,
  userPreferences: {},
  sessionId: '',
  recommendedTherapist: null,
  showResearchModal: false,
  messageIdCounter: 0,

  // Actions
  startChat: () => {
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
      content: "Let's find the therapist and therapy that's just right for you…",
    })
    
    setTimeout(() => {
        get().addMessage({
            sender: "ai",
            content: "Nice to meet you! I'm Tomer – a professional massage therapist and coordinator between skilled therapists and clients seeking unique experiences across the country. If you're a therapist looking to grow your business, feel free to reach out at 09-7961414 or answer below, \"I am a therapist.\""
        });
        get().setCurrentStep("introduction");
    }, 1500)
    
    setTimeout(() => {
        get().addMessage({
            sender: "ai",
            content: "How are you today?"
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
}))
