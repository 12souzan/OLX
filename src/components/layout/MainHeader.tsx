'use client'

import React, { useEffect, useState } from 'react'
import { LanguageSwitcher } from '../common/language-switcher'
import { SearchBar } from '../common/search-bar'
import styles from '@/styles/components/main.module.css'
import LocationSelect from '../common/location'
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Menu, X } from 'lucide-react'
import { fetchCategories } from '@/apis/categories'
import { findCategoriesWithPaths } from '@/utils/categoryUtils'
import { Category } from '@/types/category'
import { useLanguage } from '@/context/languageContext'
import { useRouter } from 'next/navigation'

const MainHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [specificCategories, setSpecificCategories] = useState<Array<{ category: Category, fullPath: string }>>([]);
  const { locale } = useLanguage();
  const isRTL = locale === 'ar';
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    async function loadSpecificCategories() {
      try {
        const data = await fetchCategories();
        const specificCats = findCategoriesWithPaths(data);
        setSpecificCategories(specificCats);
      } catch (error) {
        console.error('Failed to load specific categories:', error);
      }
    }
    loadSpecificCategories();
  }, []);

  const handleCategoryClick = (fullPath: string) => {
    router.push(`/${fullPath}/`);
  };

  const getCategoryName = (category: Category) => {
    if (isRTL && category.name_l1) {
      return category.name_l1;
    }
    return category.name;
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src='/images/icons/logo.svg'
              alt='OLX Logo'
              width={70}
              height={30}
              priority
              className={styles.logo}
            />
          </Link>
        </div>

        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>


      </div>

      <div className={styles.headerMiddle}>
        <LocationSelect />
        <SearchBar />
        <div className={styles.desktopActions}>
          <LanguageSwitcher />
          <Link href='/login' className={styles.LoginLink}>Login</Link>
          <Link className={styles.sellButton} href='/post'>
            <Plus size={18} strokeWidth={4} />
            <span>Sell</span>
          </Link>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className={styles.mobileMenuOverlay}>
          <div className={styles.mobileMenuContent}>
            <div className={styles.mobileMenuHeader}>
              <h3>Menu</h3>
              <button
                className={styles.closeMenuButton}
                onClick={toggleMobileMenu}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <div className={styles.mobileMenuItems}>
              <Link href="/" className={styles.mobileMenuItem} onClick={toggleMobileMenu}>
                Home
              </Link>

              {specificCategories.map((item) => (
                <button
                  key={item.category.id}
                  onClick={() => {
                    handleCategoryClick(item.fullPath);
                    toggleMobileMenu();
                  }}
                  className={styles.mobileMenuItem}
                  style={{ background: 'none', border: 'none', textAlign: isRTL ? 'right' : 'left', width: '100%' }}
                >
                  {getCategoryName(item.category)}
                </button>
              ))}

              <div className={styles.mobileMenuDivider} />

              <Link href="/login" className={styles.mobileMenuItem} onClick={toggleMobileMenu}>
                Login / Sign Up
              </Link>
            </div>

            <div className={styles.mobileMenuDivider} />

            <div className={styles.mobileMenuLanguage}>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default MainHeader