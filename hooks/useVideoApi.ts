import axios from 'axios';
import { useRouter } from 'next/router';

const useVideoAPI = () => {
  const router = useRouter();

  const videoGet = async (id: number) => {
    const video = await axios.get(`/api/videos/${id}`);
    return video.data;
  };

  const videoDelete = async (id: number) => {
    await axios.delete(`/api/videos/${id}`);
    router.push(router.asPath);
  };

  return {
    videoGet,
    videoDelete,
  };
};

export default useVideoAPI;
