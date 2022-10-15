import React, { FC } from 'react';

type Props = {
  label: string;
  value: string | number;
  placeholder?: string;
  inputType?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput: FC<Props> = ({
  label,
  handleChange,
  value,
  placeholder,
  inputType = 'text',
}) => {
  return (
    <div className="flex flex-col">
      <span className="font-semibold my-1">{label}</span>
      <input
        placeholder={placeholder}
        type={inputType}
        min={inputType === 'number' ? 0 : ''}
        className="bg-slate-700 focus:outline-none p-2 w-full rounded-md"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextInput;
