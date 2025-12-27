'use client';

import { Facebook, Instagram, Youtube } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import styles from '@/styles/components/main.module.css';
import { useLanguage } from '@/context/languageContext';
import { footerData } from '@/utils/footer-data';
import { IconName, SocialMediaItem } from '@/types/footer';

const iconComponents: Record<string, LucideIcon> = {
  Facebook,
  Instagram,
  Youtube
}

const Footer = () => {
  const { messages, locale } = useLanguage();
  const isArabic = locale === 'ar';
  const currentYear = new Date().getFullYear();

  const getTranslation = (key: keyof typeof footerData.translations): string => {
    if (messages?.footer?.[key]) {
      return messages.footer[key] as string;
    }

    const translation = footerData.translations[key];
    if (translation) {
      return translation[locale as 'en' | 'ar'];
    }

    return key;
  };

  const getItemName = (item: { name: string; arabicName: string }): string => {
    return isArabic ? item.arabicName : item.name;
  };

  const getIconComponent = (iconName: IconName): LucideIcon | null => {
    return iconComponents[iconName] || null;
  };


  return (
    <footer className={`${styles.footer} ${isArabic ? styles.rtl : ''}`}>
      <div className={styles.paymentSection}>
        <div className={styles.paymentContainer}>
          <div className={styles.slogen}>
            Find amazing deals on the go.
            <span>Download OLX app now!</span>
          </div>
          <Image
            src='/images/home/footer/footer1.webp'
            alt='olx-app'
            width={190}
            height={170}
            className={styles.logoImage}
          />
          <div className={styles.paymentLogos}>
            {footerData.appDownloads.map((method) => {
              return (
                <div key={method.id} className={styles.paymentLogo}>
                  <Image
                    src={method.image}
                    alt={method.alt}
                    width={130}
                    height={40}
                    className={styles.logoImage}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.mainFooter}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>
                {getTranslation('popularCategories')}
              </h4>
              <ul className={styles.linksList}>
                {footerData.popularCategories.map((category) => (
                  <li key={category.id}>
                    <a href={category.url}>{getItemName(category)}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>
                {getTranslation('trendingSearches')}
              </h4>
              <ul className={styles.linksList}>
                {footerData.trendingSearches.map((item) => (
                  <li key={item.id}>
                    <a href={item.url}>{getItemName(item)}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>
                {getTranslation('aboutUs')}
              </h4>
              <ul className={styles.linksList}>
                {footerData.aboutUs.map((item) => (
                  <li key={item.id}>
                    <a href={item.url}>{getItemName(item)}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>
                {getTranslation('help')}
              </h4>
              <ul className={styles.linksList}>
                {footerData.helpLegal.map((item) => (
                  <li key={item.id}>
                    <a href={item.url}>{getItemName(item)}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>
                {getTranslation('followUs')}
              </h4>
              <div className={styles.socialIcons}>
                {footerData.socialMedia.map((social: SocialMediaItem) => {
                  const IconComponent = getIconComponent(social.icon);
                  if (!IconComponent) return null;

                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label={social.name}
                    >
                      <IconComponent size={20} />
                    </a>
                  );
                })}
              </div>

              <div className={styles.appButtons}>
                {footerData.appDownloads.map((app) => (
                  <a key={app.id} href={app.url} className={styles.appButton}>
                    <Image
                      src={app.image}
                      alt={app.alt}
                      width={80}
                      height={40}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomFooter}>
        <div className={styles.copyRightContainer}>
          <p>
            © {currentYear} OLX. {getTranslation('allRightsReserved')}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;