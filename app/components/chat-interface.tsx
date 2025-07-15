"use client"

import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowUp, Check, Star, MessageCircle, Clock, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useAppStore } from "../store/use-app-store"
import { supabase } from "@/lib/supabaseClient"
import { useLanguage } from "@/hooks/use-language"
import LanguageSwitcher from "@/components/language-switcher"

// Helper function to validate phone numbers
const isValidPhoneNumber = (input: string): boolean => {
  // Remove common phone number formatting characters
  const cleaned = input.replace(/[\s\-\(\)\.]/g, '');
  // Check if it's a reasonable phone number (at least 8 digits, all numeric with possible + prefix)
  return /^\+?\d{8,15}$/.test(cleaned);
}

// Helper function to validate Telegram handles
const isValidTelegramHandle = (input: string): boolean => {
  // Telegram usernames must start with @ and be 5-32 characters long
  // They can contain only Latin letters, numbers, and underscores
  return /^@[a-zA-Z0-9_]{4,31}$/.test(input);
}

// Helper function to validate contact info (phone numbers OR Telegram handles)
const isValidContactInfo = (input: string): boolean => {
  // Normalize input
  const trimmed = input.trim();
  
  // Accept either valid phone numbers or Telegram handles
  return isValidPhoneNumber(trimmed) || isValidTelegramHandle(trimmed);
}

const TherapistCard = ({ therapist }: { therapist: any }) => {
    const { t } = useLanguage()
    
    // Select image based on gender
    const therapistImage = therapist.gender === "Man" 
        ? "/ChatGPT Image Jun MAN-MAN END IMAGE.png" 
        : "/ChatGPT Image Jun Woman -MAN.png";
        
    return (
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm mx-auto">
            <div className="p-4 md:p-5">
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-teal-100 flex-shrink-0 overflow-hidden">
                        <img src={therapistImage} alt={therapist.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-base md:text-lg text-gray-800 truncate">{therapist.name}</h3>
                            <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-md whitespace-nowrap ml-2">{therapist.experience}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                             <Clock className="h-3 w-3 md:h-4 md:w-4 text-gray-400 flex-shrink-0" />
                             <p className="text-xs md:text-sm text-gray-600 truncate">{therapist.availability}</p>
                        </div>
                    </div>
                </div>
                <p className="text-xs md:text-sm text-gray-600 mt-3 md:mt-4 pl-1 line-clamp-2">{therapist.specialties}</p>
                <div className="flex items-center justify-between mt-3 md:mt-4">
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 md:h-5 md:w-5 text-amber-400 fill-amber-400" />
                        <span className="font-bold text-sm md:text-base text-gray-700">{therapist.rating}</span>
                        <span className="text-xs md:text-sm text-gray-500">({therapist.reviewCount} {t.chat.therapistCard.reviews})</span>
                    </div>
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-3 md:px-4 text-xs md:text-sm">
                        <MessageCircle className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                        {t.chat.therapistCard.chatPrivately}
                    </Button>
                </div>
            </div>
        </div>
    );
};

// Placeholders for other components - assuming they exist
const ResearchModal = () => {
    const { showResearchModal, toggleResearchModal } = useAppStore();
    const { t, isRTL } = useLanguage()
    if (!showResearchModal) return null;
  return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-lg">
                <h2 className="text-lg font-bold mb-2">{isRTL ? "מחקר מדעי על עיסוי טיפולי עם ריחות טיפוליים" : "Research Summary"}</h2>
                <p className="text-sm text-gray-600 mb-4">{isRTL ? "ארומתרפיה בשילוב עיסוי טיפולי הוכח כמפחיתה משמעותית את רמות הקורטיזול ומשפרת את איכות השינה במחקרים קליניים. הפרוטוקול שלנו משתמש בהעדפות הריח האישיות שלך ליצירת חוויה מותאמת אישית ויעילה." : "Aromatherapy and massage have been scientifically shown to reduce stress and improve sleep. Our AI protocol uses your scent preferences to create a personalized, effective experience."}</p>
                <Button onClick={toggleResearchModal}>{isRTL ? "סגור" : "Close"}</Button>
            </div>
        </div>
    )
};

