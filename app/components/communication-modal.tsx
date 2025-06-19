"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Phone, Send } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { useAppStore } from "../store/use-app-store"

export default function CommunicationModal() {
  const { showCommunicationModal, toggleCommunicationModal, recommendedTherapist, userPreferences } = useAppStore()
  const [contactInfo, setContactInfo] = useState("")
  const [selectedMethod, setSelectedMethod] = useState<"whatsapp" | "telegram" | "phone" | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!contactInfo.trim() || !selectedMethod) return

    // Here you would typically send the contact info to your backend
    console.log("Contact submission:", {
      method: selectedMethod,
      contact: contactInfo,
      therapist: recommendedTherapist?.name,
      preferences: userPreferences,
      isDiscrete: userPreferences.contactMethod?.includes("דיסקרטי") || contactInfo.includes("דיסקרטי")
    })

    setIsSubmitted(true)
    
    // Close modal after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setContactInfo("")
      setSelectedMethod(null)
      toggleCommunicationModal()
    }, 3000)
  }

  // Check if user requested discrete communication
  const isDiscreteRequest = userPreferences.contactMethod?.includes("דיסקרטי") || 
                           userPreferences.additionalNotes?.includes("דיסקרטי")

  if (isSubmitted) {
    return (
      <Dialog open={showCommunicationModal} onOpenChange={toggleCommunicationModal}>
        <DialogContent className="max-w-md bg-gray-900 border-gray-700 text-white text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-8"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-blue-400">נשלח בהצלחה!</h3>
            <p className="text-white/80 mb-4">
              {recommendedTherapist?.name} תצור איתך קשר בקרוב
            </p>
            <div className="text-sm text-white/60">
              זמן מוערך: 15-30 דקות
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={showCommunicationModal} onOpenChange={toggleCommunicationModal}>
      <DialogContent className="max-w-lg bg-gray-900 border-gray-700 text-white" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-400 mb-4">
            צור קשר עם {recommendedTherapist?.name}
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Therapist Info Summary */}
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg font-bold">
                {recommendedTherapist?.name.charAt(0)}
              </div>
              <div>
                <div className="font-medium">{recommendedTherapist?.name}</div>
                <div className="text-sm text-white/60">{recommendedTherapist?.specialties}</div>
              </div>
            </div>
            <div className="text-sm text-white/80">
              מיקום: {recommendedTherapist?.location} | מחיר: {recommendedTherapist?.prices}
            </div>
          </div>

          {/* Contact Method Selection */}
          <div>
            <h3 className="text-lg font-medium mb-3">איך תרצה שנצור איתך קשר?</h3>
            <div className="grid grid-cols-1 gap-3">
              {!isDiscreteRequest && (
                <button
                  onClick={() => setSelectedMethod("whatsapp")}
                  className={`flex items-center gap-3 p-4 rounded-lg border transition-all ${
                    selectedMethod === "whatsapp"
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-gray-600 hover:border-gray-500 bg-gray-800"
                  }`}
              >
                  <MessageCircle className="h-5 w-5 text-green-400" />
                  <div className="text-right">
                    <div className="font-medium">וואטסאפ</div>
                    <div className="text-sm text-white/60">תגובה מהירה וקלה</div>
            </div>
                </button>
              )}

              <button
                onClick={() => setSelectedMethod("telegram")}
                className={`flex items-center gap-3 p-4 rounded-lg border transition-all ${
                  selectedMethod === "telegram"
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-gray-600 hover:border-gray-500 bg-gray-800"
                }`}
              >
                <MessageCircle className="h-5 w-5 text-blue-400" />
                <div className="text-right">
                  <div className="font-medium">טלגרם</div>
                  <div className="text-sm text-white/60">
                    {isDiscreteRequest ? "דיסקרטי ופרטי" : "תקשורת מאובטחת"}
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectedMethod("phone")}
                className={`flex items-center gap-3 p-4 rounded-lg border transition-all ${
                  selectedMethod === "phone"
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-gray-600 hover:border-gray-500 bg-gray-800"
                }`}
              >
                <Phone className="h-5 w-5 text-amber-400" />
                <div className="text-right">
                  <div className="font-medium">שיחת טלפון</div>
                  <div className="text-sm text-white/60">
                    {isDiscreteRequest ? "ממספר פרטי 09-7961414" : "שיחה אישית ישירה"}
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Contact Info Input */}
          <div>
            <h3 className="text-lg font-medium mb-3">
              {selectedMethod === "phone" ? "מספר הטלפון שלך:" : "פרטי הקשר שלך:"}
            </h3>
            <Input
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              placeholder={
                selectedMethod === "phone" 
                  ? "050-1234567" 
                  : selectedMethod === "telegram"
                  ? "@username או מספר טלפון"
                  : "מספר טלפון או שם משתמש"
              }
              className="bg-gray-800 border-gray-600 text-white placeholder-white/50 text-right"
              dir="ltr"
            />
            {isDiscreteRequest && (
              <p className="text-sm text-amber-400 mt-2">
                📞 נתקשר ממספר פרטי למשרד שלנו לשמירה על דיסקרטיות
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!contactInfo.trim() || !selectedMethod}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium disabled:opacity-50"
          >
            <Send className="h-4 w-4 ml-2" />
            שלח פרטים
          </Button>

          {/* Additional Info */}
          <div className="text-center text-sm text-white/60">
            <p>
              הפרטים שלך יישלחו ישירות למטפל. הוא יצור איתך קשר תוך 15-30 דקות.
            </p>
            {userPreferences.preferredTime && (
              <p className="mt-1 text-blue-400">
                זמן מועדף שציינת: {userPreferences.preferredTime}
              </p>
            )}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
