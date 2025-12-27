import React from 'react';
import Image from 'next/image';
import { Category } from '@/types/category';
import styles from '@/styles/components/categories/categoryCard.module.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getCategoryImage } from '@/utils/categoryUtils';

interface CategoryCardProps {
  category: Category;
  variant?: 'grid' | 'select';
  onClick: (slug: string) => void;
  locale?: string;
  showArrow?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  variant = 'grid',
  onClick,
  locale = 'en',
  showArrow = false
}) => {
  const getCategoryTitle = () => {
    if (locale === 'ar') {
      return category.name_l1 || category.name;
    }
    return category.name;
  };

  const handleClick = () => {
    onClick(category.slug);
  };

  return (
    <div
      className={`${styles.categoryCard} ${styles[variant]}`}
      onClick={handleClick}
    >
      <div className={styles.imageContainer}>
        <Image
          src={getCategoryImage(category.slug)}
          alt={getCategoryTitle()}
          className={styles.image}
          width={variant === 'grid' ? 80 : 40}
          height={variant === 'grid' ? 80 : 40}
        />
      </div>

      <div className={styles.content}>
        <span className={styles.title}>{getCategoryTitle()}</span>
        {showArrow && (locale === 'en' ? <ChevronRight size={24} /> : <ChevronLeft size={24} />)}
      </div>
    </div>
  );
};

export default CategoryCard;