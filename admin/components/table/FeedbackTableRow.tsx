/* eslint-disable @next/next/no-img-element */
import React, { FC, useState } from 'react';
import { Feedback } from 'types/types';
import { FEEDBACK_SUBJECTS } from 'constants/panel';
import PanelTag from '@ui/Tag';
import { ChevronUpIcon } from '@heroicons/react/outline';

type Props = {
  hasSeenHandler: (id: number) => Promise<void>;
  feedback: Feedback;
};

const FeedbackTableRow: FC<Props> = ({ feedback, hasSeenHandler }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [hasSeen, setHasSeen] = useState(feedback.hasSeen);

  const handleShowMessage = async () => {
    setShowMessage(!showMessage);
    if (!hasSeen) {
      setHasSeen(true);
      await hasSeenHandler(feedback.id);
    }
  };

  return (
    <>
      <tr
        className="bg-slate-800 hover:bg-slate-700/80 text-gray-400 hover:text-gray-300 text-sm"
        onClick={handleShowMessage}
      >
        <td className="px-4 py-3">
          <div className="flex flex-row space-x-2 justify-start items-center">
            {!hasSeen && <PanelTag label="New" color="sky" />}
            <div className="font-semibold">
              {(FEEDBACK_SUBJECTS as any)[feedback.subject]}
            </div>
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="font-semibold">{feedback.email}</div>
        </td>
      </tr>
      {showMessage && (
        <tr>
          <td colSpan={2} className="px-4 py-3">
            <div className="text-gray-400 whitespace-pre-wrap">
              {feedback.message}
            </div>
            <button
              className="flex w-full p-2 items-center justify-center text-gray-400 hover:text-gray-300"
              onClick={() => {
                setShowMessage(false);
              }}
            >
              <ChevronUpIcon className="w-5 h-5" />
            </button>
          </td>
        </tr>
      )}
    </>
  );
};

export default FeedbackTableRow;
