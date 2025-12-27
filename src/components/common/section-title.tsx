import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/components/title.module.css';
import { useLanguage } from '@/context/languageContext';

interface TitleSectionProps {
  title: string;
  showViewMore?: boolean;
  viewMoreText?: string;
  viewMoreLink?: string;
  titleColor?: string;
  className?: string
}

export default function TitleSection({
  title,
  showViewMore = false,
  viewMoreText,
  viewMoreLink,
  titleColor,
  className,
}: TitleSectionProps) {
  const router = useRouter();
  const { locale, messages } = useLanguage();
  
  const isArabic = locale === "ar";
  
  const displayViewMoreText = viewMoreText || 
    messages?.common?.viewMore ;
  
  const handleViewMoreClick = () => {
    if (viewMoreLink) {
      router.push(viewMoreLink);
    }
  };
  
  const titleStyle = titleColor ? { color: titleColor } : undefined;
  
  return (
    <div className={`${styles.titleContainer} ${isArabic ? styles.rtl : ''} ${className}`}>
      <div className={styles.titleContent}>
        <h2 className={styles.titleText} style={titleStyle}>
          {title}
        </h2>
        
        {showViewMore && (
          <div className={styles.viewMoreContainer}>
            {viewMoreLink ? (
              <a
                href={viewMoreLink}
                className={styles.viewMoreLink}
                onClick={(e) => {
                  e.preventDefault();
                  router.push(viewMoreLink!);
                }}
              >
                {displayViewMoreText}
                <ChevronRight 
                  className={styles.viewMoreIcon} 
                  style={isArabic ? { transform: 'rotate(180deg)' } : undefined}
                />
              </a>
            ) : (
              <button
                onClick={handleViewMoreClick}
                className={styles.viewMoreButton}
              >
                {displayViewMoreText}
                <ChevronRight 
                  className={styles.viewMoreIcon} 
                  style={isArabic ? { transform: 'rotate(180deg)' } : undefined}
                />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}