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

  // Mark as mounted and load language from localStorage
  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'he')) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Handle language changes: save to localStorage, set document direction, and retranslate
  useEffect(() => {
    localStorage.setItem('language', language)
    
    // Set document direction for RTL support
    if (language === 'he') {
      document.documentElement.dir = 'rtl'
      document.documentElement.lang = 'he'
    } else {
      document.documentElement.dir = 'ltr'
      document.documentElement.lang = 'en'
    }

    // Retranslate all existing chat messages
    retranslateMessages(translations[language])
  }, [language, retranslateMessages])

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