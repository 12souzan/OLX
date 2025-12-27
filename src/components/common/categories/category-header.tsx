import { useLanguage } from '@/context/languageContext';
import { Category } from '@/types/category';
import styles from '@/styles/Post.module.css';
import Link from 'next/link';
import { getCategoryImage } from '@/utils/categoryUtils';
import Image from 'next/image';

interface CategoryHeaderProps {
  selectedCategory: Category;
  parentCategory?: Category | null;
  onChangeClick?: () => void;
}

export default function CategoryHeader({
  selectedCategory,
  parentCategory,
  onChangeClick
}: CategoryHeaderProps) {
  const { locale, messages } = useLanguage();

  const getCategoryImageUrl = () => {
    if (parentCategory) {
      return getCategoryImage(parentCategory.slug);
    }
    return getCategoryImage(selectedCategory.slug);
  };

  const getParentCategoryName = () => {
    if (parentCategory) {
      return locale === 'en' ? parentCategory.name : parentCategory.name_l1 || parentCategory.name;
    }
    return messages.post.categories ;
  };


  const getCategoryName = (category: Category) => {
    return locale === 'en' ? category.name : category.name_l1 || category.name;
  };

  return (
    <div className={styles.categoryHeader}>
      <div className={styles.mediaSection}>
        <h3 className={styles.sectionSubtitle}>
          {messages.post.categories || 'Category'}
        </h3>
        <div className={styles.categoryPath}>
          <div className={styles.imageContainer}>
            <Image
              src={getCategoryImageUrl()}
              alt={getCategoryName(selectedCategory)}
              className={styles.image}
              width={60}
              height={60}
              priority
            />
          </div>
          <div className={styles.breadcrumb}>
            <span className={styles.parentCategory}>
              {getParentCategoryName()}
            </span>
            <span className={styles.currentCategory}>
              {getCategoryName(selectedCategory)}
            </span>
          </div>
        </div>
      </div>
      <Link
        href="#"
        className={styles.changeLink}
        onClick={(e) => {
          e.preventDefault();
          onChangeClick?.();
        }}
      >
        {messages.post.change || 'Change'}
      </Link>
    </div>
  );
}