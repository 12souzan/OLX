import { TimerReset, Bed, Grid3x3, Bath } from 'lucide-react';
import { Product } from '@/types/product';
import styles from '@/styles/components/ProductCard.module.css'

export const getProductIcons = (product: Product, isArabic: boolean) => {
    switch (product.type) {
        case 'car':
             const carProduct = product as import('@/types/product').CarProduct;
            return (
                <div className={styles.specsContainer}>
                    <TimerReset className={styles.specIcon} size={14} strokeWidth={2} />
                    <span>
                        {carProduct.mileage?.toLocaleString() || '0'} {isArabic ? 'كم' : 'km'} • {carProduct.year || 'N/A'}
                    </span>
                </div>
            );

        case 'apartment':
             const apartmentProduct = product as import('@/types/product').ApartmentProduct
            return (
                <div className={styles.specsContainer}>
                    <div className={styles.specItem}>
                        <Bed size={13} strokeWidth={3}/>
                        <span>{apartmentProduct.bedrooms || '0'}</span>
                    </div>
                    <div className={styles.specItem}>
                        <Bath size={13} strokeWidth={3}/>
                        <span>{apartmentProduct.bathrooms || '0'} </span>
                    </div>
                    <div className={styles.specItem}>
                        <Grid3x3 size={13} />
                        <span>{apartmentProduct.sqm || '0'}</span>
                    </div>
                </div>
            );

        default:
            return null;
    }
};