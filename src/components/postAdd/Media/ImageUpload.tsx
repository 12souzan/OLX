import React, { useState, useRef } from 'react';
import { Camera, X } from 'lucide-react';
import styles from '@/styles/Post.module.css';
import Image from 'next/image';

interface ImageUploaderProps {
  onImagesChange: (files: File[]) => void;
}

export default function ImageUploader({ onImagesChange }: ImageUploaderProps) {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      const newImages = [...images, ...files.slice(0, 12 - images.length)];
      setImages(newImages);
      onImagesChange(newImages);
      
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviews([...previews, ...newPreviews.slice(0, 12 - previews.length)]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    
    setImages(newImages);
    setPreviews(newPreviews);
    onImagesChange(newImages);
    
    URL.revokeObjectURL(previews[index]);
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const renderUploadBoxes = () => {
    const boxes = [];
    
    boxes.push(
      <div
        key="upload"
        className={`${styles.imageUploadBox} ${styles.first}`}
        onClick={handleBoxClick}
      >
        <div className={styles.uploadIcon}>+</div>
      </div>
    );

    previews.forEach((preview, index) => {
      boxes.push(
        <div key={`preview-${index}`} className={styles.imageUploadBox}>
          <Image
            src={preview}
            alt={`Preview ${index + 1}`}
            width={80}
            height={80}
            className={styles.imagePreview}
          />
          <div
            className={styles.removeImage}
            onClick={() => handleRemoveImage(index)}
          >
            <X size={12} />
          </div>
        </div>
      );
    });

    const remainingBoxes = 12 - previews.length - 1;
    for (let i = 0; i < remainingBoxes; i++) {
      boxes.push(
        <div key={`empty-${i}`} className={styles.imageUploadBox}>
          <Camera size={24} className={styles.uploadIcon} />
        </div>
      );
    }

    return boxes;
  };

  return (
    <>
      <div className={styles.imageUploadGrid}>
        {renderUploadBoxes()}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        multiple
        style={{ display: 'none' }}
      />
    </>
  );
}