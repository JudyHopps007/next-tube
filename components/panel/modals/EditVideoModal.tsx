/* eslint-disable @next/next/no-img-element */
import PanelModal from '@panel/ui/Modal';
import Spinner from '@ui/Spinner';
import useVideoData from 'hooks/useVideoData';
import React, { FC, useEffect, useState } from 'react';

type Props = {
  isShowing: boolean;
  id: string | null;
  onClose: () => void;
  saveChanges: (id: string, data: any) => Promise<void>;
};

const EditVideoModal: FC<Props> = ({ isShowing, onClose, id, saveChanges }) => {
  const { video, updateVideo } = useVideoData(id, isShowing);
  const [image, setImage] = useState(video?.originalImage);

  useEffect(() => {
    setImage(video?.originalImage);
  }, [video]);

  return (
    <PanelModal isShowing={isShowing} title="Edit Video" onClose={onClose}>
      {image ? <></> : <Spinner borderColor="border-gray-400" />}
    </PanelModal>
  );
};

export default EditVideoModal;
