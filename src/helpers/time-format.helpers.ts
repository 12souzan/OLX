export const formatTimeAgo = (
    date: Date | string | number, 
    language: 'en' | 'ar' ,
): string => {
    const now = new Date();
    const dateObj = new Date(date);
    const isArabic = language === 'ar';
    
    const diffMs = now.getTime() - dateObj.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (isArabic) {
        if (diffSeconds < 60) {
            if (diffSeconds < 10) return 'الآن';
            return `قبل ${diffSeconds} ثانية`;
        }
        if (diffMins < 60) {
            if (diffMins === 1) return 'قبل دقيقة';
            return `قبل ${diffMins} دقيقة`;
        }
        if (diffHours < 24) {
            if (diffHours === 1) return 'قبل ساعة';
            return `قبل ${diffHours} ساعة`;
        }
        if (diffDays < 7) {
            if (diffDays === 1) return 'أمس';
            if (diffDays === 2) return 'قبل يومين';
            return `قبل ${diffDays} يوم`;
        }
        if (diffWeeks < 4) {
            if (diffWeeks === 1) return 'قبل أسبوع';
            if (diffWeeks === 2) return 'قبل أسبوعين';
            return `قبل ${diffWeeks} أسبوع`;
        }
        if (diffMonths < 12) {
            if (diffMonths === 1) return 'قبل شهر';
            if (diffMonths === 2) return 'قبل شهرين';
            if (diffMonths < 11) return `قبل ${diffMonths} أشهر`;
            return 'قبل 11 شهر';
        }
        if (diffYears === 1) return 'قبل سنة';
        if (diffYears === 2) return 'قبل سنتين';
        return `قبل ${diffYears} سنة`;
    }

    if (diffSeconds < 60) {
        if (diffSeconds < 10) return 'Just now';
        return `${diffSeconds} sec${diffSeconds !== 1 ? 's' : ''} ago`;
    }
    if (diffMins < 60) {
        if (diffMins === 1) return '1 min ago';
        return `${diffMins} mins ago`;
    }
    if (diffHours < 24) {
        if (diffHours === 1) return '1 hour ago';
        return `${diffHours} hours ago`;
    }
    if (diffDays < 7) {
        if (diffDays === 1) return 'Yesterday';
        return `${diffDays} days ago`;
    }
    if (diffWeeks < 4) {
        if (diffWeeks === 1) return '1 week ago';
        return `${diffWeeks} weeks ago`;
    }
    if (diffMonths < 12) {
        if (diffMonths === 1) return '1 month ago';
        return `${diffMonths} months ago`;
    }
    if (diffYears === 1) return '1 year ago';
    return `${diffYears} years ago`;
};