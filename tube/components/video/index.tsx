import React, { FC, useState } from 'react';
import {
  CollectionIcon,
  FlagIcon,
  ThumbDownIcon,
  ThumbUpIcon,
  UserCircleIcon,
} from '@heroicons/react/outline';
import { Video } from 'types/types';
import millify from 'millify';
import TimeAgo from 'react-timeago';
import dynamic from 'next/dynamic';
import VideoCategories from './VideoCategories';

const Modal = dynamic(() => import('components/feedback/Feedback'));

type Props = { video: Video };

const VideoSection: FC<Props> = ({ video }) => {
  const [showModal, setShowModal] = useState(false);
  const hasCategories = video.categories.length > 0 || video.models.length > 0;

  return (
    <>
      <section className="mt-1">
        <div className="w-full flex flex-col py-2 text-primary space-y-3">
          <video
            src="https://i.4cdn.org/gif/1666875782940473.webm"
            controls
            className="w-full aspect-video object-cover"
            poster="/images/no-image.png"
          ></video>

          <h1 className="font-semibold text-xl md:text-4xl">{video.title}</h1>
          <div className="flex flex-col md:flex-row items-left md:items-center justify-between md:space-x-3 md:space-y-0 text-sm md:text-base">
            {hasCategories && (
              <VideoCategories
                categories={video.categories}
                models={video.models}
              />
            )}
            <div className="flex flex-row justify-start space-x-2 md:space-x-3">
              <div className="flex flex-row justify-center">
                <button className="rounded-l-full bg-secondary hover:text-tertiary inline-flex py-2 pr-2 pl-3 font-semibold items-center ">
                  {video.likes}
                  <ThumbUpIcon className="ml-1 w-5 h-5" />
                </button>
                <div className="bg-secondary flex">
                  <span className="border-r border-r-primary/40 my-2 "></span>
                </div>
                <button className="rounded-r-full bg-secondary hover:text-tertiary inline-flex py-2 pr-3 pl-2 font-semibold items-center ">
                  <ThumbDownIcon className="w-5 h-5 mr-1" />
                  {video.dislikes}
                </button>
              </div>
              <button
                onClick={() => {
                  setShowModal(true);
                }}
                className="rounded-full bg-secondary py-2 px-3 flex hover:text-tertiary font-semibold items-center"
              >
                <FlagIcon className="w-5 h-5 mr-1" />
                Report
              </button>
            </div>
          </div>
          <div className="flex flex-col space-y-1 bg-secondary/90 py-2 px-3 rounded-md text-sm md:text-base">
            <div className="flex flex-row space-x-3">
              <span className="font-semibold">
                {millify(video.views)} views
              </span>
              <span className="font-semibold">
                <TimeAgo date={video.createdAt} />
              </span>
            </div>
            <div className="flex´">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores
              ratione, aut animi ad molestias quis voluptas quo tempora magnam
              deleniti consequuntur velit nam iusto vero vel eos distinctio quam
              nihil.
            </div>
          </div>
        </div>
      </section>
      {showModal && (
        <Modal
          showModal={showModal}
          onClose={() => {
            setShowModal(false);
          }}
        />
      )}
    </>
  );
};

export default VideoSection;
