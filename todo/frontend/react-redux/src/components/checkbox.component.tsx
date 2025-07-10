import { useState } from 'react';

type CheckboxComponentProps = {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CheckboxComponent({ label, name, checked, onChange }: CheckboxComponentProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    onChange(e);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center">
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={isChecked}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor={name} className="ml-2 block text-sm font-bold">
          {label}
        </label>
      </div>
    </div>
  );
}
