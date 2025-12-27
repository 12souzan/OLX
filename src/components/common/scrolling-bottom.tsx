'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import styles from '@/styles/components/floating-scroll.module.css';
import { useLanguage } from '@/context/languageContext';

const FloatingScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
  const { messages, locale } = useLanguage();
  const isArabic = locale === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
      
      setIsVisible(scrollPercent > 40 && scrollPercent < 95);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      className={`${styles.button} ${isArabic ? styles.rtl : ''}`}
      onClick={scrollToTop}
      aria-label={messages?.common?.scrollToTop}
    >
      <span className={styles.text}>
        {messages?.common?.scrollToTop}
      </span>
      <ChevronUp size={18} />
    </button>
  );
};


export default FloatingScrollToTop;