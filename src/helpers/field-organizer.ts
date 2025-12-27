import { Category, CategoryField } from '@/types/category';

export interface OrganizedFields {
  commonFields: CategoryField[];
  specificFields: CategoryField[];
  otherFields: CategoryField[];
}

export function organizeFields(
  fields: CategoryField[],
  selectedCategory: Category,
  parentCategory?: Category | null): OrganizedFields {
  if (parentCategory === null) {
    parentCategory = undefined;
  }
  const isMobile = selectedCategory.name?.toLowerCase().includes('mobile') ||
    selectedCategory.slug?.toLowerCase().includes('mobile');

  const isCar = selectedCategory.name?.toLowerCase().includes('car') ||
    selectedCategory.slug?.toLowerCase().includes('car') ||
    parentCategory?.name?.toLowerCase().includes('vehicle');

  const isApartment = selectedCategory.name?.toLowerCase().includes('apartment') ||
    selectedCategory.name?.toLowerCase().includes('villa') ||
    selectedCategory.name?.toLowerCase().includes('house') ||
    parentCategory?.name?.toLowerCase().includes('property');

  const commonFields = fields.filter(f =>
    ['price', 'priceType', 'paymentOption', 'deliverable', 'delivery'].includes(f.name)
  );

  let specificFields: CategoryField[] = [];
  let otherFields = fields.filter(f =>
    !['price', 'priceType', 'paymentOption', 'deliverable', 'delivery', 'video'].includes(f.name)
  );

  if (isMobile) {
    specificFields = otherFields.filter(f =>
      ['newUsed', 'storage', 'color', 'ram', 'battery', 'screen', 'camera'].includes(f.name)
    );
    otherFields = otherFields.filter(f =>
      !['newUsed', 'storage', 'color', 'ram', 'battery', 'screen', 'camera'].includes(f.name)
    );
  } else if (isCar) {
    specificFields = otherFields.filter(f =>
      ['make', 'model', 'year', 'color', 'seats', 'doors', 'interior',
        'fuel', 'transmission', 'kilometers', 'condition', 'newUsed'].includes(f.name)
    );
    otherFields = otherFields.filter(f =>
      !['make', 'model', 'year', 'color', 'seats', 'doors', 'interior',
        'fuel', 'transmission', 'kilometers', 'condition', 'newUsed'].includes(f.name)
    );
  } else if (isApartment) {
    specificFields = otherFields.filter(f =>
      ['propertyType', 'ownership', 'rooms', 'bedrooms', 'bathrooms',
        'ft', 'area', 'size', 'furnished', 'condition', 'floorLevel',
        'panorama', 'view'].includes(f.name)
    );
    otherFields = otherFields.filter(f =>
      !['propertyType', 'ownership', 'rooms', 'bedrooms', 'bathrooms',
        'ft', 'area', 'size', 'furnished', 'condition', 'floorLevel',
        'panorama', 'view'].includes(f.name)
    );
  }

  return { commonFields, specificFields, otherFields };
}