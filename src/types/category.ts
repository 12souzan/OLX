export interface Category {
  id: number
  name: string
  name_l1: string
  slug: string
  level: number
  parentID: number | null
  displayPriority: number
  children: Category[]
}

export interface CategoryWithPath {
  category: Category
  fullPath: string
}

export interface CategoryField {
  id: number;
  name: string;
  label_en: string;
  label_ar: string;
  type: 'text' | 'number' | 'select' | 'checkbox' | 'radio' | 'textarea';
  required: boolean;
  placeholder_en?: string;
  placeholder_ar?: string;
  min?: number;
  max?: number;
  options?: Array<{
    value: string;
    label_en: string;
    label_ar: string;
  }>;
  depends_on?: string;
  validation_rules?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

export interface CategoryFieldResponse {
  category_id: number;
  fields: CategoryField[];
  sections: Array<{
    name: string;
    fields: string[];
  }>;
}

export interface FormData {
  [key: string]: string | number | boolean | File[];
}