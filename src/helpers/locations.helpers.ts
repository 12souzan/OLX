import { LEBANESE_LOCATIONS } from "@/utils/locations";

export const getGovernorates = (locale: 'en' | 'ar' = 'en') => {
  return LEBANESE_LOCATIONS.map(gov => ({
    id: gov.id,
    name: gov.name[locale]
  }));
};

export const getDistrictsByGovernorate = (governorateId: string, locale: 'en' | 'ar' = 'en') => {
  const governorate = LEBANESE_LOCATIONS.find(g => g.id === governorateId);
  if (!governorate) return [];
  
  return governorate.districts.map(dist => ({
    id: dist.id,
    name: dist.name[locale]
  }));
};

export const getTownsByDistrict = (governorateId: string, districtId: string, locale: 'en' | 'ar' = 'en') => {
  const governorate = LEBANESE_LOCATIONS.find(g => g.id === governorateId);
  if (!governorate) return [];
  
  const district = governorate.districts.find(d => d.id === districtId);
  if (!district) return [];
  
  return district.towns.map(town => ({
    id: town.id,
    name: town.name[locale],
    type: town.type
  }));
};

export const getAllTowns = (locale: 'en' | 'ar' = 'en') => {
  return LEBANESE_LOCATIONS.flatMap(gov =>
    gov.districts.flatMap(dist =>
      dist.towns.map(town => ({
        id: town.id,
        name: town.name[locale],
        district: dist.name[locale],
        governorate: gov.name[locale],
        fullName: `${town.name[locale]}, ${dist.name[locale]}, ${gov.name[locale]}`
      }))
    )
  );
};

export const searchLocations = (query: string, locale: 'en' | 'ar' = 'en') => {
  const allTowns = getAllTowns(locale);
  const lowerQuery = query.toLowerCase();
  
  return allTowns.filter(town =>
    town.name.toLowerCase().includes(lowerQuery) ||
    town.district.toLowerCase().includes(lowerQuery) ||
    town.governorate.toLowerCase().includes(lowerQuery)
  );
};

export const formatAddress = (
  governorateId: string,
  districtId: string,
  townId: string,
  locale: 'en' | 'ar' = 'en'
): string => {
  const governorate = LEBANESE_LOCATIONS.find(g => g.id === governorateId);
  if (!governorate) return '';
  
  const district = governorate.districts.find(d => d.id === districtId);
  if (!district) return '';
  
  const town = district.towns.find(t => t.id === townId);
  if (!town) return '';
  
  if (locale === 'ar') {
    return `${town.name.ar}، ${district.name.ar}، ${governorate.name.ar}`;
  }
  
  return `${town.name.en}, ${district.name.en}, ${governorate.name.en}`;
};