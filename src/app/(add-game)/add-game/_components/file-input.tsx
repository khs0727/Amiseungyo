import { useEffect, useState } from 'react';
import { FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface FileInputProps {
  field: {
    value?: File;
    onChange: (file?: File) => void;
  };
  label: string;
  className?: string;
  teamStyles: any;
}

export default function FileInput({ field, label, className, teamStyles }: FileInputProps) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    // 컴포넌트 언마운트 시 미리보기 URL 해제
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // 이전 미리보기 URL이 존재하면 해제
    if (preview) {
      URL.revokeObjectURL(preview);
    }

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
        />
      </FormControl>
      {preview && (
        <img src={preview} alt="Preview" className="mt-2 w-40 h-40 rounded-lg object-cover" />
      )}
      <FormMessage />
    </div>
  );
}
