/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/languageContext';
import { fetchCategories } from '@/apis/categories';
import { Category } from '@/types/category';
import { categoryIcons, getAllCategoriesHierarchy } from '@/utils/categoryUtils';
import styles from '@/styles/components/categories/categoryPost.module.css';
import { 
  ChevronLeft, 
  ChevronRight,
} from 'lucide-react';

interface CategoryPostProps {
  onCategorySelect?: (category: Category) => void;
}

export default function CategoryPost({ onCategorySelect }: CategoryPostProps) {
  const { locale, messages } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMainCategory, setSelectedMainCategory] = useState<Category | null>(null);
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

  const getCategoryIcon = (category: Category) => {
    const slug = category.slug?.toLowerCase() || '';
    const name = category.name?.toLowerCase() || '';
    if (slug && categoryIcons[slug]) {
      return categoryIcons[slug];
    }
    if (name && categoryIcons[name]) {
      return categoryIcons[name];
    }
    const iconKey = Object.keys(categoryIcons).find(key => 
      slug.includes(key) || name.includes(key)
    );
    
    if (iconKey) {
      return categoryIcons[iconKey];
    }
  };

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategories();
        
        const topLevelCategories = data.filter(cat => cat.level === 0);
        setCategories(topLevelCategories);
        
        const hierarchy = getAllCategoriesHierarchy(data);
        setOrganizedCategories(hierarchy);
        
        if (topLevelCategories.length > 0) {
          setSelectedMainCategory(topLevelCategories[0]);
        }
      } catch (error) {
        console.error('Failed to load categories:', error);
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  const handleMainCategoryClick = (category: Category) => {
    setSelectedMainCategory(category);
  };

  const handleSubcategoryClick = (subcategory: any) => {
    if (onCategorySelect) {
      onCategorySelect(subcategory.category);
    }
  };

  const getCategoryName = (category: Category) => {
    if (locale === 'ar' && category.name_l1) {
      return category.name_l1;
    }
    return category.name;
  };

  const getSubcategories = () => {
    if (!selectedMainCategory) return [];
    const parentCategory = organizedCategories.find(group => group.parent.id === selectedMainCategory.id);
    return parentCategory?.children || [];
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>
          {messages.post?.loadingCategories}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.categoryPostContainer}>
      <h2 className={styles.title}>
        {messages.post?.categoryTitle}
      </h2>
      
      <div className={styles.categoriesGrid}>
        <div className={styles.leftColumn}>
          <div className={styles.categoriesList}>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`${styles.categoryItem} ${
                  selectedMainCategory?.id === category.id ? styles.categoryItemActive : ''
                }`}
                onClick={() => handleMainCategoryClick(category)}
              >
                <div className={styles.categoryItemContent}>
                  <div className={styles.categoryIconWrapper}>
                    {getCategoryIcon(category)}
                  </div>
                  <span className={styles.categoryName}>
                    {getCategoryName(category)}
                  </span>
                </div>
                <span className={styles.arrow}>
                  {locale === 'ar' ? <ChevronLeft size={18}/> : <ChevronRight size={18}/>}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.rightColumn}>
          {selectedMainCategory ? (
            <>
              <div className={styles.selectedCategoryHeader}>
                <h3 className={styles.subcategoryTitle}>
                  {getCategoryName(selectedMainCategory)}
                </h3>
              </div>
              <div className={styles.subcategoriesList}>
                {getSubcategories().length > 0 ? (
                  getSubcategories().map((subcategory) => (
                    <button
                      key={subcategory.category.id}
                      className={styles.subcategoryItem}
                      onClick={() => handleSubcategoryClick(subcategory)}
                    >
                      <div className={styles.subcategoryContent}>
                        <span className={styles.subcategoryName}>
                          {getCategoryName(subcategory.category)}
                        </span>
                      </div>
                      <span className={styles.arrow}>
                        {locale === 'ar' ? <ChevronLeft size={16}/> : <ChevronRight size={16}/>}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className={styles.noSubcategories}>
                    <p className={styles.noSubcategoriesText}>
                      {messages.post?.noSubcategories}
                    </p>
                    <button
                      className={styles.selectCategoryButton}
                      onClick={() => onCategorySelect?.(selectedMainCategory)}
                    >
                      {messages.post?.selectThisCategory}
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}>
                {locale === 'ar' ? <ChevronLeft size={48} /> : <ChevronRight size={48} />}
              </div>
              <h3 className={styles.emptyStateTitle}>
                {messages.post?.selectCategory }
              </h3>
              <p className={styles.emptyStateText}>
                {messages.post?.selectCategoryHint }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}