import { XIcon } from '@heroicons/react/outline';
import React, { FC, useState } from 'react';
import ModalButton from './ModalButton';

type Props = {
  tags: string[];
  label: string;
  btnLabel?: string;
  removeTag: (tag: string) => void;
  addTag: (tag: string) => void;
};

const TagEditor: FC<Props> = ({
  tags,
  label,
  removeTag,
  addTag,
  btnLabel = 'Add Tag',
}) => {
  const [tagName, setTagName] = useState('');

  return (
    <div className="flex flex-col mt-2">
      <span className="font-semibold my-1">{label}</span>
      <div className="flex row content-around flex-wrap">
        {tags.map((tag, i) => (
          <div
            key={i}
            className="bg-slate-700 border border-slate-600 px-2 rounded-full mr-1 mb-1"
          >
            <div className="flex flex-row items-center justify-between">
              <span className="flex mr-2 text-sm">{tag}</span>
              <XIcon
                className="flex w-3 h-3 cursor-pointer hover:text-gray-300"
                onClick={removeTag.bind(null, tag)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-row justify-between space-x-2 items-center mt-2">
        <input
          className="bg-slate-700 focus:outline-none p-2 w-full rounded-md"
          type="text"
          value={tagName}
          placeholder="Enter new tag..."
          onChange={(e) => setTagName(e.target.value)}
        />
        <ModalButton
          text={btnLabel}
          width="w-32"
          btnType="secondary"
          handleClick={() => {
            addTag(tagName);
            setTagName('');
          }}
        />
      </div>
    </div>
  );
};

export default TagEditor;
