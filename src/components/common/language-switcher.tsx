"use client"

import { useLanguage } from "@/context/languageContext"
import { useRouter } from "next/router"
import styles from "@/styles/components/LanguageSwitcher.module.css"

export const LanguageSwitcher = () => {
  const { locale, setLocale } = useLanguage()
  const router = useRouter()

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "ar" : "en"
    setLocale(newLocale)
    router.replace(router.asPath, undefined, { scroll: false })
  }

  return (
    <div className={styles.languageSwitcher}>
      <button
        onClick={toggleLanguage}
        className={`${styles.button} ${
          locale === "ar" ? styles.buttonArabic : ""
        }`}
        aria-label={`Switch to ${locale === "en" ? "Arabic" : "English"}`}
      >
        <span className={styles.text}>
          {locale === "en" ? "العربية" : "English"}
        </span>
      </button>
    </div>
  )
}
