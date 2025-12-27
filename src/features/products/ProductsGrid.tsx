'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/common/products/product-card';
import styles from '@/styles/components/ProductCard.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import TitleSection from '@/components/common/section-title';
import { ApartmentProduct, CarProduct, MobileProduct } from '@/types/product';

interface ProductSectionProps {
  title: string;
  products: CarProduct[] | ApartmentProduct[] | MobileProduct[];
  productType: 'car' | 'apartment' | 'mobile';
  showViewMore?: boolean;
  itemsToShow?: number;
}

function ProductSection({
  title,
  products,
  showViewMore = true,
  itemsToShow = 4
}: ProductSectionProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const displayedProducts = products.slice(0, itemsToShow);

  return (
    <div className={styles.container}>
      <TitleSection 
        showViewMore={showViewMore} 
        title={title}
      />
      
      {!isMobile ? (
        <div className={styles.gridContainer}>
          {displayedProducts.map((product) => (
            <div key={product.id} className={styles.gridItem}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.swiperContainer}>
          <Swiper
            spaceBetween={16}
            slidesPerView={1.5}
            centeredSlides={false}
            loop={false}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            className={styles.swiper}
          >
            {displayedProducts.map((product) => (
              <SwiperSlide key={product.id} className={styles.swiperSlide}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}

export default ProductSection;