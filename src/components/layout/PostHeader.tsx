'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import styles from '@/styles/components/main.module.css'

export interface PostHeaderProps {
  showBackButton?: boolean
  backButtonText?: string
  onBackClick?: () => void
  showLogo?: boolean
}

export default function PostHeader({
  showBackButton = true,
  backButtonText = "Back",
  onBackClick,
  showLogo = true,
}: PostHeaderProps) {
  const router = useRouter();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
    }
  };

  return (
    <header className={styles.postHeader}>
      <div className={styles.postHeaderTop}>
        {showBackButton && (
          <button
            onClick={handleBackClick}
            className={styles.backButton}
            aria-label={backButtonText}
          >
            <ArrowLeft size={24} />
          </button>
        )}

        {showLogo && (
          <Link href="/" className={styles.postLogoLink}>
            <Image
              src='/images/icons/logo.svg'
              alt='OLX Logo'
              width={40}
              height={30}
              className={styles.postLogo}
            />
          </Link>
        )}
      </div>
    </header>
  )
}