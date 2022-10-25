import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import ChangeRoleModal from 'components/modals/ChangeRoleModal';
import EditTagModal from 'components/modals/EditTagModal';
import EditVideoModal from 'components/modals/EditVideoModal';
import useFeedbackAPI from 'hooks/useFeedbackAPI';
import useKeywordAPI from 'hooks/useKeywordAPI';
import useQueryPush from 'hooks/useQueryPush';
import useTagAPI from 'hooks/useTagAPI';
import useVideoAPI from 'hooks/useVideoAPI';
import React, { FC, useState } from 'react';
import {
  Feedback,
  Keyword,
  PanelModals,
  Tag,
  VideoWithMeta,
} from 'types/types';
import {
  calculateMaxItemPerPage,
  calculateMinItemPerPage,
} from 'utils/navigation';
import FeedbackTableRow from './FeedbackTableRow';
import KeywordTableRow from './KeywordTableRow';
import TagTableRow from './TagTableRow';
import VideoTableRow from './VideoTableRow';

type ContentType = 'tag' | 'video' | 'keyword' | 'feedback';

type Props = {
  page: number;
  itemsCount: number;
  itemsPerPage: number;
  contentType: ContentType;
  titles: string[];
  items: any[];
};

const getUnit = (contentType: ContentType) => {
  const map = {
    tag: 'Tags',
    video: 'Videos',
    keyword: 'Keywords',
    feedback: 'Feedbacks',
  };

  return map[contentType] ?? 'Items';
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
    showEditVideosModal: false,
    showChangeRoleModal: false,
  });
  const [modalDataId, setModalDataId] = useState<string | null>(null);

  const queryPush = useQueryPush();
  const tagAPI = useTagAPI();
  const videoAPI = useVideoAPI();
  const keywordAPI = useKeywordAPI();
  const feedbackAPI = useFeedbackAPI();

  const updateModal = (key: PanelModals, id: string | null) => {
    setModalDataId(id);
    showModal(key);
  };

  const showModal = (key: PanelModals) => {
    setModals((currentModals) => {
      return { ...currentModals, [key]: !currentModals[key] };
    });
  };

  if (items.length === 0) {
    return (
      <div className="w-full text-center bg-slate-800 rounded-lg p-3 text-xl ">
        No {getUnit(contentType)} found ;(
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
                  <VideoTableRow
                    key={item.id}
                    video={item}
                    deleteHandler={videoAPI.videoDelete}
                    editHandler={(id) => {
                      updateModal('showEditVideosModal', id.toString());
                    }}
                  />
                ))}
              {contentType === 'tag' &&
                items.map((item: Tag) => (
                  <TagTableRow
                    key={item.id}
                    tag={item}
                    deleteHandler={tagAPI.tagDelete}
                    priorityDownHandler={tagAPI.tagPriorityDown}
                    priorityUpHandler={tagAPI.tagPriorityUp}
                    editHandler={(id) => {
                      updateModal('showEditTagsModal', id);
                    }}
                    changeRoleHandler={(id) => {
                      updateModal('showChangeRoleModal', id);
                    }}
                  />
                ))}
              {contentType === 'keyword' &&
                items.map((item: Keyword) => (
                  <KeywordTableRow
                    key={item.id}
                    keyword={item}
                    deleteHandler={keywordAPI.keywordDelete}
                    changeRoleHandler={keywordAPI.keywordChangeRole}
                  />
                ))}

              {contentType === 'feedback' &&
                items.map((item: Feedback) => (
                  <FeedbackTableRow
                    key={item.id}
                    feedback={item}
                    hasSeenHandler={feedbackAPI.feedbackHasSeen}
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
      {contentType === 'tag' && (
        <>
          <ChangeRoleModal
            onClose={() => {
              updateModal('showChangeRoleModal', null);
            }}
            saveChanges={tagAPI.tagEdit}
            id={modalDataId}
            isShowing={modals.showChangeRoleModal}
          />
          <EditTagModal
            onClose={() => {
              updateModal('showEditTagsModal', null);
            }}
            requestImage={tagAPI.tagRandomImage}
            requestTags={tagAPI.tagRelated}
            saveChanges={tagAPI.tagEdit}
            id={modalDataId}
            isShowing={modals.showEditTagsModal}
          />
        </>
      )}
      {contentType === 'video' && (
        <EditVideoModal
          onClose={() => {
            updateModal('showEditVideosModal', null);
          }}
          saveChanges={videoAPI.videoEdit}
          id={modalDataId}
          isShowing={modals.showEditVideosModal}
        />
      )}
    </>
  );
};

export default Table;
