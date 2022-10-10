import LabelCheckbox from '@panel/ui/Checkbox';
import DropDown from '@panel/ui/Dropdown';
import PanelModal from '@panel/ui/Modal';
import PanelTextInput from '@panel/ui/TextInput';
import Spinner from '@ui/Spinner';
import { TAG_ROLES_DROPDOWN } from 'constants/panel';
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
          <PanelTextInput
            label="Name"
            value={tag.name}
            handleChange={(e) => {
              updateTag('name', e.target.value);
            }}
          />

          <LabelCheckbox
            label="Priority"
            value={tag.priority}
            handleChange={() => {
              updateTag('priority', !tag.priority);
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

          <div className="flex flex-col md:flex-row md:space-y-0 w-full space-y-2 md:space-x-2 mt-8">
            <button
              onClick={() => {
                const tagId = tag.id;
                const data = {
                  videoCount: tag.videoCount,
                  name: tag.name,
                  priority: tag.priority,
                  role: tag.role,
                };
                onClose();
                saveChanges(tagId, data);
              }}
              className="bg-emerald-700 hover:bg-emerald-600 p-1 rounded-md shadow-lg md:w-full"
            >
              Save Changes
            </button>
            <button
              onClick={onClose}
              className="bg-red-500 hover:bg-red-400 p-1 rounded-md shadow-lg md:w-full"
            >
              Close
            </button>
          </div>
        </>
      ) : (
        <Spinner borderColor="border-gray-400" />
      )}
    </PanelModal>
  );
};

export default EditTagModal;
