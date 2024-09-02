import { useState } from 'react';
import { FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TeamNames } from '@/store/theme-store';

interface FileInputProps {
  field: {
    value?: File;
    onChange: (file?: File) => void;
  };
  label: string;
  placeholder?: string;
  className?: string;
  teamStyles: any;
}

export default function FileInput({
  field,
  label,
  placeholder = '사진을 선택해주세요',
  className,
  teamStyles,
}: FileInputProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      field.onChange(file);
    } else {
      setPreview(null);
      field.onChange(undefined);
    }
  };

  return (
    <div>
      <FormLabel className={`text-xl ${teamStyles.text}`}>{label}</FormLabel>
      <FormControl>
        <Input
          type="file"
          onChange={handleFileChange}
          className={`text-lg text-slate-400 ${className}`}
          placeholder={placeholder}
        />
      </FormControl>
      {preview && (
        <img src={preview} alt="Preview" className="mt-2 w-40 h-40 rounded-lg object-cover" />
      )}
      <FormMessage />
    </div>
  );
}
