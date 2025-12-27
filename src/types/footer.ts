export interface FooterLink {
  id: number;
  name: string;
  arabicName?: string;
  url: string;
}

export interface PaymentMethod {
  id: number;
  name: string;
  arabicName?: string;
  image: string;
  alt: string;
  url?: string;
}

export type IconName = 'Facebook' | 'Instagram' | 'Youtube'


export interface SocialMediaItem {
  id: number;
  name: string;
  icon: IconName;
  url: string;
  arabicName: string;
}


export interface FooterData {
  paymentMethods: PaymentMethod[];
  popularCategories: FooterLink[];
  trendingSearches: FooterLink[];
  aboutUs: FooterLink[];
  helpLegal: FooterLink[];
  socialMedia: SocialMediaItem[];
  appDownloads: PaymentMethod[];
  translations: {
    [key: string]: {
      en: string;
      ar: string;
    };
  };
}