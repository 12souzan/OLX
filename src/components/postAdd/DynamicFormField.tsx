/* eslint-disable @typescript-eslint/no-explicit-any */
import { CategoryField } from '@/types/category';
import styles from '@/styles/Post.module.css';
import { useLanguage } from '@/context/languageContext';

interface DynamicFormFieldProps {
  field: CategoryField;
  value: any;
  onChange: (name: string, value: any) => void;
}

export default function DynamicFormField({ 
  field, 
  value, 
  onChange, 
}: DynamicFormFieldProps) {

  const {messages , locale} = useLanguage()
  
  const placeholder = field ? 
    (locale === 'en' ? field.placeholder_en || '' : field.placeholder_ar || '') 
    : '';

  if (!field) {
    return (
      <div className={styles.errorField}>
        {messages.post.emptyField}
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    let newValue: any = e.target.value;
    
    if (field.type === 'number') {
      newValue = parseFloat(newValue) || '';
    } else if (field.type === 'checkbox') {
      newValue = (e.target as HTMLInputElement).checked;
    }
    
    onChange(field.name, newValue);
  };

  const renderField = () => {
    if (!field.type) {
      console.error(`Field ${field.name} has no type defined`, field);
      return <div>Error: Field type missing</div>;
    }

    switch (field.type) {
      case 'select':
        return (
          <div className={styles.selectWrapper}>
            <select
              id={field.name}
              name={field.name}
              value={value || ''}
              onChange={handleChange}
              required={field.required}
              className={styles.formSelect}
              disabled={!field.options || field.options.length === 0}
            >
              <option value="" disabled>
                {placeholder || `Select...`}
              </option>
              {field.options?.map((option, index) => (
                <option key={option.value || index} value={option.value}>
                  {locale === 'en' ? option.label_en : option.label_ar}
                </option>
              ))}
            </select>
          </div>
        );

      case 'textarea':
        return (
          <textarea
            id={field.name}
            name={field.name}
            value={value || ''}
            onChange={handleChange}
            required={field.required}
            placeholder={placeholder}
            className={styles.formTextarea}
            rows={4}
          />
        );

      case 'checkbox':
        return (
          <input
            type="checkbox"
            id={field.name}
            name={field.name}
            checked={!!value}
            onChange={handleChange}
            required={field.required}
            className={styles.formCheckbox}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            id={field.name}
            name={field.name}
            value={value || ''}
            onChange={handleChange}
            required={field.required}
            placeholder={placeholder}
            min={field.validation_rules?.min}
            max={field.validation_rules?.max}
            className={styles.formInput}
          />
        );

      default:
        return (
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={value || ''}
            onChange={handleChange}
            required={field.required}
            placeholder={placeholder}
            className={styles.formInput}
          />
        );
    }
  };

  if (!field.type || (field.type === 'select' && (!field.options || field.options.length === 0))) {
    return (
      <div className={styles.loadingField}>
        {messages.common.loading}
      </div>
    );
  }

  return renderField();
}