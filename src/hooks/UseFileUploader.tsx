import { base, fromUrl } from '@uploadcare/upload-client';
import React, { useEffect, useRef, useState } from 'react'

export const UseFileUploader = (
  autoUpload: boolean = false,
  onUploadSuccess?: (fileId: string) => void
) => {
  const uploadcareKey = useRef<string>(import.meta.env.VITE_UPLOADCARE_KEY);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const uploadFile = async (fileName?: string) => {
    console.log('enters uploadFile')
    if (!file) return;
    if (!uploadcareKey.current || uploadcareKey.current == '') {
      console.error('ERROR - No uploadcare key. Upload cancelled');
      return;
    }

    console.log('passes filter conditions')

    try {
      const result = await base(file, {
        publicKey: uploadcareKey.current,
        store: true,
        fileName: fileName,

        metadata: {
          subsystem: 'uploader',
        }
      });
      if (onUploadSuccess) {
        onUploadSuccess(result.file);
      }
    } catch (error) {
      console.error('ERROR at uploading file', error);
    }
  }

  useEffect(() => {
    console.log('useEffect runs')
    if (!autoUpload || !file) return;
    uploadFile();

  }, [file]);

  return {
    handleFileChange,
    upload: uploadFile,
    setFile
  }
}