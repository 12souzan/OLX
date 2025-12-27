"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

type Language = "en" | "ar"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Messages = Record<string, any>

interface LanguageContextType {
  locale: Language
  setLocale: (locale: Language) => void
  messages: Messages
}

const LanguageContext = createContext<LanguageContextType | null>(null)

interface ProviderProps {
  children: React.ReactNode
  initialLocale: Language
  initialMessages: {
    en: Messages
    ar: Messages
  }
}

export const LanguageProvider = ({
  children,
  initialLocale,
  initialMessages,
}: ProviderProps) => {
  const [locale, setLocale] = useState<Language>(initialLocale)
  const [messages, setMessages] = useState<Messages>(
    initialMessages[initialLocale]
  )

  useEffect(() => {
    const storedLocale = localStorage.getItem("locale") as Language | null
    if (storedLocale && storedLocale !== locale) {
      setLocale(storedLocale)
    }
  }, [])

  useEffect(() => {
    setMessages(initialMessages[locale])
  }, [locale, initialMessages])

  useEffect(() => {
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = locale
  }, [locale])

  const changeLocale = (newLocale: Language) => {
    setLocale(newLocale)
    localStorage.setItem("locale", newLocale)
  }

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale: changeLocale, messages }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider")
  }
  return context
}
