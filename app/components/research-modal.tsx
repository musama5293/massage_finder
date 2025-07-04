"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { useAppStore } from "../store/use-app-store"
import { useLanguage } from "@/hooks/use-language"

export default function ResearchModal() {
  const { showResearchModal, toggleResearchModal, addMessage, setCurrentStep } = useAppStore()
  const { t, isRTL } = useLanguage()

  const handleContinueAfterResearch = (interested: boolean) => {
    toggleResearchModal()
    
    if (interested) {
      addMessage({
        sender: "ai",
        content: t.researchModal.interestedResponse
      })
      
      setTimeout(() => {
        addMessage({
          sender: "ai", 
          content: t.chat.bringsHereQuestion,
          options: [
            t.chat.experienceOptions.yes,
            t.chat.experienceOptions.no
          ]
        })
        setCurrentStep("bringsHereToday")
      }, 2000)
    } else {
      addMessage({
        sender: "ai",
        content: t.researchModal.notInterestedResponse
      })
      
      setTimeout(() => {
        addMessage({
          sender: "ai",
          content: t.chat.bringsHereQuestion,
          options: [
            t.chat.bringsHereOptions.therapist,
            t.chat.bringsHereOptions.trainee,
            t.chat.bringsHereOptions.consult,
            t.chat.bringsHereOptions.massage,
            t.chat.bringsHereOptions.more
          ]
        })
        setCurrentStep("bringsHereToday")
      }, 2000)
    }
  }

  return (
    <Dialog open={showResearchModal} onOpenChange={toggleResearchModal}>
      <DialogContent className={`max-w-2xl bg-gray-900 border-gray-700 text-white ${isRTL ? 'rtl' : 'ltr'}`}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#00D97E] mb-4">
            {t.researchModal.title}
          </DialogTitle>
        </DialogHeader>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-[#00D97E]">{t.researchModal.results.title}</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className={`text-[#00D97E] ${isRTL ? 'ml-2' : 'mr-2'}`}>•</span>
                <span><strong>{isRTL ? 'הפחתת רמות הקורטיזול' : 'Reduced Cortisol Levels'}</strong> {t.researchModal.results.items.cortisol}</span>
              </li>
              <li className="flex items-start">
                <span className={`text-[#00D97E] ${isRTL ? 'ml-2' : 'mr-2'}`}>•</span>
                <span><strong>{isRTL ? 'שיפור איכות השינה' : 'Improved Sleep Quality'}</strong> {t.researchModal.results.items.sleep}</span>
              </li>
              <li className="flex items-start">
                <span className={`text-[#00D97E] ${isRTL ? 'ml-2' : 'mr-2'}`}>•</span>
                <span><strong>{isRTL ? 'הפחתת חרדה ומתח' : 'Reduced Anxiety and Stress'}</strong> {t.researchModal.results.items.anxiety}</span>
              </li>
              <li className="flex items-start">
                <span className={`text-[#00D97E] ${isRTL ? 'ml-2' : 'mr-2'}`}>•</span>
                <span><strong>{isRTL ? 'שחרור מתח שרירי' : 'Muscle Tension Relief'}</strong> {t.researchModal.results.items.muscle}</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-[#00D97E]">{t.researchModal.howItWorks.title}</h3>
            <p className="text-gray-300 leading-relaxed">
              {t.researchModal.howItWorks.description}
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-[#00D97E]">{t.researchModal.protocol.title}</h3>
            <p className="text-gray-300 leading-relaxed">
              {t.researchModal.protocol.description}
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Button
              onClick={() => handleContinueAfterResearch(true)}
              className="bg-[#00D97E] hover:bg-[#00C470] text-black px-8 py-3 rounded-full font-medium"
            >
              {t.researchModal.buttons.interested}
            </Button>
            <Button
              onClick={() => handleContinueAfterResearch(false)}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 rounded-full"
            >
              {t.researchModal.buttons.notInterested}
            </Button>
          </div>

          <div className="text-center">
            <a 
              href="#" 
              className="text-[#00D97E] hover:text-[#00C470] text-sm inline-flex items-center gap-1"
            >
              {t.researchModal.readMore} <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
} 