import React, { FC } from 'react';

type Props = {
  value: string | number;
  placeholder?: string;
  inputType?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput: FC<Props> = ({
  handleChange,
  value,
  placeholder,
  inputType = 'text',
}) => {
  return (
    <input
      placeholder={placeholder}
      type={inputType}
      min={inputType === 'number' ? 0 : ''}
      className="bg-primary text-main focus:outline-none p-2 w-full rounded-md placeholder:text-alternative"
      value={value}
      onChange={handleChange}
    />
  );
};

export default TextInput;
