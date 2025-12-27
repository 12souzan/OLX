import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, ChevronLeft, ChevronRight as RightIcon } from 'lucide-react';
import { findCategoriesWithPaths, getAllCategoriesHierarchy } from '@/utils/categoryUtils';
import { Category } from '@/types/category';
import { fetchCategories } from '@/apis/categories';
import { useLanguage } from '@/context/languageContext';
import styles from '@/styles/components/categories/categories.module.css';

export default function CategoriesNav() {
  const { locale } = useLanguage();
  const isRTL = locale === 'ar';
  
  const [organizedCategories, setOrganizedCategories] = useState<Array<{
    parent: Category;
    children: Array<{
      category: Category;
      fullPath: string;
      subChildren?: Array<{
        category: Category;
        fullPath: string;
      }>;
    }>;
  }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategories();
        const allCategoriesHierarchy = getAllCategoriesHierarchy(data);
        setOrganizedCategories(allCategoriesHierarchy);
      } catch (error) {
        console.error('Failed to load categories:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showAllCategories &&
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowAllCategories(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAllCategories]);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
    }

    return () => {
      window.removeEventListener('resize', checkScroll);
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScroll);
      }
    };
  }, [organizedCategories]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleCategoryClick = (fullPath: string) => {
    window.location.href = `/${fullPath}/`;
  };

  const [specificCategories, setSpecificCategories] = useState<Array<{category: Category, fullPath: string}>>([]);

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

  const getCategoryName = (category: Category) => {
    if (isRTL && category.name_l1) {
      return category.name_l1;
    }
    return category.name;
  };

  const getParentCategoryName = (parent: Category) => {
    if (isRTL && parent.name_l1) {
      return parent.name_l1;
    }
    return parent.name;
  };

  return (
    <div className={`${styles.categoriesNav} ${isRTL ? styles.rtl : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className={styles.container}>
        <div className={styles.navContainer}>
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className={`${styles.scrollButton} ${isRTL ? styles.scrollButtonRight : styles.scrollButtonLeft}`}
              style={isRTL ? { right: '-16px', left: 'auto' } : {}}
            >
              {isRTL ? (
                <ChevronRight className={styles.scrollButtonIcon} style={{ transform: 'rotate(180deg)' }} />
              ) : (
                <ChevronLeft className={styles.scrollButtonIcon} />
              )}
            </button>
          )}

          <div className={styles.allCategoriesButtonContainer}>
            <button
              ref={buttonRef}
              onClick={() => setShowAllCategories(!showAllCategories)}
              className={styles.allCategoriesButton}
            >
              {isRTL ? 'جميع الفئات' : 'All Categories'}
              {showAllCategories ? (
                <ChevronDown className={styles.buttonIcon} style={isRTL ? { transform: 'rotate(180deg)' } : {}} />
              ) : (
                <ChevronRight className={styles.buttonIcon} style={isRTL ? { transform: 'rotate(180deg)' } : {}} />
              )}
            </button>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.categoriesContainer}>
            <div 
              ref={scrollContainerRef}
              className={styles.categoriesScroll}
            >
              {specificCategories.map((item) => (
                <button
                  key={item.category.id}
                  onClick={() => handleCategoryClick(item.fullPath)}
                  className={styles.categoryButton}
                >
                  {getCategoryName(item.category)}
                </button>
              ))}
            </div>
          </div>

          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className={`${styles.scrollButton} ${isRTL ? styles.scrollButtonLeft : styles.scrollButtonRight}`}
              style={isRTL ? { left: '-16px', right: 'auto' } : {}}
            >
              {isRTL ? (
                <ChevronLeft className={styles.scrollButtonIcon} style={{ transform: 'rotate(180deg)' }} />
              ) : (
                <RightIcon className={styles.scrollButtonIcon} />
              )}
            </button>
          )}
        </div>

        {showAllCategories && (
          <div 
            ref={dropdownRef} 
            className={styles.dropdown}
            style={isRTL ? { right: '16px', left: 'auto' } : {}}
          >
            <div className={styles.dropdownContent}>
              <div className={styles.dropdownGrid}>
                {organizedCategories.map((group) => (
                  <div key={group.parent.id} className={styles.parentCategory}>
                    <div className={styles.parentCategoryTitle}>
                      {getParentCategoryName(group.parent)}
                    </div>
                    <div className={styles.childrenList}>
                      {group.children.map((child) => (
                        <div key={child.category.id}>
                          <button
                            onClick={() => {
                              handleCategoryClick(child.fullPath);
                              setShowAllCategories(false);
                            }}
                            className={styles.childCategory}
                          >
                            <div className={styles.childName}>{getCategoryName(child.category)}</div>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {showAllCategories && (
        <div
          className={styles.overlay}
          onClick={() => setShowAllCategories(false)}
        />
      )}
    </div>
  );
}