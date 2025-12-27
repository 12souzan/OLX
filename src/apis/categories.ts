/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category, CategoryFieldResponse } from "@/types/category"

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`)
    }
    console.log(response.json)
    return await response.json()
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function fetchCategoryFields(categorySlug: string): Promise<CategoryFieldResponse | null> {
  try {
    const params = new URLSearchParams({
      categorySlugs: categorySlug,
      includeChildCategories: 'true',
      splitByCategoryIDs: 'true',
      flatChoices: 'true',
      groupChoicesBySection: 'true',
      flat: 'true'
    });

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categoryFields?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch category fields');
    
    const data = await response.json();
    
    return transformApiResponse(data);
    
  } catch (error) {
    console.error('Error fetching category fields:', error);
    return null;
  }
}

function transformApiResponse(apiData: any): CategoryFieldResponse | null {
  
  if (apiData.flatFields && Array.isArray(apiData.flatFields)) {
    return {
      category_id: apiData.category_id || 0,
      fields: transformFields(apiData.flatFields),
      sections: apiData.sections || []
    };
  }
  
  const keys = Object.keys(apiData);
  for (const key of keys) {
    const categoryData = apiData[key];
    if (categoryData?.flatFields && Array.isArray(categoryData.flatFields)) {
      return {
        category_id: parseInt(key) || categoryData.category_id || 0,
        fields: transformFields(categoryData.flatFields),
        sections: categoryData.sections || []
      };
    }
  }
  
  console.error('Could not find flatFields in API response');
  return null;
}

function transformFields(flatFields: any[]): any[] {
  return flatFields.map((field: any) => {
    const fieldType = mapFieldType(field.valueType || field.type);
    
    let options: any[] = [];
    if (field.choices && Array.isArray(field.choices)) {
      options = field.choices.map((choice: any) => ({
        value: choice.value || choice.id || choice.label,
        label_en: choice.label || choice.label_en || String(choice.value),
        label_ar: choice.label_ar || choice.label || String(choice.value)
      }));
    }
    
    const attribute = field.attribute || field.name || '';
    const name = snakeCaseToCamel(attribute); 
    
    return {
      id: field.id,
      name: name,
      label_en: formatLabel(attribute) || field.label || 'Field',
      label_ar: formatLabelArabic(attribute) || field.label_ar || 'حقل',
      type: fieldType,
      required: field.roles?.includes('required') || field.required || false,
      placeholder_en: getPlaceholder(attribute, 'en'),
      placeholder_ar: getPlaceholder(attribute, 'ar'),
      min: field.min,
      max: field.max,
      options: options,
      validation_rules: {
        min: field.min,
        max: field.max,
        pattern: field.pattern
      }
    };
  });
}

function mapFieldType(valueType: string): string {
  if (!valueType) return 'text';
  
  const typeMap: Record<string, string> = {
    'float': 'number',
    'integer': 'number',
    'number': 'number',
    'enum': 'select',
    'boolean': 'checkbox',
    'checkbox': 'checkbox',
    'radio': 'radio',
    'textarea': 'textarea',
    'text': 'text',
    'string': 'text',
    'date': 'text',
    'email': 'text',
    'tel': 'text',
    'url': 'text',
    'price': 'number'
  };
  
  return typeMap[valueType.toLowerCase()] || 'text';
}

function snakeCaseToCamel(str: string): string {
  if (!str) return '';
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

function formatLabel(attribute: string): string {
  if (!attribute) return 'Field';
  
  return attribute
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

function formatLabelArabic(attribute: string): string {
  if (!attribute) return 'حقل';
  
  const translations: Record<string, string> = {
    'price': 'السعر',
    'price_type': 'نوع السعر',
    'video': 'فيديو',
    'black_friday': 'الجمعة السوداء',
    'holidays': 'العطلات',
    'ramadan': 'رمضان',
    'weekly_finds': 'اكتشافات الأسبوع',
    'highlights': 'أبرز العروض',
    'summer': 'صيف',
    'autumn': 'خريف',
    'brand': 'الماركة',
    'model': 'الموديل',
    'year': 'السنة',
    'mileage': 'المسافة المقطوعة',
    'transmission': 'ناقل الحركة',
    'fuel_type': 'نوع الوقود',
    'property_type': 'نوع العقار',
    'bedrooms': 'غرف نوم',
    'bathrooms': 'حمامات',
    'area': 'المساحة',
    'furnished': 'مفروش',
    'ownership': 'الملكية',
    'floor': 'الطابق',
    'condition': 'الحالة',
    'storage': 'التخزين',
    'ram': 'الذاكرة العشوائية'
  };
  
  return translations[attribute] || attribute.replace(/_/g, ' ');
}

function getPlaceholder(attribute: string, language: 'en' | 'ar'): string {
  const placeholders: Record<string, Record<'en' | 'ar', string>> = {
    'price': { en: 'Enter price', ar: 'أدخل السعر' },
    'price_type': { en: 'Select price type', ar: 'اختر نوع السعر' },
    'year': { en: 'e.g., 2020', ar: 'مثال: 2020' },
    'mileage': { en: 'Mileage in km', ar: 'المسافة المقطوعة بالكم' },
    'bedrooms': { en: 'Number of bedrooms', ar: 'عدد غرف النوم' },
    'bathrooms': { en: 'Number of bathrooms', ar: 'عدد الحمامات' },
    'area': { en: 'Area in m²', ar: 'المساحة بالمتر المربع' }
  };
  
  const placeholder = placeholders[attribute];
  if (placeholder) {
    return placeholder[language];
  }
  
  return language === 'en' ? `Enter ${formatLabel(attribute).toLowerCase()}` : `أدخل ${formatLabelArabic(attribute)}`;
}