/* eslint-disable @typescript-eslint/no-explicit-any */
import { CategoryField } from '@/types/category';
import FormFieldRenderer from './FormFieldRenderer';
import styles from '@/styles/Post.module.css';

interface FormSectionProps {
  fields: CategoryField[];
  formData: Record<string, any>;
  onChange: (fieldName: string, value: any) => void;
  locale?: string;
}

export default function FormSection({
  fields,
  formData,
  onChange,
  locale
}: FormSectionProps) {
  if (fields.length === 0) return null;

  return (
    <div className={styles.section}>
      <div className={styles.propertyGrid}>
        {fields.map((field) => (
          <div key={field.id} className={styles.formRow}>
            <FormFieldRenderer
              field={field}
              value={formData[field.name] || ''}
              onChange={onChange}
              formData={formData}
              locale={locale}
            />
          </div>
        ))}
      </div>
    </div>
  );
}