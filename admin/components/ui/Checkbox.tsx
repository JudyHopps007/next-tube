import React, { FC } from 'react';

type Props = {
  label: string;
  value: boolean;
  handleChange: () => void;
};

const Checkbox: FC<Props> = ({ label, value, handleChange }) => {
  return (
    <div className="flex flex-row items-center my-2">
      <input
        className="appearance-none h-5 w-5 border border-slate-600 bg-slate-700 rounded-md checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none transition duration-200 mr-2 align-top cursor-pointer"
        type="checkbox"
        checked={value}
        onChange={handleChange}
      />
      <label className="inline-block font-semibold">{label}</label>
    </div>
  );
};

export default Checkbox;
