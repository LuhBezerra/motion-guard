import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { ChangeEventHandler, useCallback, useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

export type TextInputType = 'input' | 'upload' | 'password';

export type FileBase64 = {
  name: string;
  base64: string;
}

interface InputProps {
  label?: string;
  hint?: string;
  placeholder?: string;
  name: string;
  className?: string;
  inputClassName?: string;
  value?: string;
  file?: FileBase64;
  showError?: boolean;
  readonly?: boolean;
  type?: TextInputType;
  inputType?: 'text' | 'number' | 'upload';
  variant?: 'default' | 'outline'
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onUpload?: (fileBase64: FileBase64) => void
}

export const Input = ({ inputClassName, label, hint, file, variant, type, inputType = 'text', placeholder, name, className, value, showError, readonly, onUpload, onChange }: InputProps) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null); // Estado para armazenar a URL da imagem
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputStyle = useMemo(() => {
    if (variant === 'outline') {
      return `w-auto`
    }

    return `border-2 rounded-lg 'p-4' w-full ${showError ? 'border-red-500 text-red-500' : 'text-gray-900'} ${readonly ? 'bg-stone-100	text-stone-500 cursor-default	' : ''}`
  }, [readonly, showError, variant])

  const labeStyle = "text-sm text-gray-950"

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        onUpload?.({
          name: file.name,
          base64: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  }, [onUpload]);

  useEffect(() => {
    if (value?.includes('data:image') || value?.includes('http')) {
      setUploadedImage(value)
    }
  }, [value])

  const renderInput = useMemo(() => {
    switch (type) {
      case 'password':
        return (
          <div className="relative">
            <input
              readOnly={readonly}
              type={isPasswordVisible ? 'text' : 'password'}
              id={name}
              name={name}
              placeholder={placeholder}
              className={twMerge('h-10 w-full p-2', inputStyle)}
              value={value}
              onChange={onChange}
            />
            <button
              type="button"
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? <EyeSlashIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
            </button>
          </div>
        );
      case 'upload':
        return <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="imageUpload"
          />
          <label htmlFor="imageUpload">
            {uploadedImage ? (
              <Image src={uploadedImage} width={200} height={200} alt="Uploaded Preview" className={twMerge("w-20 h-20 object-cover cursor-pointer", inputClassName)} />
            ) : (
              <div className={twMerge('h-10 w-32 border-2 border-dashed cursor-pointer', inputStyle, inputClassName)}>Clique para adicionar</div>
            )}
          </label>
        </div>
      default:
        return <input
          readOnly={readonly}
          type={inputType}
          min={0}
          id={name}
          name={name}
          placeholder={placeholder}
          className={twMerge('h-10 p-2', inputStyle)}
          value={value}
          onChange={onChange}
        />;
    }
  }, [handleImageChange, inputClassName, inputStyle, inputType, isPasswordVisible, name, onChange, placeholder, readonly, type, uploadedImage, value]);

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label htmlFor="username" className={labeStyle}>{label}</label>
      )}
      {renderInput}
      {hint && (
        <p className='text-xs text-gray-700'>{hint}</p>
      )}
    </div>
  )
}