// Rating component for experience feedback
const RatingStars = ({ onRate }: { onRate: (rating: number) => void }) => {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);
  
  const handleStarClick = (rating: number) => {
    setSelectedStar(rating);
    onRate(rating);
  };
  
  return (
    <div className="flex items-center justify-center gap-2 my-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
        <button
          key={rating}
          className="focus:outline-none"
          onMouseEnter={() => setHoveredStar(rating)}
          onMouseLeave={() => setHoveredStar(0)}
          onClick={() => handleStarClick(rating)}
        >
          <Star
            className={`h-8 w-8 transition-all ${
              rating <= (hoveredStar || selectedStar)
                ? "text-amber-400 fill-amber-400"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default function ChatInterface() {
  const [inputValue, setInputValue] = useState("")
    const [selectedMultiChoice, setSelectedMultiChoice] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { t, isRTL, language } = useLanguage()

  const {
    messages,
    currentStep,
    isTyping,
    userPreferences,
    addMessage,
    updateUserPreferences,
    setCurrentStep,
    setIsTyping,
    setRecommendedTherapist,
    toggleResearchModal,
    resetChat,
    closeChat,
    retranslateMessages,
  } = useAppStore()

  // Helper function to add messages with translation keys
  const addTranslatedMessage = (content: string, translationKey: string, options?: { 
    options?: string[], 
    optionKeys?: string[],
    multiChoiceOptions?: string[],
    multiChoiceOptionKeys?: string[],
    therapistInfo?: any 
  }) => {
    addMessage({
      sender: 'ai',
      content,
      translationKey,
      options: options?.options,
      optionKeys: options?.optionKeys,
      multiChoiceOptions: options?.multiChoiceOptions,
      multiChoiceOptionKeys: options?.multiChoiceOptionKeys,
      therapistInfo: options?.therapistInfo
    });
  }

  // Create preference labels using translations
  const preferenceLabels: { [key: string]: string } = {
    mood: t.preferenceLabels.mood,
    wantsResearchInfo: t.preferenceLabels.wantsResearchInfo,
    wantsToExperience: t.preferenceLabels.wantsToExperience,
    bringsHereToday: t.preferenceLabels.bringsHereToday,
    treatmentMatters: t.preferenceLabels.treatmentMatters,
    touchStyle: t.preferenceLabels.touchStyle,
    therapistPreference: t.preferenceLabels.therapistPreference,
    sessionLocation: t.preferenceLabels.sessionLocation,
    locationLive: t.preferenceLabels.locationLive,
    preferredTime: t.preferenceLabels.preferredTime,
    conversationStyle: t.preferenceLabels.conversationStyle,
    additionalNotes: t.preferenceLabels.additionalNotes,
    scentPreferences: t.preferenceLabels.scentPreferences,
    contactInfo: t.preferenceLabels.contactInfo
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Helper function to ask for rating at the end of a conversation
  const askForRating = () => {
    addMessage({ 
        sender: 'ai', 
        content: t.chat.ratingQuestion,
        translationKey: 'chat.ratingQuestion'
    });
    setCurrentStep('q9_rating');
  };

  useEffect(scrollToBottom, [messages, isTyping])

  useEffect(() => {
        const recommendTherapist = async () => {
            setIsTyping(true);
            await new Promise(resolve => setTimeout(resolve, 2000));
            setIsTyping(false);

            // Make sure we have contact info before proceeding
            if (!userPreferences.contactInfo) {
                addMessage({ sender: 'ai', content: t.chat.contactQuestion, translationKey: 'chat.contactQuestion' });
                setCurrentStep('q8_contact_info');
                return;
            }

            const therapists = [
                { 
                    id: 'therapist-1', name: 'Kristin Watson', experience: '8+ years', availability: t.availability.today, specialties: t.therapistSpecialties.deepTissue, rating: 4.9, reviewCount: 127, image: '/placeholder.svg', verified: true, gender: 'Woman', phone: '123-456-7890', services: t.services.massage60, prices: '$150', location: "Therapist's Studio", timeAvailable: ['Afternoon'], specialty: t.therapistDescriptions.holisticDeep, 
                },
                { 
                    id: 'therapist-2', name: 'Marcus Johnson', experience: '12+ years', availability: t.availability.tomorrow, specialties: t.therapistSpecialties.swedish, rating: 4.8, reviewCount: 89, image: '/placeholder.svg', verified: true, gender: 'Man', phone: '123-456-7890', services: t.services.massage90, prices: '$200', location: "Therapist's Studio", timeAvailable: ['Morning', 'Evening'], specialty: t.therapistDescriptions.swedishRelaxation,
                },
                { 
                    id: 'therapist-3', name: 'Elena Rodriguez', experience: '6+ years', availability: t.availability.today, specialties: t.therapistSpecialties.sports, rating: 4.9, reviewCount: 95, image: '/placeholder.svg', verified: true, gender: 'Woman', phone: '123-456-7890', services: t.services.sportsMassage60, prices: '$140', location: "Therapist's Studio", timeAvailable: ['Evening'], specialty: t.therapistDescriptions.sportsRecovery,
                }
            ];

            // Select therapist based on gender preference if specified
            let filteredTherapists = [...therapists];
            if (userPreferences.therapistPreference === "Woman") {
                filteredTherapists = therapists.filter(t => t.gender === "Woman");
            } else if (userPreferences.therapistPreference === "Man") {
                filteredTherapists = therapists.filter(t => t.gender === "Man");
            }
            
            // If no therapists match the filter, use all therapists
            if (filteredTherapists.length === 0) {
                filteredTherapists = therapists;
            }

            const therapistData = filteredTherapists[Math.floor(Math.random() * filteredTherapists.length)];

            addMessage({ sender: 'ai', content: t.chat.recommendationIntro, translationKey: 'chat.recommendationIntro' });
            addMessage({ sender: 'ai', content: '', therapistInfo: therapistData });
            addMessage({ 
                sender: 'ai', 
                content: `${t.chat.representativeContact} ${userPreferences.contactInfo} ${isRTL ? 'לתת לך מידע נוסף ולתאמן.' : 'to give you more information and coordinate.'}\n${t.chat.ratingQuestion}`,
                translationKey: 'chat.representativeContact'
            });
            setCurrentStep('q9_rating');
        };

        if (currentStep === 'final_recommendation') {
            recommendTherapist();
        }
    }, [currentStep, addMessage, setCurrentStep, setIsTyping, userPreferences, t]);

    useEffect(() => {
        const saveSessionData = async () => {
            // Save data regardless of agreement status to capture all conversation paths
            try {
                const { hasAgreed, ...preferencesToSave } = userPreferences;
                
                // Ensure we have a session ID
                if (!preferencesToSave.sessionId) {
                    console.error("No session ID found, cannot save data");
                    return;
                }
                
                                    // Ensure experience_rating is a number if it exists
                    const experienceRating = preferencesToSave.experienceRating 
                        ? Number(preferencesToSave.experienceRating) 
                        : null;
                    
                    console.log("Saving session with experienceRating:", experienceRating); // Debug log
                    
                    const { data, error } = await supabase
                        .from('sessions')
                        .upsert([
                            { 
                                session_id: preferencesToSave.sessionId,
                                mood: preferencesToSave.mood,
                                brings_here_today: preferencesToSave.bringsHereToday,
                                treatment_matters: preferencesToSave.treatmentMatters,
                                touch_style: preferencesToSave.touchStyle,
                                therapist_preference: preferencesToSave.therapistPreference,
                                session_location: preferencesToSave.sessionLocation,
                                preferred_time: preferencesToSave.preferredTime,
                                conversation_style: preferencesToSave.conversationStyle,
                                additional_notes: preferencesToSave.additionalNotes,
                                scent_preferences: preferencesToSave.scentPreferences,
                                contact_info: preferencesToSave.contactInfo,
                                location_live: preferencesToSave.locationLive,
                                experience_rating: experienceRating,
                                wants_scent_info: preferencesToSave.wantsScentInfo,
                            }
                        ], {
                            onConflict: 'session_id',
                            ignoreDuplicates: false
                        });
                
                if (error) {
                    console.error("Error saving session data:", error);
                } else {
                    console.log("Session data saved successfully");
                }
            } catch (err) {
                console.error("Exception when saving session data:", err);
            }
        };

        // Save data at key points in the conversation
        if (
            // Complete conversation
            currentStep === 'complete' || 
            
            // When contact info is provided in any scenario
            (userPreferences.contactInfo && 
             (currentStep === 'q2_contact' || 
              currentStep === 'q3_contact' || 
              currentStep === 'q3_consult_contact' || 
              currentStep === 'q8_contact_info')) ||
              
            // Therapist scenario
            (userPreferences.bringsHereToday === 'therapist' && currentStep === 'q3_contact') ||
            
            // Rating provided
            currentStep === 'q9_rating' ||
            
            // Early exit scenarios
            currentStep === 'final_recommendation'
        ) {
            saveSessionData();
        }
    }, [currentStep, userPreferences]);

    const processAndSendMessage = async (content: string) => {
        // Check for discrete keyword with typo tolerance
        const discreteVariations = ['discrete', 'discreet', 'discret', 'descrete', 'descret', 'descreet'];
        const hasDiscreteWord = discreteVariations.some(word => content.toLowerCase().includes(word));
        
        if (hasDiscreteWord) {
            addMessage({ sender: "user", content });
            setIsTyping(true);
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Store the last message to re-ask it after handling discretion
            const lastAiMessage = [...messages].reverse().find(m => m.sender === 'ai' && m.content);
            
            addMessage({ 
                sender: 'ai', 
                content: t.chat.discretionResponse
            });
            
            // Re-ask the previous question to continue the conversation
            if (lastAiMessage) {
                setTimeout(() => {
                    addMessage({ 
                        sender: 'ai', 
                        content: t.chat.continueConversation,
                    });
                    
                    setTimeout(() => {
                        addMessage({ 
                            sender: 'ai', 
                            content: lastAiMessage.content,
                            options: lastAiMessage.options,
                            multiChoiceOptions: (lastAiMessage as any).multiChoiceOptions
                        });
                    }, 1000);
                }, 1500);
            }
            
            setIsTyping(false);
            return;
        }
        
        addMessage({ sender: "user", content });
        setIsTyping(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        await handleConversationLogic(content);
        setIsTyping(false);
    };

    const handleTextInputSend = () => {
        if (!inputValue.trim()) {
            addMessage({ 
                sender: 'ai', 
                content: t.chat.emptyInputResponse
            });
            return;
        }
        processAndSendMessage(inputValue.trim());
        setInputValue("");
    };

    const handleOptionClick = (option: string) => {
        processAndSendMessage(option);
    };

    const handleMultiChoice = (option: string) => {
        const newSelection = selectedMultiChoice.includes(option)
            ? selectedMultiChoice.filter(item => item !== option)
            : [...selectedMultiChoice, option];
        setSelectedMultiChoice(newSelection);
    };

    const submitMultiChoice = () => {
        if (selectedMultiChoice.length === 0) return;
        const messageContent = selectedMultiChoice.join(', ');
        processAndSendMessage(messageContent);
        setSelectedMultiChoice([]);
    };

    const handleConversationLogic = async (userInput: string) => {
        const lowerCaseInput = userInput.toLowerCase();

        // --- Global keywords that can interrupt the flow ---
        if (lowerCaseInput.includes("start over")) {
            resetChat();
            return;
        }

        if (lowerCaseInput.includes("see my summary")) {
            const summaryLines = Object.entries(userPreferences)
                .map(([key, value]) => {
                    const label = preferenceLabels[key as keyof typeof preferenceLabels];
                    if (!label || !value || (Array.isArray(value) && value.length === 0)) return null;
                    const formattedValue = Array.isArray(value) ? value.join(', ') : value;
                    return `**${label}:** ${formattedValue}`;
                })
                .filter(Boolean);

            if (summaryLines.length > 0) {
                addMessage({ sender: 'ai', content: `${t.chat.summaryIntro}\n\n${summaryLines.join('\n')}`, translationKey: 'chat.summaryIntro' });
            } else {
                addMessage({ sender: 'ai', content: t.chat.summaryEmpty, translationKey: 'chat.summaryEmpty' });
            }
            return;
        }

        if (lowerCaseInput.includes("talk to a human")) {
            addMessage({ sender: 'ai', content: t.chat.humanSupport, translationKey: 'chat.humanSupport' });
            setCurrentStep('complete');
            return;
        }

        // Special keyword check
        if (lowerCaseInput.includes("i am a therapist")) {
            updateUserPreferences({ bringsHereToday: 'therapist' });
            addMessage({ sender: 'ai', content: t.chat.therapistContactQuestion, translationKey: 'chat.therapistContactQuestion' });
            setCurrentStep('q3_therapist_contact');
            return;
        }

        switch (currentStep) {
            case 'q1_mood':
                updateUserPreferences({ mood: userInput });
                addMessage({ 
                    sender: 'ai', 
                    content: t.chat.assistantIntroduction,
                    translationKey: 'chat.assistantIntroduction',
                    options: [
                        t.chat.researchQuestion,
                        t.chat.researchYes
                    ],
                    optionKeys: [
                        'chat.researchQuestion',
                        'chat.researchYes'
                    ]
                });
                setCurrentStep('q2_research_interest');
                break;

            case 'q2_research_interest':
                if (lowerCaseInput.includes('interested') || lowerCaseInput.includes('learn') || lowerCaseInput.includes('מעוניין') || lowerCaseInput.includes('ללמוד')) {
                    updateUserPreferences({ wantsResearchInfo: true });
                    addMessage({ sender: 'ai', content: t.chat.researchNo, translationKey: 'chat.researchNo' });
                    toggleResearchModal();
                    addMessage({ 
                        sender: 'ai', 
                        content: t.chat.experienceInterest, 
                        translationKey: 'chat.experienceInterest',
                        options: [t.chat.experienceOptions.yes, t.chat.experienceOptions.no],
                        optionKeys: ['chat.experienceOptions.yes', 'chat.experienceOptions.no']
                    });
                    setCurrentStep('q2_experience_interest');
                } else {
                    updateUserPreferences({ wantsResearchInfo: false });
                    addMessage({ 
                        sender: 'ai', 
                        content: t.chat.experienceNo, 
                        translationKey: 'chat.experienceNo',
                        options: [t.chat.bringsHereOptions.therapist, t.chat.bringsHereOptions.trainee, t.chat.bringsHereOptions.consult, t.chat.bringsHereOptions.massage, t.chat.bringsHereOptions.more],
                        optionKeys: ['chat.bringsHereOptions.therapist', 'chat.bringsHereOptions.trainee', 'chat.bringsHereOptions.consult', 'chat.bringsHereOptions.massage', 'chat.bringsHereOptions.more']
                    });
                    setCurrentStep('q3_brings_here');
                }
                break;

            case 'q2_experience_interest':
                if (lowerCaseInput.includes('yes')) {
                    updateUserPreferences({ 
                        wantsToExperience: true,
                        bringsHereToday: 'research_protocol'  // Add a specific reason for this path
                    });
                    addMessage({ sender: 'ai', content: t.chat.experienceYes, translationKey: 'chat.experienceYes' });
                    setCurrentStep('q2_contact');
                } else {
                    updateUserPreferences({ wantsToExperience: false });
                    addMessage({ 
                        sender: 'ai', 
                        content: t.chat.experienceNo, 
                        translationKey: 'chat.experienceNo',
                        options: [t.chat.bringsHereOptions.therapist, t.chat.bringsHereOptions.trainee, t.chat.bringsHereOptions.consult, t.chat.bringsHereOptions.massage, t.chat.bringsHereOptions.more],
                        optionKeys: ['chat.bringsHereOptions.therapist', 'chat.bringsHereOptions.trainee', 'chat.bringsHereOptions.consult', 'chat.bringsHereOptions.massage', 'chat.bringsHereOptions.more']
                    });
                    setCurrentStep('q3_brings_here');
                }
                break;

            case 'q2_contact':
                // Validate contact info (phone or messaging handle)
                const contactInfo = userInput.trim();
                if (!contactInfo || !isValidContactInfo(contactInfo)) {
                    addMessage({ 
                        sender: 'ai', 
                        content: t.chat.contactInvalid,
                        translationKey: 'chat.contactInvalid'
                    });
                    return;
                }
                updateUserPreferences({ contactInfo });
                addMessage({ sender: 'ai', content: `${t.chat.contactThankYou} ${contactInfo}.`, translationKey: 'chat.contactThankYou' });
                askForRating();
                break;

            case 'q3_therapist_contact':
                // Validate contact info (phone or messaging handle)
                const therapistContactInfo = userInput.trim();
                if (!therapistContactInfo || !isValidContactInfo(therapistContactInfo)) {
                    addMessage({ 
                        sender: 'ai', 
                        content: t.chat.contactInvalid,
                        translationKey: 'chat.contactInvalid'
                    });
                    return;
                }
                updateUserPreferences({ contactInfo: therapistContactInfo });
                addMessage({ sender: 'ai', content: t.chat.contactRepresentative, translationKey: 'chat.contactRepresentative' });
                askForRating();
                break;

            case 'q3_consult_contact':
                // Validate contact info (phone or messaging handle)
                const consultContactInfo = userInput.trim();
                if (!consultContactInfo || !isValidContactInfo(consultContactInfo)) {
                    addMessage({ 
                        sender: 'ai', 
                        content: t.chat.contactInvalid,
                        translationKey: 'chat.contactInvalid'
                    });
                    return;
                }
                updateUserPreferences({ contactInfo: consultContactInfo });
                addMessage({ sender: 'ai', content: t.chat.contactRepresentative, translationKey: 'chat.contactRepresentative' });
                askForRating();
                break;

            case 'q3_brings_here':
                if (lowerCaseInput.includes('more') || lowerCaseInput.includes('עוד')) {
                    addMessage({ sender: 'ai', content: t.chat.bringsHereMore, translationKey: 'chat.bringsHereMore' });
                    setCurrentStep('q3_brings_here_other');
                } else if (lowerCaseInput.includes('therapist') || lowerCaseInput.includes('trainee') || lowerCaseInput.includes('מטפל') || lowerCaseInput.includes('מתמחה')) {
                    const userType = (lowerCaseInput.includes('therapist') || lowerCaseInput.includes('מטפל')) ? 'therapist' : 'trainee';
                    updateUserPreferences({ bringsHereToday: userType });
                    addMessage({ sender: 'ai', content: t.chat.therapistContactQuestion, translationKey: 'chat.therapistContactQuestion' });
                    setCurrentStep('q3_therapist_contact');
                } else if (lowerCaseInput.includes('consult') || lowerCaseInput.includes('התייעץ')) {
                    updateUserPreferences({ bringsHereToday: 'consult' });
                    addMessage({ sender: 'ai', content: t.chat.consultContact, translationKey: 'chat.consultContact' });
                    setCurrentStep('q3_consult_contact');
                } else {
                    updateUserPreferences({ bringsHereToday: 'massage' });
                    addMessage({ sender: 'ai', content: t.chat.uniqueExperience, translationKey: 'chat.uniqueExperience' });
                    addMessage({ 
                        sender: 'ai', 
                        content: t.chat.treatmentMattersQuestion, 
                        translationKey: 'chat.treatmentMattersQuestion',
                        multiChoiceOptions: t.chat.treatmentMattersOptions,
                        multiChoiceOptionKeys: ['chat.treatmentMattersOptions']
                    });
                    setCurrentStep('q4_treatment_matters');
                }
                break;
                
            case 'q3_therapist_time':
                updateUserPreferences({ preferredContactTime: userInput });
                addMessage({ sender: 'ai', content: `${t.chat.representativeContact} ${userPreferences.contactInfo}. ${t.chat.contactThankYou}`, translationKey: 'chat.representativeContact' });
                askForRating();
                break;

            case 'q3_brings_here_other':
                updateUserPreferences({ bringsHereToday: userInput });
                addMessage({ sender: 'ai', content: t.chat.bringsHereOther, translationKey: 'chat.bringsHereOther' });
                addMessage({ 
                    sender: 'ai', 
                    content: t.chat.treatmentMattersQuestion, 
                    translationKey: 'chat.treatmentMattersQuestion',
                    multiChoiceOptions: t.chat.treatmentMattersOptions,
                    multiChoiceOptionKeys: ['chat.treatmentMattersOptions']
                });
                setCurrentStep('q4_treatment_matters');
                break;

            case 'q4_treatment_matters':
                const treatmentMatters = userInput.split(', ');
                updateUserPreferences({ treatmentMatters });

                if (treatmentMatters.includes("More") || treatmentMatters.includes("עוד")) {
                    addMessage({ sender: 'ai', content: t.chat.treatmentMattersMore, translationKey: 'chat.treatmentMattersMore' });
                    setCurrentStep('q4_treatment_matters_other');
                } else {
                    addMessage({ 
                        sender: 'ai', 
                        content: t.chat.touchStyleQuestion, 
                        translationKey: 'chat.touchStyleQuestion',
                        options: t.chat.touchStyleOptions,
                        optionKeys: ['chat.touchStyleOptions']
                    });
                    setCurrentStep('q5_touch_style');
                }
                break;

            case 'q4_treatment_matters_other':
                const existingMatters = userPreferences.treatmentMatters?.filter(m => m !== "More") || [];
                const newMatters = [...existingMatters, userInput];
                updateUserPreferences({ treatmentMatters: newMatters });
                
                addMessage({ sender: 'ai', content: t.chat.uniqueExperience, translationKey: 'chat.uniqueExperience' });
                addMessage({ 
                    sender: 'ai', 
                    content: t.chat.touchStyleQuestion, 
                    translationKey: 'chat.touchStyleQuestion',
                    options: t.chat.touchStyleOptions,
                    optionKeys: ['chat.touchStyleOptions']
                });
                setCurrentStep('q5_touch_style');
                break;

            case 'q5_touch_style':
                updateUserPreferences({ touchStyle: userInput });
                addMessage({ 
                    sender: 'ai', 
                    content: t.chat.therapistPrefQuestion, 
                    translationKey: 'chat.therapistPrefQuestion',
                    options: t.chat.therapistPrefOptions,
                    optionKeys: ['chat.therapistPrefOptions']
                });
                setCurrentStep('q5_therapist_pref');
                break;

            case 'q5_therapist_pref':
                updateUserPreferences({ therapistPreference: userInput });
                addMessage({ 
                    sender: 'ai', 
                    content: t.chat.locationQuestion, 
                    translationKey: 'chat.locationQuestion',
                    options: t.chat.locationOptions,
                    optionKeys: ['chat.locationOptions']
                });
                setCurrentStep('q5_location');
                break;

            case 'q5_location':
                updateUserPreferences({ sessionLocation: userInput });
                addMessage({ 
                    sender: 'ai', 
                    content: t.chat.timeQuestion, 
                    translationKey: 'chat.timeQuestion',
                    options: t.chat.timeOptions,
                    optionKeys: ['chat.timeOptions']
                });
                setCurrentStep('q5_time');
                break;

            case 'q5_time':
                updateUserPreferences({ preferredTime: userInput });
                addMessage({ sender: 'ai', content: t.chat.locationLiveQuestion, translationKey: 'chat.locationLiveQuestion' });
                setCurrentStep('q5_location_live');
                break;
                
            case 'q5_location_live':
                updateUserPreferences({ locationLive: userInput });
                addMessage({ 
                    sender: 'ai', 
                    content: t.chat.atmosphereQuestion, 
                    translationKey: 'chat.atmosphereQuestion',
                    options: t.chat.atmosphereOptions,
                    optionKeys: ['chat.atmosphereOptions']
                });
                setCurrentStep('q5_convo_style');
                break;

            case 'q5_convo_style':
                updateUserPreferences({ conversationStyle: userInput });
                addMessage({ sender: 'ai', content: t.chat.additionalNotesQuestion, translationKey: 'chat.additionalNotesQuestion' });
                setCurrentStep('q6_additional_notes');
                break;

            case 'q6_additional_notes':
                updateUserPreferences({ additionalNotes: userInput });
                addMessage({ 
                    sender: 'ai', 
                    content: t.chat.budgetQuestion,
                    translationKey: 'chat.budgetQuestion'
                });
                setCurrentStep('q6_budget');
                break;

            case 'q6_budget':
                updateUserPreferences({ budget: userInput });
                addMessage({ 
                    sender: 'ai', 
                    content: t.chat.scentIntroQuestion,
                    translationKey: 'chat.scentIntroQuestion',
                    options: [t.chat.scentOptions.yes, t.chat.scentOptions.no],
                    optionKeys: ['chat.scentOptions.yes', 'chat.scentOptions.no']
                });
                setCurrentStep('q7_scent_interest');
                break;
                
            case 'q7_scent_interest':
                if (lowerCaseInput.includes('yes') || lowerCaseInput.includes('כן')) {
                    updateUserPreferences({ wantsScentInfo: true });
                    addMessage({ 
                        sender: 'ai', 
                        content: t.chat.scentPrefsQuestion,
                        translationKey: 'chat.scentPrefsQuestion'
                    });
                    setCurrentStep('q7_scent_prefs');
                } else {
                    updateUserPreferences({ wantsScentInfo: false });
                    // Skip scent preferences and go to contact
                    addMessage({ 
                        sender: 'ai', 
                        content: t.chat.contactQuestion,
                        translationKey: 'chat.contactQuestion'
                    });
                    setCurrentStep('q8_contact_info');
                }
                break;

            case 'q7_scent_prefs':
                updateUserPreferences({ scentPreferences: userInput });
                addMessage({ sender: 'ai', content: t.chat.contactQuestion, translationKey: 'chat.contactQuestion' });
                setCurrentStep('q8_contact_info');
                break;
                
            case 'q8_contact_info':
                // Validate contact info (phone number or Telegram)
                const finalContactInfo = userInput.trim();
                if (!finalContactInfo || !isValidContactInfo(finalContactInfo)) {
                    addMessage({ 
                        sender: 'ai', 
                        content: t.chat.contactInvalid,
                        translationKey: 'chat.contactInvalid'
                    });
                    return;
                }
                updateUserPreferences({ contactInfo: finalContactInfo });
                
                // Now show the summary with all information including contact
                // Make sure contact info is included in the summary
                const updatedPreferences = { ...userPreferences, contactInfo: finalContactInfo };
                
                const summaryLines = Object.entries(updatedPreferences)
                    .map(([key, value]) => {
                        const label = preferenceLabels[key as keyof typeof preferenceLabels];
                        if (!label || !value || (Array.isArray(value) && value.length === 0)) return null;
                        
                        // Don't show session ID in the summary
                        if (key === 'sessionId') return null;
                        
                        const formattedValue = Array.isArray(value) ? value.join(', ') : value;
                        return `**${label}:** ${formattedValue}`;
                    })
                    .filter(Boolean);

                addMessage({ sender: 'ai', content: `${isRTL ? 'הנה הסיכום הסופי של ההעדפות שלך:' : 'Here is the final summary of your preferences:'}\n\n${summaryLines.join('\n')}`, translationKey: 'chat.finalSummaryHeader' });
                addMessage({ sender: 'ai', content: t.chat.finalSummaryIntro, translationKey: 'chat.finalSummaryIntro' });
                setCurrentStep('q8_agreement');
                break;

            case 'q8_agreement':
                updateUserPreferences({ hasAgreed: true });
                addMessage({ sender: 'ai', content: t.chat.agreementThanks, translationKey: 'chat.agreementThanks' });
                addMessage({ sender: 'ai', content: t.chat.findingTherapist, translationKey: 'chat.findingTherapist' });
                setCurrentStep('final_recommendation');
                break;

            case 'q9_rating':
                // This case is handled by the RatingStars component
                break;

            case 'complete':
                addMessage({ sender: 'ai', content: isRTL ? "סיפקתי את כל המידע שיש לי כרגע. אם תרצה להתחיל חיפוש חדש, אתה יכול לומר 'התחל מחדש'." : "I've provided all the information I have for now. If you'd like to start a new search, you can say 'Start Over'.", translationKey: 'chat.sessionComplete' });
                break;

            default:
                addMessage({ sender: 'ai', content: t.chat.errorGeneral, translationKey: 'chat.errorGeneral' });
                
                // Re-ask the last question with more guidance based on the current step
                const lastAiMessage = [...messages].reverse().find(m => m.sender === 'ai' && (m.options || m.multiChoiceOptions));
                
                if (currentStep.includes('contact')) {
                    addMessage({ 
                        sender: 'ai', 
                        content: isRTL ? "נא לספק מספר טלפון תקין (למשל, +972123456789) או כתובת טלגרם (שמתחילה ב-@)" : "Please provide a valid phone number (e.g., +1234567890) or Telegram handle (starting with @)",
                        translationKey: 'chat.contactValidation'
                    });
                } else if (lastAiMessage) {
                    // Re-display the last question with options
                    addMessage({ 
                        sender: 'ai', 
                        content: isRTL ? "אנא בחר מהאפשרויות הזמינות או ספק תשובה ברורה:" : "Please select from the available options or provide a clear response:", 
                        translationKey: 'chat.selectFromOptions',
                        options: lastAiMessage.options, 
                        optionKeys: (lastAiMessage as any).optionKeys,
                        multiChoiceOptions: (lastAiMessage as any).multiChoiceOptions,
                        multiChoiceOptionKeys: (lastAiMessage as any).multiChoiceOptionKeys 
                    });
                } else {
                    // Generic fallback if we can't determine the context
                    addMessage({ 
                        sender: 'ai', 
                        content: isRTL ? "בואו ננסה שוב. אנא ספק תשובה ברורה לשאלה." : "Let's try again. Please provide a clear response to the question.",
                        translationKey: 'chat.provideClearResponse'
                    });
                }
                break;
        }
    }

    const lastMessage = messages[messages.length - 1];

  return (
        <div className="relative h-screen">
            {/* Background Image */}
            <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('/ChatGPT Image Jun MAN-MAN BACKROUND.png')` }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-white/20" />
    
            {/* Chat Content */}
            <div className="relative flex flex-col h-full">
                <header className="p-3 md:p-4 border-b border-gray-200/80 flex justify-between items-center bg-white/80 shrink-0">
                    <h1 className="text-lg md:text-xl font-semibold text-gray-800">Your AI Assistant</h1>
                    <div className="flex items-center gap-2">
                        <LanguageSwitcher />
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={closeChat} 
                        className="rounded-full hover:bg-gray-100"
                        aria-label="Close chat"
                    >
                        <X className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
                    </Button>
                    </div>
                </header>
    
                <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-3 md:space-y-4">
                    <AnimatePresence initial={false}>
                        {messages.map((message) => (
                    <motion.div
                      key={message.id}
                                initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                layout
                                className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {message.sender === 'ai' && <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-300 flex-shrink-0" />}
                                <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-3 md:px-4 py-2 md:py-3 ${message.sender === 'user' ? 'bg-cyan-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                                    {message.therapistInfo ? (
                                        <TherapistCard therapist={message.therapistInfo} />
                                    ) : (
                                        <div className="relative group">
                                            <p className="text-sm md:text-base leading-relaxed" style={{
                                              WebkitUserSelect: "text",
                                              MozUserSelect: "text",
                                              msUserSelect: "text",
                                              userSelect: "text"
                                            }} dangerouslySetInnerHTML={{ __html: message.content.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                                            
                                            {message.content && (
                                                <button 
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(message.content);
                                                        
                                                        // Create tooltip element for feedback
                                                        const button = document.activeElement as HTMLElement;
                                                        const rect = button.getBoundingClientRect();
                                                        
                                                        const tooltip = document.createElement('div');
                                                        tooltip.innerText = 'Copied!';
                                                        tooltip.style.position = 'fixed';
                                                        tooltip.style.left = `${rect.left}px`;
                                                        tooltip.style.top = `${rect.top - 30}px`;
                                                        tooltip.style.backgroundColor = '#10b981';
                                                        tooltip.style.color = 'white';
                                                        tooltip.style.padding = '4px 8px';
                                                        tooltip.style.borderRadius = '4px';
                                                        tooltip.style.fontSize = '12px';
                                                        tooltip.style.fontWeight = 'bold';
                                                        tooltip.style.zIndex = '9999';
                                                        tooltip.style.opacity = '0';
                                                        tooltip.style.transition = 'opacity 0.2s ease-in-out';
                                                        
                                                        document.body.appendChild(tooltip);
                                                        
                                                        // Animate tooltip
                                                        setTimeout(() => {
                                                            tooltip.style.opacity = '1';
                                                        }, 10);
                                                        
                                                        setTimeout(() => {
                                                            tooltip.style.opacity = '0';
                                                            setTimeout(() => {
                                                                document.body.removeChild(tooltip);
                                                            }, 200);
                                                        }, 1500);
                                                    }}
                                                    className={`absolute ${message.sender === 'user' ? 'left-1' : 'right-1'} top-1 p-1.5 rounded-full 
                                                        ${message.sender === 'user' 
                                                            ? 'bg-cyan-700 hover:bg-cyan-800 text-white' 
                                                            : 'bg-gray-300 hover:bg-gray-400 text-gray-700'} 
                                                        opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100 transition-opacity`}
                                                    title="Copy message"
                                                    aria-label="Copy message"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                      ))}
                      {isTyping && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-end gap-2 justify-start">
                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0" />
                                    <div className="max-w-[75%] rounded-2xl px-4 py-3 bg-gray-200 text-gray-800 rounded-bl-none">
                                        <div className="flex items-center gap-1.5">
                                            <span className="h-1.5 w-1.5 bg-gray-500 rounded-full animate-pulse" />
                                            <span className="h-1.5 w-1.5 bg-gray-500 rounded-full animate-pulse [animation-delay:0.2s]" />
                                            <span className="h-1.5 w-1.5 bg-gray-500 rounded-full animate-pulse [animation-delay:0.4s]" />
                            </div>
                          </div>
                        </motion.div>
                      )}
                      
                      {/* Rating component */}
                      {currentStep === 'q9_rating' && !isTyping && (
                        <div className="flex flex-col items-center w-full">
                          <RatingStars onRate={(rating) => {
                            updateUserPreferences({ experienceRating: rating });
                            addMessage({ sender: 'user', content: `Rating: ${rating}/10 stars` });
                            addMessage({ sender: 'ai', content: isRTL ? "תודה על המשוב! כעת ניתן לסגור את השיחה בבטחה." : "Thank you for your feedback! It is safe now to close the conversation." });
                            
                            // Save session data with rating immediately
                            const saveRating = async () => {
                              try {
                                console.log("Saving rating:", rating); // Debug log
                                
                                if (!userPreferences.sessionId) {
                                  console.error("No session ID found, cannot save rating");
                                  return;
                                }
                                
                                // Explicitly convert rating to a number to ensure proper data type
                                const numericRating = Number(rating);
                                console.log("Numeric rating:", numericRating); // Debug log
                                
                                // Direct upsert approach - this will either insert or update
                                // Include all available user preferences to avoid null fields
                                const sessionData = {
                                  session_id: userPreferences.sessionId,
                                  experience_rating: numericRating,
                                  // Include other fields that might already be set
                                  mood: userPreferences.mood,
                                  brings_here_today: userPreferences.bringsHereToday,
                                  treatment_matters: userPreferences.treatmentMatters ? userPreferences.treatmentMatters : null,
                                  touch_style: userPreferences.touchStyle,
                                  therapist_preference: userPreferences.therapistPreference,
                                  session_location: userPreferences.sessionLocation,
                                  preferred_time: userPreferences.preferredTime,
                                  conversation_style: userPreferences.conversationStyle,
                                  additional_notes: userPreferences.additionalNotes,
                                  budget: userPreferences.budget,
                                  scent_preferences: userPreferences.scentPreferences,
                                  contact_info: userPreferences.contactInfo,
                                  location_live: userPreferences.locationLive,
                                  wants_scent_info: userPreferences.wantsScentInfo
                                };
                                
                                console.log("Upserting session with data:", sessionData);
                                
                                const { data, error } = await supabase
                                  .from('sessions')
                                  .upsert([sessionData], { 
                                    onConflict: 'session_id',
                                    ignoreDuplicates: false
                                  });
                                
                                if (error) {
                                  console.error("Error saving rating:", error);
                                  
                                  // Fallback to direct SQL if upsert fails
                                  const { error: sqlError } = await supabase
                                    .rpc('update_experience_rating', { 
                                      p_session_id: userPreferences.sessionId, 
                                      p_rating: numericRating 
                                    });
                                    
                                  if (sqlError) {
                                    console.error("SQL update failed:", sqlError);
                                  } else {
                                    console.log("Rating saved via SQL function");
                                  }
                                } else {
                                  console.log("Rating saved successfully:", data);
                                }
                              } catch (err) {
                                console.error("Exception when saving rating:", err);
                              }
                            };
                            
                            saveRating();
                            setCurrentStep('complete');
                          }} />
                        </div>
                      )}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                  </div>
    
                    <div className="p-3 md:p-4 border-t border-gray-200/80 bg-white/80 shrink-0">
                        {lastMessage?.multiChoiceOptions && !isTyping && (
                            <div className="mb-2 flex flex-col items-start gap-2">
                                <div className="flex flex-wrap gap-2">
                                    {lastMessage.multiChoiceOptions.map((option: string) => (
                                        <button key={option} onClick={() => handleMultiChoice(option)} className={`flex items-center gap-2 text-sm md:text-base px-3 md:px-4 py-2 rounded-full border-2 transition-all shadow-md ${selectedMultiChoice.includes(option) ? 'bg-cyan-600 text-white border-cyan-700' : 'bg-white text-cyan-700 border-cyan-600 hover:bg-gray-50'}`}>
                                            {selectedMultiChoice.includes(option) && <Check className="h-3 w-3 md:h-4 md:w-4" />}
                                            {option}
                                        </button>
                                    ))}
                                </div>
                                <Button onClick={submitMultiChoice} disabled={selectedMultiChoice.length === 0} size="sm" className="mt-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-sm md:text-base">{t.chat.continue}</Button>
                            </div>
                        )}
                        
                        {lastMessage?.options && !isTyping && (
                            <div className="mb-2 flex flex-wrap gap-2">
                                {lastMessage.options.map((option: string) => (
                                    <button key={option} onClick={() => handleOptionClick(option)} className="bg-cyan-600 text-white text-sm md:text-base px-3 md:px-4 py-2 rounded-full border border-cyan-700 hover:bg-cyan-700 transition-all font-medium shadow-md">
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
    
                    <div className="relative">
                      <Textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleTextInputSend(); } }}
                        placeholder={t.chat.placeholder}
                                className={`w-full bg-gray-100 border-gray-300 rounded-2xl p-3 ${isRTL ? 'pl-12 pr-3' : 'pr-12 pl-3'} resize-none text-base focus:ring-cyan-500 focus:border-cyan-500 ${isRTL ? 'text-right' : 'text-left'}`}
                        style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                        rows={1}
                            />
                            <Button onClick={handleTextInputSend} disabled={!inputValue.trim() || isTyping} size="icon" className={`absolute ${isRTL ? 'left-2' : 'right-2'} top-1/2 -translate-y-1/2 h-7 w-7 md:h-8 md:w-8 bg-cyan-600 hover:bg-cyan-700 rounded-full`}>
                                <ArrowUp className="h-3 w-3 md:h-4 md:w-4" />
                      </Button>
                    </div>
                  </div>
                    <ResearchModal />
                </div>
            </div>
        )
}