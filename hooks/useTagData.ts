/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Tag } from 'types/types';
import useTagHandler from './useTagHandler';

const useTagData = (id: string | null) => {
  const tagHandler = useTagHandler();
  const [tag, setTag] = useState<Tag | null>(null);
  const { tagGet } = tagHandler;

  useEffect(() => {
    const getTagData = async () => {
      if (id) {
        const tag = await tagGet(id);
        setTag(tag as unknown as Tag);
      }
    };
    getTagData();
    return () => {
      setTag(null);
    };
  }, [id]);

  const updateTag = (key: string, value: string | number | boolean) => {
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
