import PanelModal from '@panel/ui/Modal';
import Spinner from '@ui/Spinner';
import useTagHandler from 'hooks/useTagHandler';
import React, { FC, useEffect, useState } from 'react';
import { Tag } from 'types/types';

type Props = {
  isShowing: boolean;
  id: string | null;
  onClose: () => void;
};

const EditTagModal: FC<Props> = ({ isShowing, onClose, id }) => {
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

  return (
    <PanelModal isShowing={isShowing} title="Edit Tag" onClose={onClose}>
      {tag ? <div>{tag.name}</div> : <Spinner border="border-gray-400" />}
    </PanelModal>
  );
};

export default EditTagModal;
