import DropDown from '@ui/Dropdown';
import PanelModal from '@ui/Modal';
import ModalButton from '@ui/ModalButton';
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

const ChangeRoleModal: FC<Props> = ({
  isShowing,
  id,
  onClose,
  saveChanges,
}) => {
  const { tag, updateTag } = useTagData(id, isShowing);
  return (
    <PanelModal isShowing={isShowing} title="Change Role" onClose={onClose}>
      {tag ? (
        <>
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
            <ModalButton
              handleClick={() => {
                const tagId = tag.id;
                const data = {
                  name: tag.name,
                  role: tag.role,
                  originalImage: tag.originalImage,
                };
                onClose();
                saveChanges(tagId, data);
              }}
              btnType="success"
              text="Save Changes"
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

export default ChangeRoleModal;
