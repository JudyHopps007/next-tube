/* eslint-disable @next/next/no-img-element */
import { RefreshIcon } from '@heroicons/react/outline';
import LabelCheckbox from '@panel/ui/Checkbox';
import DropDown from '@panel/ui/Dropdown';
import PanelModal from '@panel/ui/Modal';
import ModalButton from '@panel/ui/ModalButton';
import TagEditor from '@panel/ui/TagEditor';
import PanelTextInput from '@panel/ui/TextInput';
import Spinner from '@ui/Spinner';
import { TAG_ROLES_DROPDOWN } from 'constants/panel';
import { generateTagId } from 'database/utils/helper';
import useTagData from 'hooks/useTagData';
import React, { FC } from 'react';

type Props = {
  isShowing: boolean;
  id: string | null;
  onClose: () => void;
  saveChanges: (id: string, data: any) => Promise<void>;
};

const EditTagModal: FC<Props> = ({ isShowing, onClose, id, saveChanges }) => {
  const { tag, updateTag } = useTagData(id);
  return (
    <PanelModal isShowing={isShowing} title="Edit Tag" onClose={onClose}>
      {tag ? (
        <>
          <div className="flex flex-col md:flex-row justify-between md:space-x-4">
            <div className="flex flex-col w-full">
              <PanelTextInput
                label="Name"
                value={tag.name}
                handleChange={(e) => {
                  updateTag('name', e.target.value);
                }}
              />

              <LabelCheckbox
                label="Priority"
                value={tag.isPriority}
                handleChange={() => {
                  updateTag('isPriority', !tag.isPriority);
                }}
              />

              <PanelTextInput
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
                relatedTags={tag.relatedTags}
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
              <img
                className="w-48 h-48 md:rounded-t-md rounded-md md:rounded-b-none mx-auto"
                src={tag.image || '/images/no-image.png'}
                alt="Tag image preview"
              />
              <div>
                <button className="bg-sky-600 hover:bg-sky-500 p-1 md:rounded-b-md shadow-lg w-full mt-2 md:mt-0 rounded-md md:rounded-t-none">
                  <div className="flex justify-center items-center">
                    <RefreshIcon className="w-5 h-5" />
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-y-0 w-full space-y-2 md:space-x-2 mt-8">
            <ModalButton
              handleClick={() => {
                const tagId = tag.id;
                const data = {
                  videoCount: tag.videoCount,
                  name: tag.name,
                  isPriority: tag.isPriority,
                  role: tag.role,
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
    </PanelModal>
  );
};

export default EditTagModal;
