/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useLanguage } from '@/context/languageContext';
import { CategoryField } from '@/types/category';
import styles from '@/styles/Post.module.css';
import { Search } from 'lucide-react';
import DynamicFormField from './DynamicFormField';

interface FormFieldRendererProps {
  field: CategoryField;
  value: any;
  onChange: (fieldName: string, value: any) => void;
  formData: Record<string, any>;
  locale?: string;
}

export default function FormFieldRenderer({
  field,
  value,
  onChange,
  formData,
  locale: propLocale
}: FormFieldRendererProps) {
  const { locale: contextLocale } = useLanguage();
  const locale = propLocale || contextLocale;

  if (!field) return null;

  if (field.name === 'ownership') {
    return (
      <>
        <label className={styles.fieldLabel}>
          {locale === 'en' ? field.label_en : field.label_ar}
          {field.required && <span className={styles.required}>*</span>}
        </label>
        <div className={styles.ownershipCardGroup}>
          {field.options?.map(option => (
            <label
              key={option.value}
              className={`${styles.ownershipCard} ${
                formData[field.name] === option.value ? styles.ownershipCardSelected : ''
              }`}
            >
              <input
                type="radio"
                name={field.name}
                value={option.value}
                checked={formData[field.name] === option.value}
                onChange={(e) => onChange(field.name, e.target.value)}
                required={field.required}
                className={styles.ownershipInput}
              />
              <div className={styles.ownershipContent}>
                <span className={styles.ownershipLabel}>
                  {locale === 'en' ? option.label_en : option.label_ar}
                </span>
              </div>
            </label>
          ))}
        </div>
      </>
    );
  }

  if (field.type === 'select') {
    const placeholder = field.name === 'priceType' 
      ? (locale === 'en' ? 'Select price type' : 'اختر نوع السعر')
      : (locale === 'en' ? 'Select an option' : 'اختر خيار');

    return (
      <>
        <label className={styles.fieldLabel}>
          {locale === 'en' ? field.label_en : field.label_ar}
          {field.required && <span className={styles.required}>*</span>}
        </label>
        <div className={styles.selectWrapper}>
          <div className={styles.selectIcon}>
            <Search size={16} />
          </div>
          <select
            value={value || ''}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={styles.customSelect}
            required={field.required}
          >
            <option value="" disabled>{placeholder}</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {locale === 'en' ? option.label_en : option.label_ar}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  }

  return (
    <>
      <label className={styles.fieldLabel}>
        {locale === 'en' ? field.label_en : field.label_ar}
        {field.required && <span className={styles.required}>*</span>}
      </label>
      <DynamicFormField
        field={field}
        value={value}
        onChange={(fieldName, val) => onChange(fieldName, val)}
      />
    </>
  );
}