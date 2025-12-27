export const formatPrice = (price: number, language: 'en' | 'ar' = 'en'): string => {
    const isArabic = language === 'ar';
    
    if (isArabic) {
        return `${price.toLocaleString('ar-EG')} د.أ`;
    }
    return `USD ${price.toLocaleString('en-US')}`;
};