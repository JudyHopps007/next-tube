/* eslint-disable react-hooks/exhaustive-deps */
import Alert from '@ui/Alert';
import Button from '@ui/Button';
import LabelCheckbox from '@ui/Checkbox';
import DropDown from '@ui/Dropdown';
import Headline from '@ui/Headline';
import ProgressBar from '@ui/ProgressBar';
import { ADD_TAG_STEPSIZE, TAG_ROLES_DROPDOWN } from 'constants/panel';
import useTagAPI from 'hooks/useTagAPI';
import React, { useEffect, useState } from 'react';
import { textAreaToArray } from 'utils/helpers';

type Props = {};

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
    successfullTags: 0,
    isRunning: false,
    isDone: false,
    tags: [] as string[],
  });
  const tagAPI = useTagAPI();

  const updateSettings = (newSettings: any) => {
    setSettings((currentSettings) => {
      return { ...currentSettings, ...newSettings };
    });
  };

  useEffect(() => {
    setAmount(tags.length === 0 ? 0 : textAreaToArray(tags).length);
  }, [tags]);

  const addTags = () => {
    const tagsArray = textAreaToArray(tags);
    updateSettings({
      tags: tagsArray.slice(),
      target: tagsArray.length,
      progress: 0,
      completed: 0,
      successfullTags: 0,
      isRunning: true,
      isDone: false,
    });
  };

  const roleMap: Record<string, any> = {
    tag: 'Tags',
    model: 'Models',
    category: 'Categories',
  };

  const unitName = roleMap[role] ?? 'Tags';

  const { completed, target, isRunning, isDone } = settings;

  useEffect(() => {
    const addTag = async () => {
      if (isRunning && completed <= target) {
        if (completed < target) {
          let stepSize = ADD_TAG_STEPSIZE;
          if (settings.tags.length < completed + ADD_TAG_STEPSIZE)
            stepSize = settings.tags.length % ADD_TAG_STEPSIZE;
          const res = await tagAPI.tagAdd({
            tags: settings.tags.slice(completed, completed + stepSize),
            role: role,
            parseImage: settings.parseImage,
            parseRelated: settings.parseRelated,
          });
          const successfullTags = settings.successfullTags + res.success;
          updateSettings({
            completed: completed + stepSize,
            successfullTags,
          });
        }
      }
      if (isRunning && completed === target) {
        updateSettings({
          isRunning: false,
          isDone: true,
        });
        setTags('');
      }
    };
    addTag();
  }, [isRunning, completed, target]);

  useEffect(() => {
    updateSettings({ progress: Math.ceil((completed / target) * 100) });
  }, [completed]);

  return (
    <>
      <Headline text={`Add ${unitName}`} />
      <DropDown
        items={TAG_ROLES_DROPDOWN}
        selectedQuery={role}
        updateFilterQuery={(newRole) => {
          setRole(newRole as string);
          if (newRole === 'tag') updateSettings({ parseImage: false });
        }}
      />
      <div className="relative mt-3">
        <textarea
          style={{ resize: 'none' }}
          className="w-full bg-slate-800 focus:outline-none rounded-md p-4"
          rows={15}
          cols={10}
          value={tags}
          placeholder={`Enter ${unitName}...`}
          onChange={(e) => {
            setTags(e.target.value);
          }}
        />
        <div className="absolute top-1 right-3 text-indigo-500">
          {amount} {unitName}
        </div>
      </div>
      <LabelCheckbox
        label="Parse Related Tags"
        value={settings.parseRelated}
        handleChange={() => {
          updateSettings({ parseRelated: !settings.parseRelated });
        }}
      />
      {role !== 'tag' && (
        <LabelCheckbox
          label="Parse Default Image"
          value={settings.parseImage}
          handleChange={() => {
            updateSettings({ parseImage: !settings.parseImage });
          }}
        />
      )}
      {!isRunning && (
        <Button
          title={`Add ${unitName}`}
          handleClick={() => {
            if (tags.length === 0) return;
            addTags();
          }}
        />
      )}
      {isRunning && (
        <ProgressBar
          completed={settings.completed}
          target={settings.target}
          progress={settings.progress}
          color="bg-emerald-500"
        />
      )}
      {isDone && (
        <Alert
          message={`${settings.successfullTags} of ${settings.completed} ${unitName} added!`}
          alertType="success"
        />
      )}
    </>
  );
};

export default AddTagsSection;
