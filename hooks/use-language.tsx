"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Language, translations, Translations } from '@/lib/translations'
import { useAppStore } from '@/app/store/use-app-store'

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: Translations
  isRTL: boolean
  mounted: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)
  const retranslateMessages = useAppStore(state => state.retranslateMessages)

  // Always start with English (no localStorage persistence)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle language changes: set document direction and retranslate
  useEffect(() => {
    if (!mounted) return // Don't run until after mount
    
    // Set document direction for RTL support
    if (language === 'he') {
      document.documentElement.dir = 'rtl'
      document.documentElement.lang = 'he'
    } else {
      document.documentElement.dir = 'ltr'
      document.documentElement.lang = 'en'
    }

    // Force retranslation of all messages
    if (typeof retranslateMessages === 'function') {
      retranslateMessages(translations[language])
    }
  }, [language, mounted, retranslateMessages])

  const value = {
    language,
    setLanguage,
    t: translations[language],
    isRTL: language === 'he',
    mounted
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 