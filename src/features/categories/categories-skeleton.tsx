import styles from '@/styles/components/categories/category-grid.module.css';

export default function CategorieSkeleton() {
  return (
    <div className={styles.categoryGridContainer}>
      <div className={styles.skeletonTitle}></div>
      <div className={styles.categoryGrid}>
        {[...Array(12)].map((_, index) => (
          <div key={index} className={styles.skeletonCard}>
            <div className={styles.skeletonImage}></div>
            <div className={styles.skeletonText}></div>
          </div>
        ))}
      </div>
    </div>
  );
}