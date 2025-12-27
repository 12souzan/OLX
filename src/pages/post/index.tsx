/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import styles from '@/styles/Post.module.css';
import TitleSection from '@/components/common/section-title';
import LayoutWrapper from '@/components/layout/Layout';
import { useLanguage } from '@/context/languageContext';
import CategoryPost from '@/components/common/categories/category-post';
import PostForm from '@/components/postAdd/PostForm';
import { Category } from '@/types/category';
import { fetchCategories } from '@/apis/categories';

interface SelectedCategory {
  mainCategory: Category | null | undefined;
  subCategory: Category;
}

export default function PostPage() {
  const { messages } = useLanguage();
  const [selectedCategories, setSelectedCategories] = useState<SelectedCategory | null>(null);
  const [step, setStep] = useState(1);
  const [allCategories, setAllCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const categories = await fetchCategories();
        setAllCategories(categories);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    }
    loadCategories();
  }, []);

  const findParentCategory = (subCategory: Category): Category | null => {
    if (!subCategory.parentID) {
      return subCategory;
    }
    
    const findParentRecursive = (categories: Category[], parentId: number): Category | null => {
      for (const category of categories) {
        if (category.id === parentId) {
          return category;
        }
        if (category.children && category.children.length > 0) {
          const found = findParentRecursive(category.children, parentId);
          if (found) return found;
        }
      }
      return null;
    };
    
    return findParentRecursive(allCategories, subCategory.parentID);
  };

  const handleCategorySelect = (selection: any) => {
    
    let subCategory: Category;
    let mainCategory: Category | null = null;
    
    if (selection?.category) {
      subCategory = selection.category;
      mainCategory = selection.parentCategory || null;
    } else if (selection) {
      subCategory = selection;
    } else {
      console.error('Invalid selection received');
      return;
    }
    
    if (!mainCategory) {
      mainCategory = findParentCategory(subCategory);
    }
    
    setSelectedCategories({
      mainCategory,
      subCategory
    });
    setStep(2);
  };

  const handleBack = () => {
    setSelectedCategories(null);
    setStep(1);
  };

  return (
    <LayoutWrapper
      headerType="post"
      postHeaderProps={{
        showBackButton: step === 2,
        onBackClick: handleBack,
        showLogo: true
      }}
    >
      <div className={styles.postPageContainer}>
        <div className={styles.postPageContent}>
          <TitleSection 
            title={step === 1 ? (messages.post?.title || 'Choose Category') : (messages.post?.adDetails || 'Ad Details')} 
            className={styles.PostMainTitle} 
          />

          {step === 1 ? (
            <CategoryPost
              onCategorySelect={handleCategorySelect}
            />
          ) : selectedCategories && (
            <PostForm 
              categorySlug={selectedCategories.subCategory.slug}
              selectedCategory={selectedCategories.subCategory}
              onBack={handleBack}
              parentCategory={selectedCategories.mainCategory}
            />
          )}
        </div>
      </div>
    </LayoutWrapper>
  );
}