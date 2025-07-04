"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, MessageCircle, Star, CheckCircle, ArrowRight, ChevronLeft, ChevronRight, Brain, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useAppStore } from "./store/use-app-store"
import { useLanguage } from "@/hooks/use-language"
import ChatInterface from "./components/chat-interface"
import CommunicationModal from "./components/communication-modal"
import LanguageSwitcher from "@/components/language-switcher"
import Head from "next/head"

export default function TherapeuticScentsApp() {
  const { showChat, startChat } = useAppStore()
  const [currentArticle, setCurrentArticle] = useState(0)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const { t, isRTL } = useLanguage()
  
  const nextArticle = () => {
    setCurrentArticle((prev) => (prev + 1) % t.testimonials.articles.length)
  }

  const prevArticle = () => {
    setCurrentArticle((prev) => (prev - 1 + t.testimonials.articles.length) % t.testimonials.articles.length)
  }

  if (showChat) {
    return <ChatInterface />
  }

  return (
    <div className={`min-h-screen bg-stone-50 text-stone-800 ${isRTL ? 'rtl' : 'ltr'}`}>
      <Head>
        <title>Therapeutic Scents</title>
        <meta name="description" content="AI-Powered Massage Therapy to reduce stress & improve sleep quality using therapeutic scents inspired by science." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CommunicationModal isOpen={contactModalOpen} setIsOpen={setContactModalOpen} />
      {/* Header */}
      <header className="relative z-50 flex items-center justify-between p-4 md:p-6">
        <div className="text-xl md:text-2xl font-bold text-stone-900">{t.header.title}</div>
        <div className="flex items-center gap-3">
          {!isRTL && <LanguageSwitcher />}
          <Button 
            variant="outline" 
            className="border-teal-600 text-teal-700 hover:bg-teal-600 hover:text-white"
            onClick={() => setContactModalOpen(true)}
          >
            {t.header.contact}
          </Button>
          {isRTL && <LanguageSwitcher />}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          src="/video.mp4"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text font-bold leading-tight mb-4 md:mb-6 text-white drop-shadow-lg max-w-5xl mx-auto"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-subtitle mb-6 md:mb-8 text-white drop-shadow-lg max-w-4xl mx-auto"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              onClick={() => startChat(t)}
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl font-semibold rounded-full transition-all hover:scale-105 shadow-lg"
            >
              {t.hero.startJourney} <ArrowRight className={`${isRTL ? 'mr-2' : 'ml-2'} h-5 w-5 md:h-6 md:w-6`} />
            </Button>
          </motion.div>
        </div>

        {/* Video Play Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-white/20 backdrop-blur-sm rounded-full p-3 md:p-4 hover:bg-white/30 transition-all"
        >
          <Play className="h-6 w-6 md:h-8 md:w-8 text-white" />
        </motion.button>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-12 md:py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 text-stone-900"
          >
            {t.howItWorks.title}
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            {[
              {
                icon: <MessageCircle className="h-10 w-10 md:h-12 md:w-12 text-teal-700" />,
                title: t.howItWorks.steps.aiAssessment.title,
                description: t.howItWorks.steps.aiAssessment.description,
              },
              {
                icon: <Brain className="h-10 w-10 md:h-12 md:w-12 text-teal-700" />,
                title: t.howItWorks.steps.smartMatching.title,
                description: t.howItWorks.steps.smartMatching.description,
              },
              {
                icon: <CheckCircle className="h-10 w-10 md:h-12 md:w-12 text-teal-700" />,
                title: t.howItWorks.steps.bookRelax.title,
                description: t.howItWorks.steps.bookRelax.description,
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="bg-teal-100/50 rounded-full w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mx-auto mb-4 md:mb-6">
                  {step.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-stone-800">{step.title}</h3>
                <p className="text-sm md:text-base text-stone-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={() => startChat(t)}
              variant="outline"
              size="lg"
              className="border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-full transition-all hover:scale-105"
            >
              {t.howItWorks.getMatchesNow} <ArrowRight className={`${isRTL ? 'mr-2' : 'ml-2'} h-4 w-4 md:h-5 md:w-5`} />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-center mb-16 text-stone-900"
          >
            {t.testimonials.title}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto relative"
          >
             <Card className="bg-white border-stone-200/80 backdrop-blur-sm shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-green-600 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-lg text-stone-700 mb-4">"{t.testimonials.articles[currentArticle].content}"</p>
                    <h3 className="font-bold text-stone-800">{t.testimonials.articles[currentArticle].title}</h3>
                    <p className="text-sm text-stone-500">{t.testimonials.articles[currentArticle].subtitle}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(t.testimonials.articles[currentArticle].rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
                <Button onClick={prevArticle} variant="outline" size="icon" className="rounded-full bg-white/50 border-stone-200 text-stone-600 hover:bg-white">
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button onClick={nextArticle} variant="outline" size="icon" className="rounded-full bg-white/50 border-stone-200 text-stone-600 hover:bg-white">
                    <ChevronRight className="h-6 w-6" />
                </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-bold text-stone-900 mb-6"
            >
              {t.benefits.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-stone-600 mb-8"
            >
              {t.benefits.description}
            </motion.p>
            <div className="space-y-4">
              {t.benefits.items.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="h-6 w-6 text-teal-600" />
                  <span className="text-lg text-stone-700">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="h-96 rounded-2xl bg-stone-200"
            style={{ backgroundImage: "url('/t2.jpg')", backgroundSize: 'cover' }}
          />
        </div>
      </section>

       {/* Final CTA Section */}
       <section className="bg-stone-800 text-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            {t.finalCta.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-stone-300 mb-8"
          >
            {t.finalCta.description}
          </motion.p>
              <motion.div
            initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              onClick={() => startChat(t)}
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg rounded-full"
            >
              {t.finalCta.chatButton} <MessageCircle className={`${isRTL ? 'mr-2' : 'ml-2'} h-5 w-5`} />
            </Button>
              </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          <p>{t.footer.copyright}</p>
          <p className="mt-2">{t.footer.disclaimer}</p>
        </div>
      </footer>
    </div>
  )
}
