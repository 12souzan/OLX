export const footerData = {
  popularCategories: [
    { id: 1, name: 'Cars', url: '/cars', arabicName: 'سيارات' },
    { id: 2, name: 'Flats for rent', url: '/apartments', arabicName: 'شقق للإيجار' },
    { id: 3, name: 'Mobile Phones', url: '/mobiles', arabicName: 'هواتف محمولة' },
    { id: 4, name: 'Jobs', url: '/jobs', arabicName: 'وظائف' },
    { id: 5, name: 'Electronics', url: '/electronics', arabicName: 'إلكترونيات' }
  ],

  trendingSearches: [
    { id: 1, name: 'Bikes', url: '/bikes', arabicName: 'دراجات' },
    { id: 2, name: 'Watches', url: '/watches', arabicName: 'ساعات' },
    { id: 3, name: 'Books', url: '/books', arabicName: 'كتب' },
    { id: 4, name: 'Dogs', url: '/dogs', arabicName: 'كلاب' },
    { id: 5, name: 'Furniture', url: '/furniture', arabicName: 'أثاث' }
  ],

  aboutUs: [
    { id: 1, name: 'Contact Us', url: '/contact', arabicName: 'تواصل معنا' },
    { id: 2, name: 'OLX for Businesses', url: '/business', arabicName: 'أوليكس للشركات' },
    { id: 3, name: 'Careers', url: '/careers', arabicName: 'الوظائف' },
    { id: 4, name: 'Press', url: '/press', arabicName: 'الصحافة' }
  ],

  helpLegal: [
    { id: 1, name: 'Help Center', url: '/help', arabicName: 'مركز المساعدة' },
    { id: 2, name: 'Sitemap', url: '/sitemap', arabicName: 'خريطة الموقع' },
    { id: 3, name: 'Terms of use', url: '/terms', arabicName: 'شروط الاستخدام' },
    { id: 4, name: 'Privacy Policy', url: '/privacy', arabicName: 'سياسة الخصوصية' }
  ],

  socialMedia: [
    { 
      id: 1, 
      name: 'Facebook', 
      icon: 'Facebook' as const,
      url: 'https://facebook.com',
      arabicName: 'فيسبوك'
    },
    { 
      id: 2, 
      name: 'Instagram', 
      icon: 'Instagram' as const, 
      url: 'https://instagram.com',
      arabicName: 'انستغرام'
    },
    { 
      id: 3, 
      name: 'YouTube', 
      icon: 'Youtube' as const,
      url: 'https://youtube.com',
      arabicName: 'يوتيوب'
    }
  ],

  appDownloads: [
    {
      id: 1,
      name: 'App Store',
      image: '/images/home/footer/appStore.svg',
      alt: 'App Store',
      url: '#',
      arabicName: 'متجر التطبيقات'
    },
    {
      id: 2,
      name: 'Google Play',
      image: '/images/home/footer/googlePlay.svg',
      alt: 'Google Play',
      url: '#',
      arabicName: 'متجر جوجل'
    },
    {
      id: 3,
      name: 'Gallery App',
      image: '/images/home/footer/appGallery.svg',
      alt: 'Gallery App',
      url: '#',
      arabicName: 'متجر gallery'
    }
  ],

  translations: {
    popularCategories: {
      en: 'Popular Categories',
      ar: 'الفئات الشائعة'
    },
    trendingSearches: {
      en: 'Trending Searches',
      ar: 'عمليات البحث الرائجة'
    },
    aboutUs: {
      en: 'About Us',
      ar: 'عن أوليكس'
    },
    help: {
      en: 'Help',
      ar: 'المساعدة'
    },
    followUs: {
      en: 'Follow Us',
      ar: 'تابعنا'
    },
    allRightsReserved: {
      en: 'All rights reserved',
      ar: 'جميع الحقوق محفوظة'
    }
  } as const 
} as const