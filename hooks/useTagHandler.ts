import axios from 'axios';
import { useRouter } from 'next/router';

const useTagHandler = () => {
  const router = useRouter();
  const tagDelete = async (id: string) => {
    await axios.delete(`/api/tags/${id}`);
    router.push(router.asPath);
  };

  const tagEdit = async (id: string) => {
    console.log('tagEdit', id);
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

export default useTagHandler;
