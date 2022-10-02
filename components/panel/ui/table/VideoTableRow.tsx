/* eslint-disable @next/next/no-img-element */
import React, { FC } from 'react';
import { Video } from 'types/types';

type Props = {
  video: Video;
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
          <div className="font-semibold">{video.title}</div>
        </div>
      </td>
      <td className="px-4 py-3">TODO</td>
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
