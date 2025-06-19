"use client"

import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowUp, Check, Star, MessageCircle, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useAppStore } from "../store/use-app-store"
import { supabase } from "@/lib/supabaseClient"

const preferenceLabels: { [key: string]: string } = {
  mood: "Current Mood",
  wantsResearchInfo: "Interested in Research",
  wantsToExperience: "Wants to Experience Protocol",
  bringsHereToday: "Reason for Visit",
  treatmentMatters: "What Matters in Treatment",
  touchStyle: "Preferred Touch Style",
  therapistPreference: "Therapist Preference",
  sessionLocation: "Session Location",
  preferredTime: "Preferred Time",
  conversationStyle: "Conversation Style",
  additionalNotes: "Additional Notes",
  scentPreferences: "Scent Preferences"
};

const TherapistCard = ({ therapist }: { therapist: any }) => (
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm">
        <div className="p-5">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-teal-100 flex-shrink-0" />
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg text-gray-800">{therapist.name}</h3>
                        <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-md">{therapist.experience}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                         <Clock className="h-4 w-4 text-gray-400" />
                         <p className="text-sm text-gray-600">{therapist.availability}</p>
                    </div>
                </div>
            </div>
            <p className="text-sm text-gray-600 mt-4 pl-1">{therapist.specialties}</p>
            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                    <span className="font-bold text-gray-700">{therapist.rating}</span>
                    <span className="text-sm text-gray-500">({therapist.reviewCount} reviews)</span>
                </div>
                <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-4">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat Privately
                </Button>
            </div>
        </div>
    </div>
);

// Placeholders for other components - assuming they exist
const ResearchModal = () => {
    const { showResearchModal, toggleResearchModal } = useAppStore();
    if (!showResearchModal) return null;
  return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-lg">
                <h2 className="text-lg font-bold mb-2">Research Summary</h2>
                <p className="text-sm text-gray-600 mb-4">Aromatherapy and massage have been scientifically shown to reduce stress and improve sleep. Our AI protocol uses your scent preferences to create a personalized, effective experience.</p>
                <Button onClick={toggleResearchModal}>Close</Button>
            </div>
        </div>
    )
};

