import styles from '@/styles/components/banner.module.css';
import Image from 'next/image';
import { dummyBannerSubData } from '@/utils/banner-data';
import { useRouter } from 'next/navigation';

export default function SubBanner() {
    const router = useRouter()
    const handleBannerClick = (link: string) => {
        router.push(link)
    };

    return (
        <div className={styles.bannerSubContainer}>
            {dummyBannerSubData.map((banner) => (
                <div
                    key={banner.id}
                    onClick={() => handleBannerClick(banner.link)}
                    className={styles.subBanner}
                >
                    <Image
                        src={banner.imageUrl}
                        alt='sub-banner-img'
                        className={styles.subBannerImage}
                        loading="lazy"
                        width={400}
                        height={100}
                    />
                </div>
            ))}
        </div>
    );
}