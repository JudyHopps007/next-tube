import axios from 'axios';
import { useRouter } from 'next/router';

const useTagAPI = () => {
  const router = useRouter();
  const tagDelete = async (id: string) => {
    await axios.delete(`/api/tags/${id}`);
    router.push(router.asPath);
  };

  const tagEdit = async (id: string, data: any) => {
    await axios.patch(`/api/tags/${id}`, data);
    router.push(router.asPath);
  };

  const tagPriorityUp = async (id: string) => {
    await axios.patch(`/api/tags/${id}`, {
      priority: true,
    });
    router.push(router.asPath);
  };

  const tagPriorityDown = async (id: string) => {
    await axios.patch(`/api/tags/${id}`, {
      priority: false,
    });
    router.push(router.asPath);
  };

  const tagGet = async (id: string) => {
    const tag = await axios.get(`/api/tags/${id}`);
    return tag.data;
  };

  return {
    tagDelete,
    tagEdit,
    tagPriorityUp,
    tagPriorityDown,
    tagGet,
  };
};

export default useTagAPI;
