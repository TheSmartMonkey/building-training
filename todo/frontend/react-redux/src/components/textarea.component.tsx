import { useState } from 'react';

type TextareaComponentProps = {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  rows?: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export function TextareaComponent({ label, name, placeholder, value, rows = 4, onChange }: TextareaComponentProps) {
  const [textareaValue, setTextareaValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
    onChange(e);
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-bold mb-2">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={textareaValue}
        onChange={handleChange}
        rows={rows}
        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
}
