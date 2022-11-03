/* eslint-disable @next/next/no-img-element */
import { RefreshIcon } from '@heroicons/react/outline';
import Checkbox from '@ui/Checkbox';
import Modal from '@ui/Modal';
import ModalButton from '@ui/ModalButton';
import TagEditor from '@ui/TagEditor';
import TextInput from '@ui/TextInput';
import Spinner from '@ui/Spinner';
import useVideoData from 'hooks/useVideoData';
import React, { FC } from 'react';
import { classNames, randomImageId, slugifyTitle } from 'utils/helpers';

type Props = {
  isShowing: boolean;
  id: string | null;
  onClose: () => void;
  saveChanges: (id: number, data: any) => Promise<void>;
};

const EditVideoModal: FC<Props> = ({ isShowing, onClose, id, saveChanges }) => {
  const { video, updateVideo } = useVideoData(id, isShowing);
  const canRefreshImage =
    video?.plattform === 'xvideos' || video?.plattform === 'xnxx';

  return (
    <Modal isShowing={isShowing} title="Edit Video" onClose={onClose}>
      {video ? (
        <>
          <div className="flex flex-col md:flex-row justify-between md:space-x-4">
            <div className="flex flex-col w-full">
              <TextInput
                label="Title"
                value={video.title}
                handleChange={(e) => {
                  updateVideo('slug', slugifyTitle(e.target.value));
                  updateVideo('title', e.target.value);
                }}
              />
              <TextInput
                label="Alternative Title"
                value={video.alternativeTitle}
                handleChange={(e) => {
                  updateVideo('alternativeTitle', e.target.value);
                }}
              />

              <TextInput
                label="Slug"
                value={video.slug}
                handleChange={(e) => {
                  updateVideo('slug', e.target.value);
                }}
              />

              <Checkbox
                label="HD"
                value={video.isHD}
                handleChange={() => {
                  updateVideo('isHD', !video.isHD);
                }}
              />

              <TagEditor
                label="Tags"
                tags={video.tags}
                removeTag={(tagToRemove) => {
                  const currentTags = video.tags.slice();
                  updateVideo(
                    'tags',
                    currentTags.filter((t) => t !== tagToRemove)
                  );
                }}
                addTag={(tagToAdd) => {
                  const currentTags = video.tags.slice();
                  if (!currentTags.includes(tagToAdd)) {
                    currentTags.push(tagToAdd);
                    updateVideo('tags', currentTags);
                  }
                }}
              />

              <TagEditor
                label="Categories"
                tags={video.categories}
                btnLabel="Add Category"
                removeTag={(categoryToRemove) => {
                  const currentCategories = video.categories.slice();
                  updateVideo(
                    'categories',
                    currentCategories.filter((t) => t !== categoryToRemove)
                  );
                }}
                addTag={(categoryToAdd) => {
                  const currentCategories = video.categories.slice();
                  if (!currentCategories.includes(categoryToAdd)) {
                    currentCategories.push(categoryToAdd);
                    updateVideo('categories', currentCategories);
                  }
                }}
              />

              <TagEditor
                label="Models"
                tags={video.models}
                btnLabel="Add Model"
                removeTag={(modelToRemove) => {
                  const currentModels = video.models.slice();
                  updateVideo(
                    'models',
                    currentModels.filter((t) => t !== modelToRemove)
                  );
                }}
                addTag={(modelToAdd) => {
                  const currentModels = video.models.slice();
                  if (!currentModels.includes(modelToAdd)) {
                    currentModels.push(modelToAdd);
                    updateVideo('models', currentModels);
                  }
                }}
              />
            </div>
            <div className="flex flex-col min-w-fit justify-start">
              <span className="font-semibold my-1">Image</span>
              <div className="relative">
                <img
                  className="w-full md:w-56 h-48 md:rounded-t-md rounded-md md:rounded-b-none mx-auto scale-x-flip"
                  src={video.originalImage || '/images/no-image.png'}
                  alt="Video image preview"
                />
                {canRefreshImage && (
                  <div
                    className="absolute right-1 top-1 p-1 bg-sky-600 hover:text-gray-300 hover:bg-sky-500 rounded-md cursor-pointer"
                    onClick={() => {
                      const newImage = randomImageId(video.originalImage);
                      updateVideo('originalImage', newImage);
                    }}
                  >
                    <RefreshIcon className="w-5 h-5 " />
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-100 mt-3 inline-flex items-baseline justify-start">
                Status:
                <div
                  className={classNames(
                    video.isUp ? 'bg-green-400' : 'bg-red-400',
                    'ml-1 rounded-full w-2 h-2 animate-pulse mr-1'
                  )}
                ></div>
                <div className="text-xs flex font-semibold">
                  {video.isUp ? 'Online' : 'Offline'}
                </div>
              </div>
              <div className="text-sm text-gray-100 mt-3">
                Plattform:{' '}
                <span className="font-semibold">{video.plattform}</span>
              </div>
              <div className="text-sm text-gray-100 mt-3">
                Original ID:{' '}
                <span className="font-semibold">{video.originalId}</span>
              </div>
              <div className="text-sm text-gray-100 mt-3">
                Views: <span className="font-semibold">{video.views}</span>
              </div>
              <div className="text-sm text-gray-100 mt-3">
                Likes: <span className="font-semibold">{video.likes}</span>
              </div>
              <div className="text-sm text-gray-100 mt-3">
                Dislikes:{' '}
                <span className="font-semibold">{video.dislikes}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:space-y-0 w-full space-y-2 md:space-x-2 mt-8">
            <ModalButton
              handleClick={() => {
                const data: any = {
                  alternativeTitle: video.alternativeTitle,
                  title: video.title,
                  tags: video.tags,
                  categories: video.categories,
                  models: video.models,
                  originalImage: video.originalImage,
                  slug: video.slug,
                  isHD: video.isHD,
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
    </Modal>
  );
};

export default EditVideoModal;
