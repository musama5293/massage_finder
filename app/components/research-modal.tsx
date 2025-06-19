"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { useAppStore } from "../store/use-app-store"

export default function ResearchModal() {
  const { showResearchModal, toggleResearchModal, addMessage, setCurrentStep } = useAppStore()

  const handleContinueAfterResearch = (interested: boolean) => {
    toggleResearchModal()
    
    if (interested) {
      addMessage({
        sender: "ai",
        content: "נהדר! זה נשמע כמו משהו שתרצה לחוות? אם כן, אשמח לחבר אותך למטפל המתאים. אם לא, בואו נמצא לך את סוג העיסוי שמתאים לך בדיוק."
      })
      
      setTimeout(() => {
        addMessage({
          sender: "ai", 
          content: "כדי ליצור עבורך פגישה שבאמת מתאימה לך, ספר לנו מה הביא אותך לכאן היום.",
          options: [
            "כן, זה נשמע מעולה - בואו נמשיך",
            "לא, אני מעוניין בסוג אחר של עיסוי"
          ]
        })
        setCurrentStep("bringsHereToday")
      }, 2000)
    } else {
      addMessage({
        sender: "ai",
        content: "אין בעיה! בואו נמצא לך את סוג העיסוי שמתאים לך בדיוק."
      })
      
      setTimeout(() => {
        addMessage({
          sender: "ai",
          content: "כדי ליצור עבורך פגישה שבאמת מתאימה לך, ספר לנו מה הביא אותך לכאן היום.",
          options: [
            "אני מטפל מוסמך",
            "אני מתלמד המחפש להתרגל ולבנות קליינטלה", 
            "אני רק צריך להתייעץ ולדבר",
            "אני רוצה לקבל עיסוי מקצועי",
            "אחר"
          ]
        })
        setCurrentStep("bringsHereToday")
      }, 2000)
    }
  }

  return (
    <Dialog open={showResearchModal} onOpenChange={toggleResearchModal}>
      <DialogContent className="max-w-2xl bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#00D97E] mb-4">
            מחקר מדעי על עיסוי טיפולי עם ריחות טיפוליים
          </DialogTitle>
        </DialogHeader>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-[#00D97E]">תוצאות המחקר:</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-[#00D97E] mr-2">•</span>
                <span><strong>הפחתת רמות הקורטיזול</strong> (הורמון הלחץ) ב-23% בממוצע</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#00D97E] mr-2">•</span>
                <span><strong>שיפור איכות השינה</strong> ב-31% מהמשתתפים דיווחו על שינה טובה יותר</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#00D97E] mr-2">•</span>
                <span><strong>הפחתת חרדה ומתח</strong> ב-45% מהמשתתפים הרגישו רגועים יותר</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#00D97E] mr-2">•</span>
                <span><strong>שחרור מתח שרירי</strong> השילוב של עיסוי וריחות הוכח כיעיל פי 2</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-[#00D97E]">איך זה עובד?</h3>
            <p className="text-gray-300 leading-relaxed">
              המחקר הראה שמולקולות ריח ספציפיות מעוררות את המערכת הלימבית במוח, 
              האחראית על רגולציה של לחץ ורגשות. כשמשלבים זאת עם עיסוי טיפולי, 
              נוצרת סינרגיה שמגבירה את היתרונות הטיפוליים של שני הטיפולים.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-[#00D97E]">הפרוטוקול שלנו:</h3>
            <p className="text-gray-300 leading-relaxed">
              אנחנו משתמשים בפרוטוקול מותאם אישית שמבוסס על העדפות הריח האישיות שלך, 
              בשילוב עם טכניקות עיסוי מתקדמות. כל פגישה מותאמת לצרכים הספציפיים שלך.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Button
              onClick={() => handleContinueAfterResearch(true)}
              className="bg-[#00D97E] hover:bg-[#00C470] text-black px-8 py-3 rounded-full font-medium"
            >
              כן, זה נשמע מעניין! בואו נמשיך
            </Button>
            <Button
              onClick={() => handleContinueAfterResearch(false)}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 rounded-full"
            >
              לא, אני מעוניין בעיסוי רגיל
            </Button>
          </div>

          <div className="text-center">
            <a 
              href="#" 
              className="text-[#00D97E] hover:text-[#00C470] text-sm inline-flex items-center gap-1"
            >
              קרא את המחקר המלא <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
} 