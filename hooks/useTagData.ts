/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Tag } from 'types/types';
import useTagAPI from './useTagAPI';

const useTagData = (id: string | null, isReady: boolean) => {
  const tagAPI = useTagAPI();
  const [tag, setTag] = useState<Tag | null>(null);
  const { tagGet } = tagAPI;

  useEffect(() => {
    const getTagData = async () => {
      if (id && isReady) {
        const tag = await tagGet(id);
        setTag(tag as unknown as Tag);
      }
    };
    getTagData();
    return () => {
      setTag(null);
    };
  }, [id]);

  const updateTag = (
    key: string,
    value: string | number | boolean | string[]
  ) => {
    setTag((currentTag) => {
      return { ...currentTag, [key]: value } as Tag;
    });
  };

  return {
    tag,
    updateTag,
  };
};

export default useTagData;
