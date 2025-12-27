import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/layout/MainHeader";
import CategoriesSelect from "@/components/common/categories/categories-list";
import BannerCarousel from "@/features/banner/banner";
import SubBanner from "@/features/banner/sub-banner";
import CategoryGrid from "@/features/categories/categories-section";
import ProductSection from "@/features/products/ProductsGrid";
import { apartmentsData, carsData, mobilesData } from "@/utils/products-data";
import { ApartmentProduct, CarProduct, MobileProduct } from "@/types/product";
import { useLanguage } from '@/context/languageContext';
import Footer from "@/components/layout/Footer";
import FloatingScrollToTop from "@/components/common/scrolling-bottom";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const { messages } = useLanguage();
  
  return (
    <>
      <Head>
        <title>{messages.common.appName}</title>
        <meta name="description" content={messages.common.appDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/icons/logo.svg" />
      </Head>
      <Header />
      <CategoriesSelect />
      <div className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}>
        <main className={styles.main}>
          <BannerCarousel />
          <SubBanner />
          <CategoryGrid />
          <ProductSection
            title={messages.home.carsForSale}
            products={carsData as CarProduct[]}
            productType="car"
            showViewMore={true}
            itemsToShow={4}
          />
          <ProductSection
            title={messages.home.apartmentsForRent}
            products={apartmentsData as ApartmentProduct[]}
            productType="apartment"
            showViewMore={true}
            itemsToShow={4}
          />
          <ProductSection
            title={messages.home.mobilePhones}
            products={mobilesData as MobileProduct[]}
            productType="mobile"
            showViewMore={true}
            itemsToShow={4}
          />
        </main>
      </div>
      <Footer/>
      <FloatingScrollToTop/>
    </>
  );
}