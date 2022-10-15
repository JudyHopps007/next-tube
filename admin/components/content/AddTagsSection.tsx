/* eslint-disable react-hooks/exhaustive-deps */
import { RefreshIcon } from '@heroicons/react/outline';
import LabelCheckbox from '@ui/Checkbox';
import DropDown from '@ui/Dropdown';
import { TAG_ROLES_DROPDOWN } from 'constants/panel';
import useTagAPI from 'hooks/useTagAPI';
import React, { useEffect, useState } from 'react';
import { classNames } from 'utils/helpers';

type Props = {};

const successMsg = (amount: number, role: string) => {
  const map: Record<string, any> = {
    tag: (
      <>
        <span className="font-semibold">{amount}</span>
        {` ${amount > 1 ? 'Tags' : 'Tag'} added!`}
      </>
    ),
    category: (
      <>
        <span className="font-semibold">{amount}</span>
        {` ${amount > 1 ? 'Category' : 'Categories'} added!`}
      </>
    ),
    actor: (
      <>
        <span className="font-semibold">{amount}</span>
        {` ${amount > 1 ? 'Actors' : 'Actor'} added!`}
      </>
    ),
  };
  return (
    <div className="border-2 border-emerald-700/70 text-center bg-emerald-400/20 rounded-md p-2 mt-5">
      {map[role]}
    </div>
  );
};

const AddTagsSection = (props: Props) => {
  const [tags, setTags] = useState('');
  const [role, setRole] = useState('tag');
  const [amount, setAmount] = useState(0);
  const [settings, setSettings] = useState({
    parseRelated: false,
    parseImage: false,
    target: 0,
    completed: 0,
    progress: 0,
    isRunning: false,
    isDone: false,
    tags: [] as string[],
  });
  const tagAPI = useTagAPI();

  const updateSettings = (
    key: string,
    value: boolean | string | number | string[]
  ) => {
    setSettings((currentSettings) => {
      return { ...currentSettings, [key]: value };
    });
  };

  const textAreaToArray = (tags: string) => {
    const tagArray = tags.split(/\n/);
    const trimmedArray = tagArray.map((tag) => tag.trim());
    return trimmedArray;
  };

  useEffect(() => {
    setAmount(tags.length === 0 ? 0 : textAreaToArray(tags).length);
  }, [tags]);

  const addTags = () => {
    const tagsArray = textAreaToArray(tags);
    updateSettings('tags', tagsArray.slice());
    updateSettings('target', tagsArray.length);
    updateSettings('progress', 0);
    updateSettings('completed', 0);
    updateSettings('isRunning', true);
    updateSettings('isDone', false);
  };

  const { completed, target, isRunning, isDone } = settings;

  useEffect(() => {
    const addTag = async () => {
      if (isRunning && completed <= target) {
        if (completed < target) {
          await tagAPI.tagAdd({
            name: settings.tags[completed],
            role: role,
            parseImage: settings.parseImage,
            parseRelated: settings.parseRelated,
          });
          updateSettings('completed', completed + 1);
        }
      }
      if (isRunning && completed === target) {
        updateSettings('isRunning', false);
        updateSettings('isDone', true);
        setTags('');
      }
    };
    addTag();
  }, [isRunning, completed, target]);

  useEffect(() => {
    updateSettings('progress', Math.ceil((completed / target) * 100));
  }, [completed]);

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
        value={settings.parseRelated}
        handleChange={() => {
          updateSettings('parseRelated', !settings.parseRelated);
        }}
      />
      <DropDown
        items={TAG_ROLES_DROPDOWN}
        selectedQuery={role}
        updateFilterQuery={(newRole) => {
          setRole(newRole as string);
          if (newRole === 'tag') updateSettings('parseImage', false);
        }}
      />
      {role !== 'tag' && (
        <LabelCheckbox
          label="Parse Default Image"
          value={settings.parseImage}
          handleChange={() => {
            updateSettings('parseImage', !settings.parseImage);
          }}
        />
      )}
      <button
        disabled={isRunning}
        onClick={() => {
          if (tags.length === 0) return;
          addTags();
        }}
        className={classNames(
          isRunning
            ? 'bg-slate-800 cursor-not-allowed rounded-t-md'
            : 'bg-sky-600 hover:bg-sky-500 rounded-md',
          'w-full p-2 mt-2 justify-center'
        )}
      >
        {isRunning ? (
          <span>
            <RefreshIcon className="inline-flex w-6 h-6 animate-spin duration-500 mr-1" />
            {`[${settings.completed}/${settings.target}] ${settings.progress}%`}
          </span>
        ) : (
          'Add Tags'
        )}
      </button>
      {isRunning && (
        <div className="flex justify-between mb-1">
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-emerald-500 h-2.5 rounded-full"
              style={{ width: `${settings.progress}%` }}
            ></div>
          </div>
        </div>
      )}
      {isDone && successMsg(settings.completed, role)}
    </>
  );
};

export default AddTagsSection;
