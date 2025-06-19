"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, CheckCircle, Phone, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useAppStore } from "../store/use-app-store"

export default function TherapistRecommendations() {
  const { recommendedTherapist} = useAppStore()

  if (!recommendedTherapist) return null

  return (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#00D97E] mb-2">
          ההמלצה המותאמת אישית שלך
        </h2>
        <p className="text-white/80">
          בהתבסס על ההעדפות שלך, מצאנו עבורך את המטפל המושלם
              </p>
      </div>

      <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                    <CardContent className="p-6">
          <div className="flex items-start gap-4">
            {/* Therapist Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00D97E] to-[#00C470] flex-shrink-0 flex items-center justify-center text-2xl font-bold text-black">
                {recommendedTherapist.name.charAt(0)}
                          </div>
              {recommendedTherapist.verified && (
                <div className="absolute -top-1 -right-1 bg-[#00D97E] rounded-full p-1">
                  <CheckCircle className="h-4 w-4 text-black" />
                            </div>
                          )}
                        </div>

                        {/* Therapist Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-lg text-white">{recommendedTherapist.name}</h3>
                <span className="bg-[#00D97E] text-black text-xs px-2 py-1 rounded-full font-medium">
                  {recommendedTherapist.experience}
                </span>
                          </div>

              <div className="flex items-center gap-1 mb-2">
                <div className="w-2 h-2 bg-[#00D97E] rounded-full"></div>
                <span className="text-[#00D97E] text-sm font-medium">{recommendedTherapist.availability}</span>
                          </div>

              <p className="text-white/80 text-sm mb-3 leading-relaxed">
                {recommendedTherapist.specialties.replace('essential oils', 'ריחות טיפוליים מבוססי מדע')}
              </p>

              <div className="flex items-center gap-4 mb-3">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                        i < Math.floor(recommendedTherapist.rating) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-600'
                                    }`}
                                  />
                                ))}
                  <span className="text-white text-sm mr-2">{recommendedTherapist.rating}</span>
                  <span className="text-white/60 text-sm">({recommendedTherapist.reviewCount} ביקורות)</span>
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">מיקום:</span>
                  <span className="text-white">{recommendedTherapist.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">מחיר:</span>
                  <span className="text-white">{recommendedTherapist.prices}</span>
                              </div>
                <div className="flex justify-between">
                  <span className="text-white/60">זמינות:</span>
                  <span className="text-white">{recommendedTherapist.timeAvailable.join(', ')}</span>
                            </div>
                          </div>
                        </div>
            </div>

          {/* Contact Button */}
          <div className="mt-6 flex flex-col gap-3">
              <Button
              // onClick={toggleCommunicationModal}
              className="w-full bg-[#00D97E] hover:bg-[#00C470] text-black font-medium py-3 rounded-2xl"
              >
              <MessageCircle className="h-5 w-5 mr-2" />
              צור קשר עכשיו
              </Button>

            <div className="flex items-center justify-center gap-4 text-sm text-white/60">
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>שיחה פרטית</span>
              </div>
              <div className="w-1 h-1 bg-white/30 rounded-full"></div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>טלגרם/וואטסאפ</span>
              </div>
            </div>
          </div>

          {/* Services Description */}
          <div className="mt-4 p-4 bg-black/20 rounded-lg">
            <h4 className="font-medium text-[#00D97E] mb-2">השירותים שלה:</h4>
            <p className="text-white/80 text-sm leading-relaxed">
              {recommendedTherapist.services} - עיסוי מותאם אישית עם ריחות טיפוליים מבוססי מדע 
              שנבחרו במיוחד עבורך בהתבסס על ההעדפות שלך
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Call Status */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
          <div className="w-2 h-2 bg-[#00D97E] rounded-full animate-pulse"></div>
          <span className="text-white/80 text-sm">מתקשרת אליך מיד אחרי הלקוח הבא</span>
        </div>
      </div>
    </motion.div>
  )
}
