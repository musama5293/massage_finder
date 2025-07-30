"use client"

import { useEffect } from "react"
import ChatInterface from "@/app/components/chat-interface"
import { useAppStore } from "@/app/store/use-app-store"
import { useLanguage } from "@/hooks/use-language"

export default function ChatPage() {
  const { startChat, messages } = useAppStore()
  const { t } = useLanguage()

  // Auto-start chat when someone visits /chat directly, but only if no messages exist
  useEffect(() => {
    if (messages.length === 0) {
      startChat(t)
    }
  }, [startChat, t, messages.length])

  return (
    <div className="min-h-screen">
      <ChatInterface />
    </div>
  )
} 