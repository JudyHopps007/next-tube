/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { VideoWithMeta } from 'types/types';
import useVideoAPI from './useVideoAPI';

const useVideoData = (id: string | null, isReady: boolean) => {
  const videoAPI = useVideoAPI();
  const [video, setVideo] = useState<VideoWithMeta | null>(null);
  const { videoGet } = videoAPI;

  useEffect(() => {
    const getVideoData = async () => {
      if (id && isReady) {
        const video = await videoGet(+id);
        setVideo(video as unknown as VideoWithMeta);
      }
    };
    getVideoData();
    return () => {
      setVideo(null);
    };
  }, [id]);

  const updateVideo = (
    key: string,
    value: string | number | boolean | string[]
  ) => {
    setVideo((currentVideo) => {
      return { ...currentVideo, [key]: value } as VideoWithMeta;
    });
  };

  return {
    video,
    updateVideo,
  };
};

export default useVideoData;
