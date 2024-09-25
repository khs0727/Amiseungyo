import Image from 'next/image';
import { useState } from 'react';
import { FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import fileToBase64 from '@/utils/file-to-base64';

interface TeamStyles {
  bg: {
    light: string;
    dark: string;
  };
  border: string;
  text: string;
  focus: string;
}
interface FileInputProps {
  field: {
    value?: string;
    onChange: (file?: string) => void;
  };
  label: string;
  teamStyles: TeamStyles;
}

export default function FileInput({ field, label, teamStyles }: FileInputProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setPreview(base64);
        field.onChange(base64);
      } catch {
        setPreview(null);
        field.onChange(undefined);
      }
    } else {
      setPreview(null);
      field.onChange(undefined);
    }
  };

  return (
    <div>
      <FormLabel className={`text-xl ${teamStyles.text}`}>{label}</FormLabel>
      <FormControl>
        <Input type="file" onChange={handleFileChange} className="text-lg text-slate-400" />
      </FormControl>
      {preview && (
        <Image
          src={preview}
          alt="Preview"
          width={80}
          height={80}
          className="mt-2 rounded-lg object-cover"
        />
      )}
      <FormMessage />
    </div>
  );
}
