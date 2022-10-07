import axios from 'axios';
import { useRouter } from 'next/router';

const useTagHandler = () => {
  const router = useRouter();
  const handleTagDelete = async (id: string) => {
    await axios.delete(`/api/tags/${id}`);
    router.push(router.asPath);
  };

  const handleTagEdit = async (id: string) => {
    console.log(id);
  };

  const handleTagPriorityUp = async (id: string) => {
    await axios.patch(`/api/tags/${id}`, {
      priority: true,
    });
    router.push(router.asPath);
  };

  const handleTagPriorityDown = async (id: string) => {
    await axios.patch(`/api/tags/${id}`, {
      priority: false,
    });
    router.push(router.asPath);
  };

  return {
    handleTagDelete,
    handleTagEdit,
    handleTagPriorityUp,
    handleTagPriorityDown,
  };
};

export default useTagHandler;
