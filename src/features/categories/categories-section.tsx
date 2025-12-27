import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import { useLanguage } from '@/context/languageContext';
import { fetchCategories } from '@/apis/categories';
import { Category } from '@/types/category';
import styles from '@/styles/components/categories/category-grid.module.css';
import CategorieSkeleton from './categories-skeleton';
import TitleSection from '@/components/common/section-title';
import CategoryCard from '@/components/common/categories/category-card';

export default function CategoryGrid() {
  const router = useRouter();
  const { messages, locale } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleCategoryClick = (slug: string) => {
    router.push(`/${slug}`);
  };

  if (loading) {
    return <CategorieSkeleton />;
  }

  return (
    <div className={styles.categoryGridContainer}>
      <TitleSection title={messages.home.categories} />
      {isMobile ? (
        <div className={styles.mobileSwiperContainer}>
          <Swiper
            modules={[FreeMode]}
            spaceBetween={12}
            slidesPerView={'auto'}
            freeMode={true}
            className={styles.mobileSwiper}
          >
            {categories.map((category) => (
              <SwiperSlide key={category.id} className={styles.swiperSlide}>
                <CategoryCard
                  category={category}
                  variant="grid"
                  onClick={handleCategoryClick}
                  locale={locale}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className={styles.categoryGrid}>
          {categories.slice(0, 12).map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              variant="grid"
              onClick={handleCategoryClick}
              locale={locale}
            />
          ))}
        </div>
      )}
    </div>
  );
}