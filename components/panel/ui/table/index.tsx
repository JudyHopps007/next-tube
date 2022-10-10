import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import ChangeRoleModal from '@panel/modals/ChangeRoleModal';
import EditTagModal from '@panel/modals/EditTagModal';
import useQueryPush from 'hooks/useQueryPush';
import useTagHandler from 'hooks/useTagHandler';
import React, { FC, useState } from 'react';
import { PaneldModals, Tag, VideoWithMeta } from 'types/types';
import {
  calculateMaxItemPerPage,
  calculateMinItemPerPage,
} from 'utils/navigation';
import TagTableRow from './TagTableRow';
import VideoTableRow from './VideoTableRow';

type Props = {
  page: number;
  itemsCount: number;
  itemsPerPage: number;
  contentType: 'tag' | 'video';
  titles: string[];
  items: any[];
};

const Table: FC<Props> = ({
  itemsCount,
  page,
  items,
  itemsPerPage,
  titles,
  contentType,
}) => {
  const [modals, setModals] = useState({
    showEditTagsModal: false,
    showChangeRoleModal: false,
  });
  const [modalDataId, setModalDataId] = useState<string | null>(null);

  const queryPush = useQueryPush();
  const tagHandler = useTagHandler();

  const updateModal = (key: PaneldModals, id: string | null) => {
    setModalDataId(id);
    showModal(key);
  };

  const showModal = (key: PaneldModals) => {
    setModals((currentModals) => {
      return { ...currentModals, [key]: !currentModals[key] };
    });
  };

  if (items.length === 0) {
    return (
      <div className="w-full text-center bg-slate-800 rounded-lg p-3 text-xl ">
        No {contentType === 'video' ? 'Videos' : 'Tags'} found ;(
      </div>
    );
  }

  return (
    <>
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left uppercase text-gray-400 border-b border-slate-700 bg-slate-800">
                {titles.map((title) => (
                  <th key={title} className="px-4 py-3">
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700 bg-slate-800">
              {contentType === 'video' &&
                items.map((item: VideoWithMeta) => (
                  <VideoTableRow key={item.vid} video={item} />
                ))}
              {contentType === 'tag' &&
                items.map((item: Tag) => (
                  <TagTableRow
                    key={item.id}
                    tag={item}
                    deleteHandler={tagHandler.tagDelete}
                    priorityDownHandler={tagHandler.tagPriorityDown}
                    priorityUpHandler={tagHandler.tagPriorityUp}
                    editHandler={(id) => {
                      updateModal('showEditTagsModal', id);
                    }}
                    changeRoleHandler={(id) => {
                      updateModal('showChangeRoleModal', id);
                    }}
                  />
                ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-row justify-between px-4 py-3 text-xs font-semibold tracking-wideuppercase border-t border-slate-700 text-gray-400 bg-slate-800">
          <div className="flex items-center">
            {`Showing ${calculateMinItemPerPage(
              page,
              itemsPerPage,
              itemsCount
            )}-${calculateMaxItemPerPage(
              page,
              itemsPerPage,
              itemsCount
            )} of ${itemsCount}`}
          </div>
          <div className="flex flex-row justify-center items-center space-x-4">
            {page > 1 && (
              <div
                onClick={() => {
                  if (+page - 1 === 1) {
                    queryPush.setQueryParam({ page: null });
                  } else {
                    queryPush.setQueryParam({ page: +page - 1 });
                  }
                }}
                className="flex justify-center items-center hover:bg-indigo-600 hover:text-gray-100 py-2 px-3 rounded-lg cursor-pointer"
              >
                <ChevronLeftIcon className="w-5 h-5" />
                Prev
              </div>
            )}
            {page * itemsPerPage < itemsCount && (
              <div
                onClick={() => {
                  queryPush.setQueryParam({ page: +page + 1 });
                }}
                className="flex justify-center items-center hover:bg-indigo-600 hover:text-gray-100 py-2 px-3 rounded-lg cursor-pointer"
              >
                Next
                <ChevronRightIcon className="w-5 h-5" />
              </div>
            )}
          </div>
        </div>
      </div>
      <ChangeRoleModal
        onClose={() => {
          updateModal('showChangeRoleModal', null);
        }}
        saveChanges={tagHandler.tagEdit}
        id={modalDataId}
        isShowing={modals.showChangeRoleModal}
      />
      <EditTagModal
        onClose={() => {
          updateModal('showEditTagsModal', null);
        }}
        saveChanges={tagHandler.tagEdit}
        id={modalDataId}
        isShowing={modals.showEditTagsModal}
      />
    </>
  );
};

export default Table;
