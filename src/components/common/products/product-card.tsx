import { useMemo, useState } from 'react';
import styles from '@/styles/components/ProductCard.module.css';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import { formatPrice } from '@/helpers/price-format.helpers';
import { formatTimeAgo } from '@/helpers/time-format.helpers';
import { ProductCardProps } from '@/types/product';
import { getProductIcons } from './product-icons';

const ProductCard = ({ product, language = 'en' }: ProductCardProps) => {
    const [isFavorite, setIsFavorite] = useState(product.isFavorite || false);
    const isArabic = language === 'ar';

    const truncatedDescription = useMemo(() => {
        if (product.description.length > 40) {
            const truncated = product.description.substring(0, 40);
            const lastSpace = truncated.lastIndexOf(' ');
            if (lastSpace > 30) {
                return truncated.substring(0, lastSpace) + '...';
            } else {
                return truncated + '...';
            }
        }
        return product.description;
    }, [product.description]);


    return (
        <div className={`${styles.card} ${isArabic ? styles.arabic : ''}`}>
            <div className={styles.imageContainer}>
                <Image
                    src={product.image}
                    alt={product.description}
                    className={styles.image}
                    loading="lazy"
                    width={200}
                    height={100}
                />
                <div className={styles.priceContainer}>
                    <button
                        className={styles.heartButton}
                        onClick={() => setIsFavorite(!isFavorite)}
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        <Heart
                            className={isFavorite ? styles.heartIconFilled : styles.heartIconOutline}
                            size={20}
                            fill={isFavorite ? "#ff4757" : "none"}
                            stroke={isFavorite ? "#ff4757" : "#404041"}
                        />
                    </button>
                    <span className={styles.originalPrice}>
                        {formatPrice(product.price)}
                    </span>
                </div>
            </div>

            <div className={styles.content}>
                <p className={styles.description}>
                     {truncatedDescription}
                </p>
                {getProductIcons(product, isArabic)}
                <div className={styles.footer}>
                    <div className={styles.locationContainer}>
                        <span>{product.location}</span>
                    </div>
                    <span className={styles.time}>
                        {formatTimeAgo(product.timePosted, language)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;