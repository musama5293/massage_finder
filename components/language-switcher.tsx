"use client"

import { useLanguage } from '@/hooks/use-language'
import { Button } from '@/components/ui/button'
import { Languages } from 'lucide-react'

export default function LanguageSwitcher() {
  const { language, setLanguage, mounted } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'he' : 'en')
  }

  // Prevent hydration mismatch by showing a consistent state until mounted
  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="bg-white/80 backdrop-blur-sm border-gray-300 hover:bg-white/90 transition-all"
      >
        <Languages className="h-4 w-4 mr-2" />
        עברית
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="bg-white/80 backdrop-blur-sm border-gray-300 hover:bg-white/90 transition-all"
    >
      <Languages className="h-4 w-4 mr-2" />
      {language === 'en' ? 'עברית' : 'English'}
    </Button>
  )
} 