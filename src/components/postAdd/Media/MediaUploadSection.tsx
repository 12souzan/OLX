 
import React from 'react';
import { useLanguage } from '@/context/languageContext';
import styles from '@/styles/Post.module.css';
import { Youtube } from 'lucide-react';
import ImageUploader from './ImageUpload';

interface MediaUploadSectionProps {
  onImagesChange: (files: File[]) => void;
  videoUrl: string;
  onVideoUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function MediaUploadSection({
  onImagesChange,
  videoUrl,
  onVideoUrlChange
}: MediaUploadSectionProps) {
  const { messages } = useLanguage();

  return (
    <>
      <div className={styles.mediaSection}>
        <h3 className={styles.sectionSubtitle}>
          {messages.post.uploadImages || 'Upload Images'}
        </h3>
        <ImageUploader onImagesChange={onImagesChange} />
      </div>

      <div className={styles.videoSection}>
        <div className={styles.videoInputWrapper}>
          <label className={styles.fieldLabel}>
            {messages.post.addVideo || 'Add Video URL'}
          </label>
          <div className={styles.videoInputContainer}>
            <div className={styles.videoInputIcon}>
              <Youtube size={20} />
            </div>
            <input
              type="url"
              id="video-url"
              name="video-url"
              value={videoUrl}
              max={70}
              onChange={onVideoUrlChange}
              placeholder={messages.post.videoPlaceholder || "Paste YouTube video URL here..."}
              className={styles.videoInput}
            />
          </div>
        </div>
      </div>
    </>
  );
}