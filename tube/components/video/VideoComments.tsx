import Button from '@ui/Button';
import React from 'react';

type Props = {};

const VideoComments = (props: Props) => {
  return (
    <>
      <div className="w-full py-2">
        <div className="border border-primary/30 w-full"></div>
      </div>
      <div className="flex flex-col space-y-3">
        <div className="text-lg font-semibold">Comments</div>
        <textarea
          className="w-full p-2 rounded-md cursor-not-allowed placeholder:text-alternative bg-primary brightness-125"
          disabled={true}
          placeholder="Please login to post comment"
        />
        <div className="flex flex-row justify-center md:justify-between">
          <span className="text-alternative w-60">250 Charaters left</span>
          <Button text="Submit Comment" />
        </div>
      </div>
    </>
  );
};

export default VideoComments;
