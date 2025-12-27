/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import styles from '@/styles/components/banner.module.css'
import Image from 'next/image'
import { dummyBannerData } from '@/utils/banner-data'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/context/languageContext'

export default function BannerCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<any>(null)
  const router = useRouter()
  const { locale } = useLanguage()
  const handleDotClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index)
    }
  };


  const handleBannerClick = (link: string) => {
    router.push(link)
  };


  return (
    <div className={styles.bannerContainer}>
      <Swiper
        key={locale}
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        dir={locale === "ar" ? "rtl" : "ltr"}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex)
        }}
        className={styles.swiper}
      >
        {dummyBannerData.map((banner) => (
          <SwiperSlide key={banner.id} className={styles.swiperSlide}>
            <div
              onClick={() => handleBannerClick(banner.link)}
              style={{ cursor: 'pointer', width: '100%', height: '100%' }}
            >
              <Image
                src={banner.imageUrl}
                alt='banner-img'
                className={styles.bannerImage}
                loading="lazy"
                width={800}
                height={40}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.paginationContainer}>
        {dummyBannerData.map((_, index) => (
          <button
            key={index}
            className={`${styles.paginationDot} ${activeIndex === index ? styles.paginationDotActive : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}