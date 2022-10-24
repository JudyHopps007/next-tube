/* eslint-disable react-hooks/exhaustive-deps */
import Alert from '@ui/Alert';
import Button from '@ui/Button';
import DropDown from '@ui/Dropdown';
import Headline from '@ui/Headline';
import ProgressBar from '@ui/ProgressBar';
import { ADD_KEYWORD_STEPSIZE } from 'constants/panel';
import useKeywordAPI from 'hooks/useKeywordAPI';
import React, { useEffect, useState } from 'react';
import { KeywordRole } from 'types/types';
import { textAreaToArray } from 'utils/helpers';

type Props = {};

const KEYWORDS_ROLE_DROPDOWN = [
  {
    label: 'Keywords',
    query: 'keyword',
  },
  {
    label: 'Titles',
    query: 'title',
  },
];

const AddKeywordsSection = (props: Props) => {
  const [amount, setAmount] = useState(0);
  const [keywords, setKeywords] = useState('');
  const [role, setRole] = useState('keyword');
  const [settings, setSettings] = useState({
    target: 0,
    completed: 0,
    progress: 0,
    isRunning: false,
    isDone: false,
    successfullKeywords: 0,
    keywords: [] as string[],
  });

  useEffect(() => {
    setAmount(keywords.length === 0 ? 0 : textAreaToArray(keywords).length);
  }, [keywords]);

  const keywordAPI = useKeywordAPI();

  const updateSettings = (data: any) => {
    setSettings((currentSettings) => {
      return { ...currentSettings, ...data };
    });
  };

  const unitName = role === 'keyword' ? 'Keywords' : 'Titles';

  const addKeywords = () => {
    const keywordsArray = textAreaToArray(keywords);
    updateSettings({
      keywords: keywordsArray.slice(),
      target: keywordsArray.length,
      progress: 0,
      completed: 0,
      successfullKeywords: 0,
      isRunning: true,
      isDone: false,
    });
  };

  const { completed, target, isRunning, isDone } = settings;

  useEffect(() => {
    const addTag = async () => {
      if (isRunning && completed <= target) {
        if (completed < target) {
          let stepSize = ADD_KEYWORD_STEPSIZE;
          if (settings.keywords.length < completed + ADD_KEYWORD_STEPSIZE)
            stepSize = settings.keywords.length % ADD_KEYWORD_STEPSIZE;
          const res = await keywordAPI.keywordAdd({
            keywords: settings.keywords.slice(completed, completed + stepSize),
            role: role,
          });
          const successfullKeywords =
            settings.successfullKeywords + res.success;
          updateSettings({
            completed: completed + stepSize,
            successfullKeywords,
          });
        }
      }
      if (isRunning && completed === target) {
        updateSettings({
          isRunning: false,
          isDone: true,
        });
        setKeywords('');
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
        items={KEYWORDS_ROLE_DROPDOWN}
        selectedQuery={role}
        updateFilterQuery={(newRole) => {
          setRole(newRole as KeywordRole);
        }}
      />
      <div className="relative mt-3">
        <textarea
          style={{ resize: 'none' }}
          className="w-full bg-slate-800 focus:outline-none rounded-md p-4"
          rows={15}
          cols={10}
          value={keywords}
          placeholder={`Enter ${unitName}...`}
          onChange={(e) => {
            setKeywords(e.target.value);
          }}
        />
        <div className="absolute top-1 right-3 text-indigo-500">
          {amount} {unitName}
        </div>
      </div>
      {!isRunning && (
        <Button
          title={`Add ${unitName}`}
          handleClick={() => {
            if (keywords.length === 0) return;
            addKeywords();
          }}
        />
      )}
      {isRunning && (
        <ProgressBar
          color="bg-indigo-700"
          target={settings.target}
          progress={settings.progress}
          completed={settings.completed}
        />
      )}
      {isDone && (
        <Alert
          message={`${settings.successfullKeywords} of ${settings.completed} ${unitName} added!`}
          alertType="success"
        />
      )}
    </>
  );
};

export default AddKeywordsSection;
