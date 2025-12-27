export interface LebaneseTown {
  id: string;
  name: { en: string; ar: string };
  type: 'city' | 'town' | 'village' | 'area';
}

export interface LebaneseDistrict {
  id: string;
  name: { en: string; ar: string };
  towns: LebaneseTown[];
}

export interface LebaneseGovernorate {
  id: string;
  name: { en: string; ar: string };
  districts: LebaneseDistrict[];
}

export type LocationOption = {
  value: string
  type: string
  parent: string | null
  label: {
    en: string
    ar: string
  }
}