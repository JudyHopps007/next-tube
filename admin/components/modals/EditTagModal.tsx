/* eslint-disable @next/next/no-img-element */
import { RefreshIcon, XIcon } from '@heroicons/react/outline';
import Checkbox from '@ui/Checkbox';
import DropDown from '@ui/Dropdown';
import Modal from '@ui/Modal';
import ModalButton from '@ui/ModalButton';
import TagEditor from '@ui/TagEditor';
import TextInput from '@ui/TextInput';
import Spinner from '@ui/Spinner';
import { TAG_ROLES_DROPDOWN } from 'constants/panel';
import { generateTagId } from 'database/utils/helper';
import useTagData from 'hooks/useTagData';
import React, { FC, useEffect, useState } from 'react';

type Props = {
  isShowing: boolean;
  id: string | null;
  onClose: () => void;
  saveChanges: (id: string, data: any) => Promise<void>;
  requestImage: (name: string) => Promise<string>;
  requestTags: (name: string) => Promise<string[]>;
};

const EditTagModal: FC<Props> = ({
  isShowing,
  onClose,
  id,
  saveChanges,
  requestImage,
  requestTags,
}) => {
  const { tag, updateTag } = useTagData(id, isShowing);
  const [image, setImage] = useState(tag?.originalImage);
  const [loadingTags, setLoadingTags] = useState<boolean>(false);

  useEffect(() => {
    setImage(tag?.originalImage);
    setLoadingTags(false);
  }, [tag]);

  return (
    <Modal isShowing={isShowing} title="Edit Tag" onClose={onClose}>
      {tag ? (
        <>
          <div className="flex flex-col md:flex-row justify-between md:space-x-4">
            <div className="flex flex-col w-full">
              <TextInput
                label="Name"
                value={tag.name}
                handleChange={(e) => {
                  updateTag('name', e.target.value);
                }}
              />

              <Checkbox
                label="Priority"
                value={tag.isPriority}
                handleChange={() => {
                  updateTag('isPriority', !tag.isPriority);
                }}
              />

              <TextInput
                label="Video Count"
                value={tag.videoCount}
                handleChange={(e) => {
                  updateTag('videoCount', e.target.value);
                }}
              />

              <div className="flex flex-col">
                <span className="font-semibold my-1">Role</span>
                <DropDown
                  items={TAG_ROLES_DROPDOWN}
                  selectedQuery={tag.role}
                  updateFilterQuery={(newRole) => {
                    updateTag('role', newRole as string);
                  }}
                />
              </div>

              <TagEditor
                label="Related Tags"
                tags={tag.relatedTags}
                removeTag={(tagToRemove) => {
                  const currentTags = tag.relatedTags.slice();
                  updateTag(
                    'relatedTags',
                    currentTags.filter((t) => t !== tagToRemove)
                  );
                }}
                addTag={(tagToAdd) => {
                  const currentTags = tag.relatedTags.slice();
                  if (!currentTags.includes(tagToAdd)) {
                    currentTags.push(tagToAdd);
                    updateTag('relatedTags', currentTags);
                  }
                }}
              />
            </div>

            <div className="flex flex-col min-w-fit justify-start">
              <span className="font-semibold my-1">Image</span>
              <div className="relative">
                <img
                  className="w-full md:w-48 h-48 md:rounded-t-md rounded-md md:rounded-b-none mx-auto"
                  src={image || '/images/no-image.png'}
                  alt="Tag image preview"
                />
                <div
                  className="absolute right-1 top-1"
                  onClick={() => {
                    setImage('');
                    updateTag('originalImage', '');
                  }}
                >
                  <XIcon className="w-5 h-5 bg-slate-500/30 hover:text-gray-300 hover:bg-slate-500/60 rounded-md cursor-pointer" />
                </div>
              </div>
              <div className="mb-2 md:mb-5">
                <button
                  onClick={async () => {
                    const imageRes = await requestImage(tag.name);
                    setImage(imageRes);
                    updateTag('originalImage', imageRes);
                  }}
                  className="bg-sky-600 hover:bg-sky-500 p-2 md:p-1 md:rounded-b-md shadow-lg w-full mt-2 md:mt-0 rounded-md md:rounded-t-none"
                >
                  <div className="flex justify-center items-center">
                    <RefreshIcon className="w-5 h-5 mr-1" /> Refresh Image
                  </div>
                </button>
              </div>

              {!tag.isParsed && (
                <ModalButton
                  handleClick={async () => {
                    setLoadingTags(true);
                    const relatedTags = await requestTags(tag.name);
                    updateTag(
                      'relatedTags',
                      Array.from(new Set(tag.relatedTags.concat(relatedTags)))
                    );
                    updateTag('isParsed', true);
                    setLoadingTags(false);
                  }}
                  text={loadingTags ? 'Loading...' : 'Load Related Tags'}
                  disabled={loadingTags}
                  btnType="secondary"
                />
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-y-0 w-full space-y-2 md:space-x-2 mt-8">
            <ModalButton
              handleClick={() => {
                const tagId = tag.id;
                const data: any = {
                  videoCount: tag.videoCount,
                  name: tag.name,
                  isPriority: tag.isPriority,
                  role: tag.role,
                  isParsed: tag.isParsed,
                  originalImage: tag.originalImage,
                  relatedTags: tag.relatedTags,
                  id: generateTagId(tag.name),
                };
                onClose();
                saveChanges(tagId, data);
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

export default EditTagModal;
