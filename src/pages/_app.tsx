import { LanguageProvider } from "@/context/languageContext"
import en from './../../public/messages/en.json'
import ar from './../../public/messages/ar.json'
import type { AppProps } from "next/app"
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider
      initialLocale={pageProps.locale || "en"}
      initialMessages={{ en, ar }}
    >
      <Component {...pageProps} />
    </LanguageProvider>
  )
}
