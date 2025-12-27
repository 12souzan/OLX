import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/languageContext';
import { fetchCategories } from '@/apis/categories';
import { Category } from '@/types/category';
import styles from '@/styles/components/categories/CategorySelect.module.css';
import CategoryCard from '@/components/common/categories/category-card';

interface CategorySelectProps {
  onCategorySelect?: (category: Category) => void;
  showSubcategories?: boolean;
}

export default function CategorySelect({ 
  onCategorySelect, 
  showSubcategories = false 
}: CategorySelectProps) {
  const router = useRouter();
  const { locale , messages } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [subcategories, setSubcategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategories();
        const topLevelCategories = data.filter(cat => cat.level === 0);
        setCategories(topLevelCategories);
      } catch (error) {
        console.error('Failed to load categories:', error);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  const handleCategoryClick = async (category: Category) => {
    if (showSubcategories) {
      try {
        const data = await fetchCategories();
        const categorySubs = data.filter(
          cat => cat.parentID === category.id && cat.level === 1
        );
        
        if (categorySubs.length > 0) {
          setSelectedCategory(category);
          setSubcategories(categorySubs);
          return;
        }
      } catch (error) {
        console.error('Failed to load subcategories:', error);
      }
    }
    
    if (onCategorySelect) {
      onCategorySelect(category);
    } else {
      router.push(`/post?category=${category.slug}`);
    }
  };

  return (
    <div className={styles.categorySelectContainer}>
      {selectedCategory ? (
        <>
          <div className={styles.categoriesList}>
            {subcategories.map((subcategory) => (
              <CategoryCard
                key={subcategory.id}
                category={subcategory}
                variant="select"
                onClick={() => handleCategoryClick(subcategory)}
                locale={locale}
                showArrow={true}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className={styles.title}>{messages.post.categoryTitle}</h2>          
          <div className={styles.categoriesList}>
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                variant="select"
                onClick={() => handleCategoryClick(category)}
                locale={locale}
                showArrow={true}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}