export default function ChatInterface() {
  const [inputValue, setInputValue] = useState("")
    const [selectedMultiChoice, setSelectedMultiChoice] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

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
  } = useAppStore()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

    useEffect(scrollToBottom, [messages, isTyping])

  useEffect(() => {
        const recommendTherapist = async () => {
            setIsTyping(true);
            await new Promise(resolve => setTimeout(resolve, 2000));
            setIsTyping(false);

            const therapists = [
                { 
                    id: 'therapist-1', name: 'Kristin Watson', experience: '8+ years', availability: 'Available today', specialties: 'Deep tissue, aromatherapy, stress relief', rating: 4.9, reviewCount: 127, image: '/placeholder.svg', verified: true, gender: 'Woman', phone: '123-456-7890', services: '60 min massage', prices: '$150', location: "Therapist's Studio", timeAvailable: ['Afternoon'], specialty: 'Holistic & Deep Tissue Specialist', 
                },
                { 
                    id: 'therapist-2', name: 'Marcus Johnson', experience: '12+ years', availability: 'Available tomorrow', specialties: 'Swedish massage, essential oils, relaxation', rating: 4.8, reviewCount: 89, image: '/placeholder.svg', verified: true, gender: 'Man', phone: '123-456-7890', services: '90 min massage', prices: '$200', location: "Therapist's Studio", timeAvailable: ['Morning', 'Evening'], specialty: 'Swedish & Relaxation Specialist',
                },
                { 
                    id: 'therapist-3', name: 'Elena Rodriguez', experience: '6+ years', availability: 'Available today', specialties: 'Sports massage, myofascial release', rating: 4.9, reviewCount: 95, image: '/placeholder.svg', verified: true, gender: 'Woman', phone: '123-456-7890', services: '60 min sports massage', prices: '$140', location: "Therapist's Studio", timeAvailable: ['Evening'], specialty: 'Sports & Injury Recovery',
                }
            ];

            const therapistData = therapists[Math.floor(Math.random() * therapists.length)];

            addMessage({ sender: 'ai', content: "Based on your preferences, here's a therapist we recommend for you:" });
            addMessage({ sender: 'ai', content: '', therapistInfo: therapistData });
            addMessage({ sender: 'ai', content: "A representative will be calling you shortly to coordinate." });
            setCurrentStep('complete');
        };

        if (currentStep === 'final_recommendation') {
            recommendTherapist();
        }
    }, [currentStep, addMessage, setCurrentStep, setIsTyping]);

    useEffect(() => {
        const saveSessionData = async () => {
            if (userPreferences.hasAgreed) {
                const { hasAgreed, ...preferencesToSave } = userPreferences;

                const { data, error } = await supabase
                    .from('sessions')
                    .insert([
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
                        }
                    ]);
                
                if (error) {
                    console.error("Error saving session data:", error);
                }
            }
        };

        if (currentStep === 'complete') {
            saveSessionData();
        }
    }, [currentStep, userPreferences]);

    const processAndSendMessage = async (content: string) => {
        addMessage({ sender: "user", content });
        setIsTyping(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        await handleConversationLogic(content);
        setIsTyping(false);
    };

    const handleTextInputSend = () => {
        if (!inputValue.trim()) return;
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
                addMessage({ sender: 'ai', content: `Of course! Here's a summary of your preferences so far:\n\n${summaryLines.join('\n')}` });
            } else {
                addMessage({ sender: 'ai', content: "We haven't gathered enough information for a summary yet." });
            }
            return;
        }

        if (lowerCaseInput.includes("talk to a human")) {
            addMessage({ sender: 'ai', content: "Of course. You can reach our support team at support@thera-scent.com or call us at +1-234-567-890." });
            setCurrentStep('complete');
            return;
        }

        // Special keyword check
        if (lowerCaseInput.includes("i am a therapist")) {
            updateUserPreferences({ bringsHereToday: 'therapist' });
            addMessage({ sender: 'ai', content: "Great! Please provide your mobile phone or Telegram, and a representative will call you. Is there a specific time of day you prefer?" });
            setCurrentStep('q3_contact');
            return;
        }

        switch (currentStep) {
            case 'q1_mood':
                updateUserPreferences({ mood: userInput });
                addMessage({ sender: 'ai', content: "I'm Miguel, Tomer's AI personal assistant. Our key values: discretion, mutual respect, and providing real value. Did you know that a group of scientists developed a protocol for a massage therapy that was scientifically proven to be effective in reducing stress and anxiety and improving sleep quality?" });
                addMessage({ sender: 'ai', content: "Would you like more information or would you be interested in a different kind of massage?", options: ["Yes, I want more information", "No, I'm interested in a different kind of massage"] });
                setCurrentStep('q2_research_interest');
                break;

            case 'q2_research_interest':
                if (lowerCaseInput.includes('yes')) {
                    updateUserPreferences({ wantsResearchInfo: true });
                    addMessage({ sender: 'ai', content: "Here is a summary of the research..." });
                    toggleResearchModal();
                    addMessage({ sender: 'ai', content: "Does this sound like something you would like to experience?", options: ["Yes, it does", "No, not for me"] });
                    setCurrentStep('q2_experience_interest');
                } else {
                    updateUserPreferences({ wantsResearchInfo: false });
                    addMessage({ sender: 'ai', content: "No problem. To create a session that truly suits you, please tell us what brings you here today.", options: ["I am a certified therapist", "I am a trainee looking to practice", "I just need to consult and talk", "I would like to get a professional massage", "Other"] });
                    setCurrentStep('q3_brings_here');
                }
                break;

            case 'q2_experience_interest':
                if (lowerCaseInput.includes('yes')) {
                    updateUserPreferences({ wantsToExperience: true });
                    addMessage({ sender: 'ai', content: "Excellent! A representative will call you shortly. What is your WhatsApp or Telegram?" });
                    setCurrentStep('q2_contact');
                } else {
                    updateUserPreferences({ wantsToExperience: false });
                    addMessage({ sender: 'ai', content: "Understood. To create a session that truly suits you, please tell us what brings you here today.", options: ["I am a certified therapist", "I am a trainee looking to practice", "I just need to consult and talk", "I would like to get a professional massage", "Other"] });
                    setCurrentStep('q3_brings_here');
                }
                break;

            case 'q2_contact':
                updateUserPreferences({ contactInfo: userInput });
                addMessage({ sender: 'ai', content: "Thank you! We'll be in touch shortly." });
                setCurrentStep('complete');
                break;

            case 'q3_contact':
                updateUserPreferences({ contactInfo: userInput });
                addMessage({ sender: 'ai', content: "Got it. A representative will contact you soon. Thank you!" });
                setCurrentStep('complete');
                break;

            case 'q3_consult_contact':
                updateUserPreferences({ contactInfo: userInput });
                addMessage({ sender: 'ai', content: "Perfect. We will reach out on your preferred platform. Talk soon!" });
                setCurrentStep('complete');
                break;

            case 'q3_brings_here':
                if (lowerCaseInput.includes('other')) {
                    addMessage({ sender: 'ai', content: "I see. Could you please tell me a bit more about what brings you here today?" });
                    setCurrentStep('q3_brings_here_other');
                } else if (lowerCaseInput.includes('therapist') || lowerCaseInput.includes('trainee')) {
                    const userType = lowerCaseInput.includes('therapist') ? 'therapist' : 'trainee';
                    updateUserPreferences({ bringsHereToday: userType });
                    addMessage({ sender: 'ai', content: "Wonderful. Please provide your mobile phone or Telegram, and a representative will call you. Is there a specific time of the day you prefer?" });
                    setCurrentStep('q3_contact');
                } else if (lowerCaseInput.includes('consult')) {
                    updateUserPreferences({ bringsHereToday: 'consult' });
                    addMessage({ sender: 'ai', content: "I understand. Let's move this to a more private chat. Do you prefer Telegram or WhatsApp?" });
                    setCurrentStep('q3_consult_contact');
                } else {
                    updateUserPreferences({ bringsHereToday: 'massage' });
                    addMessage({ sender: 'ai', content: "I see- that's cool…. We want to give you a unique experience that truly meets your needs." });
                    addMessage({ sender: 'ai', content: "Tell us what matters most to you in a treatment or therapist. The more you share, the better we can match you with the perfect experience. Feel free to choose one or more of the following options or write your own answer.", multiChoiceOptions: ["I have difficulty sleeping", "I need to relax and reset", "I work out a lot and feel tension", "My body and soul need a deep release", "I'm missing touch lately -🙁", "Other"] });
                    setCurrentStep('q4_treatment_matters');
                }
                break;

            case 'q3_brings_here_other':
                updateUserPreferences({ bringsHereToday: userInput });
                addMessage({ sender: 'ai', content: "Thank you for sharing. We want to give you a unique experience that truly meets your needs." });
                addMessage({ sender: 'ai', content: "Tell us what matters most to you in a treatment or therapist. The more you share, the better we can match you with the perfect experience. Feel free to choose one or more of the following options or write your own answer.", multiChoiceOptions: ["I have difficulty sleeping", "I need to relax and reset", "I work out a lot and feel tension", "My body and soul need a deep release", "I'm missing touch lately -🙁", "Other"] });
                setCurrentStep('q4_treatment_matters');
                break;

            case 'q4_treatment_matters':
                const treatmentMatters = userInput.split(', ');
                updateUserPreferences({ treatmentMatters });

                if (treatmentMatters.includes("Other")) {
                    addMessage({ sender: 'ai', content: "You selected 'Other'. Could you please specify what else matters to you?" });
                    setCurrentStep('q4_treatment_matters_other');
                } else {
                    addMessage({ sender: 'ai', content: "Let's make your session just right — tell us what you prefer:" });
                    addMessage({ sender: 'ai', content: "Touch style?", options: ["Deep and strong", "Gentle and soft", "Intuitive"] });
                    setCurrentStep('q5_touch_style');
                }
                break;

            case 'q4_treatment_matters_other':
                const existingMatters = userPreferences.treatmentMatters?.filter(m => m !== "Other") || [];
                const newMatters = [...existingMatters, userInput];
                updateUserPreferences({ treatmentMatters: newMatters });
                
                addMessage({ sender: 'ai', content: "Thank you for clarifying. Now, let's make your session just right — tell us what you prefer:" });
                addMessage({ sender: 'ai', content: "Touch style?", options: ["Deep and strong", "Gentle and soft", "Intuitive"] });
                setCurrentStep('q5_touch_style');
                break;

            case 'q5_touch_style':
                updateUserPreferences({ touchStyle: userInput });
                addMessage({ sender: 'ai', content: "Therapist preference?", options: ["No preference", "Woman", "Man", "Just the vibe"] });
                setCurrentStep('q5_therapist_pref');
                break;

            case 'q5_therapist_pref':
                updateUserPreferences({ therapistPreference: userInput });
                addMessage({ sender: 'ai', content: "Session location?", options: ["My place", "Therapist's studio", "Flexible"] });
                setCurrentStep('q5_location');
                break;

            case 'q5_location':
                updateUserPreferences({ sessionLocation: userInput });
                addMessage({ sender: 'ai', content: "Preferred time?", options: ["Available now", "Morning", "Afternoon", "Evening", "Late night"] });
                setCurrentStep('q5_time');
                break;

            case 'q5_time':
                updateUserPreferences({ preferredTime: userInput });
                addMessage({ sender: 'ai', content: "Conversation style?", options: ["Quiet", "A little chat", "Playful", "Personal"] });
                setCurrentStep('q5_convo_style');
                break;

            case 'q5_convo_style':
                updateUserPreferences({ conversationStyle: userInput });
                addMessage({ sender: 'ai', content: "Anything else you'd like your therapist to know about what makes you feel good?" });
                setCurrentStep('q6_additional_notes');
                break;

            case 'q6_additional_notes':
                updateUserPreferences({ additionalNotes: userInput });
                addMessage({ sender: 'ai', content: "Science has shown that certain scent molecules can help ease muscle tension and boost relaxation. Want us to create a custom therapeutic scent just for you, based on real science? Tell us your favourite perfumes — it'll help us get to know your scent vibe and craft the perfect calming blend for your session" });
                setCurrentStep('q7_scent_prefs');
                break;

            case 'q7_scent_prefs':
                const updatedPrefs = { ...userPreferences, scentPreferences: userInput };
                updateUserPreferences({ scentPreferences: userInput });
                
                const summaryLines = Object.entries(updatedPrefs)
                    .map(([key, value]) => {
                        const label = preferenceLabels[key as keyof typeof preferenceLabels];
                        if (!label || !value || (Array.isArray(value) && value.length === 0)) return null;
                        const formattedValue = Array.isArray(value) ? value.join(', ') : value;
                        return `**${label}:** ${formattedValue}`;
                    })
                    .filter(Boolean);

                addMessage({ sender: 'ai', content: `Got it. Here is the final summary of your preferences:\n\n${summaryLines.join('\n')}` });
                addMessage({ sender: 'ai', content: "Just one last thing before we connect you with the therapist — your (anonymous) answers help us improve. Thanks for making us better!" });
                setCurrentStep('q8_agreement');
                break;

            case 'q8_agreement':
                updateUserPreferences({ hasAgreed: true });
                addMessage({ sender: 'ai', content: "Thanks for making us better!" });
                setCurrentStep('final_recommendation');
                break;

            case 'q9_recommendation':
                // This case is now handled by the useEffect
                break;

            case 'complete':
                addMessage({ sender: 'ai', content: "I've provided all the information I have for now. If you'd like to start a new search, you can say 'Start Over'." });
                break;

            default:
                addMessage({ sender: 'ai', content: "I'm sorry, I didn't quite understand that. I'm still in training and learning new things every day!" });
      addMessage({
                    sender: 'ai',
                    content: "Oops, Tomer didn't prepare me for that one lol. I am a generative AI personal assistant. Could you please answer again?",
                });
                // Re-ask the last question to prevent a hard loop
                const lastAiMessage = [...messages].reverse().find(m => m.sender === 'ai');
                if (lastAiMessage) {
                    addMessage({ sender: 'ai', content: lastAiMessage.content, options: lastAiMessage.options, multiChoiceOptions: (lastAiMessage as any).multiChoiceOptions });
                }
                break;
        }
    }

    const lastMessage = messages[messages.length - 1];

  return (
        <div className="flex flex-col h-screen bg-white">
            <header className="p-4 border-b border-gray-200">
                <h1 className="text-xl font-semibold text-gray-800">Your AI Assistant</h1>
        </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
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
                            {message.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0" />}
                            <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${message.sender === 'user' ? 'bg-cyan-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                                {message.therapistInfo ? (
                                    <TherapistCard therapist={message.therapistInfo} />
                                ) : (
                                    <p className="text-sm" dangerouslySetInnerHTML={{ __html: message.content.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
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
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

            <div className="p-4 border-t border-gray-200">
                {lastMessage?.multiChoiceOptions && !isTyping && (
                    <div className="mb-2 flex flex-col items-start gap-2">
                        <div className="flex flex-wrap gap-2">
                            {lastMessage.multiChoiceOptions.map((option: string) => (
                                <button key={option} onClick={() => handleMultiChoice(option)} className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border transition-all ${selectedMultiChoice.includes(option) ? 'bg-cyan-600 text-white border-cyan-600' : 'bg-white text-cyan-700 border-gray-300 hover:bg-gray-50'}`}>
                                    {selectedMultiChoice.includes(option) && <Check className="h-3 w-3" />}
                                    {option}
                                </button>
                            ))}
                        </div>
                        <Button onClick={submitMultiChoice} disabled={selectedMultiChoice.length === 0} size="sm" className="mt-2">Continue</Button>
        </div>
                )}
                
                {lastMessage?.options && !isTyping && (
                    <div className="mb-2 flex flex-wrap gap-2">
                        {lastMessage.options.map((option: string) => (
                            <button key={option} onClick={() => handleOptionClick(option)} className="bg-white text-cyan-700 text-xs px-3 py-1.5 rounded-full border border-gray-300 hover:bg-gray-50 transition-all">
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
                placeholder="Type your message..."
                        className="w-full bg-gray-100 border-gray-300 rounded-2xl p-3 pr-12 resize-none text-sm focus:ring-cyan-500 focus:border-cyan-500"
                rows={1}
                    />
                    <Button onClick={handleTextInputSend} disabled={!inputValue.trim() || isTyping} size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-cyan-600 hover:bg-cyan-700 rounded-full">
                        <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
            <ResearchModal />
    </div>
  )
}