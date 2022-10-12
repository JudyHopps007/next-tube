import LabelCheckbox from '@panel/ui/Checkbox';
import DropDown from '@panel/ui/Dropdown';
import { TAG_ROLES_DROPDOWN } from 'constants/panel';
import React, { useEffect, useState } from 'react';

type Props = {};

const AddTagsSection = (props: Props) => {
  const [tags, setTags] = useState('');
  const [parseRelated, setParseRelated] = useState(false);
  const [parseImage, setParseImage] = useState(false);
  const [role, setRole] = useState('tag');
  const [amount, setAmount] = useState(0);

  const textAreaToArray = (tags: string) => {
    const tagArray = tags.split(/\n/);
    const trimmedArray = tagArray.map((tag) => tag.trim());
    return trimmedArray;
  };

  useEffect(() => {
    setAmount(tags.length === 0 ? 0 : textAreaToArray(tags).length);
  }, [tags]);

  return (
    <>
      <div className="relative">
        <textarea
          style={{ resize: 'none' }}
          className="w-full bg-slate-800 focus:outline-none rounded-md p-4"
          rows={15}
          cols={10}
          value={tags}
          placeholder={'Enter Titles...'}
          onChange={(e) => {
            setTags(e.target.value);
          }}
        />
        <div className="absolute top-1 right-3 text-indigo-500">
          {amount} Tags
        </div>
      </div>
      <LabelCheckbox
        label="Parse Related Tags"
        value={parseRelated}
        handleChange={() => {
          setParseRelated(!parseRelated);
        }}
      />
      <DropDown
        items={TAG_ROLES_DROPDOWN}
        selectedQuery={role}
        updateFilterQuery={(newRole) => {
          setRole(newRole as string);
          if (newRole === 'tag') setParseImage(false);
        }}
      />
      {role !== 'tag' && (
        <LabelCheckbox
          label="Parse Default Image"
          value={parseImage}
          handleChange={() => {
            setParseImage(!parseRelated);
          }}
        />
      )}
      <button className="bg-sky-600 hover:bg-sky-500 w-full p-2 rounded-md mt-2">
        Add Tags
      </button>
    </>
  );
};

export default AddTagsSection;
