/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Category, CategoryField, FormData } from '@/types/category';
import { fetchCategoryFields } from '@/apis/categories';
import { useLanguage } from '@/context/languageContext';
import styles from '@/styles/Post.module.css';
import Helper from './Helper';
import MediaUploadSection from './Media/MediaUploadSection';
import { organizeFields } from '@/helpers/field-organizer';
import CategoryHeader from '../common/categories/category-header';
import FormSection from './FormSection';
import { fieldsToExclude } from '@/utils/exclude-fields';

interface PostFormProps {
  categorySlug: string;
  selectedCategory: Category;
  onBack: () => void;
  parentCategory?: Category | null ;
  onCategoryChange?: () => void;
}

export default function PostForm({ 
  categorySlug, 
  selectedCategory, 
  onBack, 
  parentCategory,
  onCategoryChange 
}: PostFormProps) {
  const { locale, messages } = useLanguage();
  const [fields, setFields] = useState<CategoryField[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({});
  const [images, setImages] = useState<File[]>([]);
  const [videoUrl, setVideoUrl] = useState('');


  useEffect(() => {
    if (categorySlug) {
      loadCategoryFields(categorySlug);
    }
  }, [categorySlug]);

  const loadCategoryFields = async (slug: string) => {
    setLoading(true);
    setFields([]);

    try {
      const response = await fetchCategoryFields(slug);

      if (response?.fields && Array.isArray(response.fields)) {
        const filteredFields = response.fields.filter(field => {
          const fieldName = field.name?.toLowerCase();
          const labelEn = field.label_en?.toLowerCase();
          const labelAr = field.label_ar?.toLowerCase();
          
          return !fieldsToExclude.some(excluded => {
            const excludedLower = excluded.toLowerCase();
            return fieldName?.includes(excludedLower) || 
                   labelEn?.includes(excludedLower) || 
                   labelAr?.includes(excludedLower);
          });
        });

        
        setFields(filteredFields);

        const initialData: FormData = {
          ...filteredFields.reduce((acc, field) => {
            let defaultValue: any = '';
            
            if (field.type === 'checkbox') defaultValue = false;
            else if (field.type === 'number') defaultValue = '';
            else if (field.type === 'select') {
              defaultValue = '';
            }

            return { ...acc, [field.name]: defaultValue };
          }, {})
        };

        setFormData(initialData);
      }
    } catch (error) {
      console.error('Error loading category fields:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleImagesChange = (files: File[]) => {
    setImages(files);
  };

  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const completeData = {
      category: selectedCategory,
      ...formData,
      images: images.map(img => img.name),
      video_url: videoUrl || undefined
    };

    console.log('Complete Form Data:', completeData);
    alert(messages.post.createdSuccessfully);
  };


  const { commonFields, specificFields, otherFields } = organizeFields(
    fields, 
    selectedCategory, 
    parentCategory
  );


  return (
    <div className={styles.detailsLayout}>
      <div className={styles.mainFormColumn}>
        <section className={styles.detailsSection}>
          <CategoryHeader
            selectedCategory={selectedCategory}
            parentCategory={parentCategory}
            onChangeClick={onCategoryChange}
          />

          <form onSubmit={handleSubmit} className={styles.adForm}>
            <MediaUploadSection
              onImagesChange={handleImagesChange}
              videoUrl={videoUrl}
              onVideoUrlChange={handleVideoUrlChange}
            />

            {/* Common Fields Section */}
            <FormSection
              fields={commonFields}
              formData={formData}
              onChange={handleFieldChange}
              locale={locale}
            />

            {/* Category Specific Fields */}
            <FormSection
              fields={specificFields}
              formData={formData}
              onChange={handleFieldChange}
              locale={locale}
            />

            {/* Other Fields Section */}
            <FormSection
              fields={otherFields}
              formData={formData}
              onChange={handleFieldChange}
              locale={locale}
            />

            {/* Form Actions */}
            <div className={styles.formActions}>
              <button
                type="button"
                className={styles.backButton}
                onClick={onBack}
              >
                {messages.post.back || 'Back'}
              </button>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={loading}
              >
                {messages.post.publishAd || 'Publish Ad'}
              </button>
            </div>
          </form>
        </section>
      </div>

      <Helper />
    </div>
  );
}