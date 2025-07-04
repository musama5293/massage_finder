"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X, Send } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { useLanguage } from "@/hooks/use-language"

export default function CommunicationModal({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (open: boolean) => void }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const { t, isRTL } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    
    try {
      // Save contact form data to Supabase
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          { 
            name,
            email,
            phone: phone || null, // Make phone optional
            message,
            created_at: new Date().toISOString()
          }
        ]);
      
      if (error) {
        console.error("Error submitting contact form:", error);
        setError("Failed to send message. Please try again later.");
        setIsSubmitting(false);
        return;
      }
      
      setIsSubmitting(false)
      setSubmitted(true)
      
      // Reset form after submission
      setTimeout(() => {
        setName("")
        setEmail("")
        setPhone("")
        setMessage("")
        setSubmitted(false)
        setIsOpen(false)
      }, 4000) // Give users 4 seconds to read the success message
    } catch (err) {
      console.error("Exception when submitting contact form:", err);
      setError("An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className={`sm:max-w-md ${isRTL ? 'rtl' : 'ltr'}`}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{t.contactModal.title}</DialogTitle>
        </DialogHeader>
        
        {submitted ? (
          <div className="py-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-medium text-green-600 mb-2">{t.contactModal.messageSent}</h3>
            <p className="text-base text-gray-600">{t.contactModal.getBackSoon}</p>
            <p className="text-sm text-gray-500 mt-4">{t.contactModal.autoClose}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-base">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="name" className="block text-base font-medium mb-1">{t.contactModal.name}</label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder={t.contactModal.namePlaceholder} 
                required 
                className="text-base"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-base font-medium mb-1">{t.contactModal.email}</label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder={t.contactModal.emailPlaceholder} 
                required 
                className="text-base"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-base font-medium mb-1">{t.contactModal.phone}</label>
              <Input 
                id="phone" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder={t.contactModal.phonePlaceholder} 
                className="text-base"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-base font-medium mb-1">{t.contactModal.message}</label>
              <Textarea 
                id="message" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder={t.contactModal.messagePlaceholder} 
                rows={4} 
                required 
                className="text-base"
              />
            </div>
            
            <DialogFooter>
              <Button 
                type="submit" 
                className="w-full bg-teal-600 hover:bg-teal-700 text-white text-base py-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t.contactModal.sending}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    {t.contactModal.sendMessage}
                  </span>
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
