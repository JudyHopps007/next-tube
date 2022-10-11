import React, { FC } from 'react';

type Props = {
  label: string;
  value: string | number;
  placeholder?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const PanelTextInput: FC<Props> = ({
  label,
  handleChange,
  value,
  placeholder,
}) => {
  return (
    <div className="flex flex-col">
      <span className="font-semibold my-1">{label}</span>
      <input
        placeholder={placeholder}
        type="text"
        className="bg-slate-700 focus:outline-none p-2 w-full rounded-md"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default PanelTextInput;
