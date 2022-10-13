/* eslint-disable @next/next/no-img-element */
import PanelModal from '@panel/ui/Modal';
import ModalButton from '@panel/ui/ModalButton';
import PanelTextInput from '@panel/ui/TextInput';
import Spinner from '@ui/Spinner';
import useVideoData from 'hooks/useVideoData';
import React, { FC, useEffect, useState } from 'react';

type Props = {
  isShowing: boolean;
  id: string | null;
  onClose: () => void;
  saveChanges: (id: number, data: any) => Promise<void>;
};

const EditVideoModal: FC<Props> = ({ isShowing, onClose, id, saveChanges }) => {
  const { video, updateVideo } = useVideoData(id, isShowing);
  const [image, setImage] = useState(video?.originalImage);

  useEffect(() => {
    setImage(video?.originalImage);
  }, [video]);

  return (
    <PanelModal isShowing={isShowing} title="Edit Video" onClose={onClose}>
      {video ? (
        <>
          <div className="flex flex-col md:flex-row justify-between md:space-x-4">
            <div className="flex flex-col w-full">
              <PanelTextInput
                label="Title"
                value={video.title}
                handleChange={(e) => {
                  updateVideo('title', e.target.value);
                }}
              />
              <PanelTextInput
                label="Alternative Title"
                value={video.alternativeTitle}
                handleChange={(e) => {
                  updateVideo('alternativeTitle', e.target.value);
                }}
              />
              <PanelTextInput
                label="Likes"
                value={video.likes}
                inputType="number"
                handleChange={(e) => {
                  updateVideo('likes', e.target.value);
                }}
              />
              <PanelTextInput
                label="Dislikes"
                value={video.dislikes}
                inputType="number"
                handleChange={(e) => {
                  updateVideo('dislikes', e.target.value);
                }}
              />
              <PanelTextInput
                label="Views"
                value={video.views}
                inputType="number"
                handleChange={(e) => {
                  updateVideo('views', e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col min-w-fit justify-start">
              <span className="font-semibold my-1">Image</span>
              <div className="relative">
                <img
                  className="w-full md:w-48 md:h-48 md:rounded-t-md rounded-md md:rounded-b-none mx-auto"
                  src={video.originalImage || '/images/no-image.png'}
                  alt="Tag image preview"
                />
              </div>
              <div className="text-sm text-gray-100 mt-3">
                Plattform:{' '}
                <span className="font-semibold">{video.plattform}</span>
              </div>
              <div className="text-sm text-gray-100 mt-3">
                Original ID:{' '}
                <span className="font-semibold">{video.originalId}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:space-y-0 w-full space-y-2 md:space-x-2 mt-8">
            <ModalButton
              handleClick={() => {
                const data: any = {
                  alternativeTitle: video.alternativeTitle,
                  title: video.title,
                  likes: video.likes,
                  dislikes: video.dislikes,
                  views: video.views,
                };
                onClose();
                saveChanges(video.id, data);
              }}
              text="Save Changes"
              btnType="success"
            />
            <ModalButton handleClick={onClose} btnType="danger" text="Close" />
          </div>
        </>
      ) : (
        <Spinner borderColor="border-gray-400" />
      )}
    </PanelModal>
  );
};

export default EditVideoModal;
