/* eslint-disable @next/next/no-img-element */
import React, { FC } from 'react';
import { VideoWithMeta } from 'types/types';
import PanelTag from '../Tag';

type Props = {
  video: VideoWithMeta;
};

const VideoTableRow: FC<Props> = ({ video }) => {
  return (
    <tr className="bg-slate-800 hover:bg-slate-700/80 text-gray-400 hover:text-gray-300 text-sm">
      <td className="px-4 py-3 font-semibold">{video.vid}</td>
      <td className="px-4 py-3">
        <div className="flex flex-row items-center space-x-3">
          <img
            className="w-12 h-12 rounded-md"
            alt={video.title}
            src={video.thumbnail}
          />
          <div className="flex flex-col space-y-2">
            <div className="font-semibold">{video.title}</div>
            <div className="font-thin">{video.alternativeTitle || '-'}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-row items-center">
          <PanelTag label={video.plattform} color="sky" />
        </div>
      </td>
      <td className="px-4 py-3">
        <div>
          {`${video.tags.length} / ${video.categories.length} / ${video.actors.length}`}
        </div>
      </td>
      <td className="px-4 py-3">TODO</td>
    </tr>
  );
};

export default VideoTableRow;
