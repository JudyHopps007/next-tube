import axios from 'axios';
import { useRouter } from 'next/router';

const useTagHandler = () => {
  const router = useRouter();
  const handleTagDelete = async (id: string) => {
    await axios.post('/api/tags/delete', { id: id });
    router.push(router.asPath);
  };

  const handleTagEdit = async (id: string) => {
    console.log(id);
  };

  const handleTagPriorityUp = async (id: string) => {
    await axios.post('/api/tags/change-priority', {
      id: id,
      newPriority: true,
    });
    router.push(router.asPath);
  };

  const handleTagPriorityDown = async (id: string) => {
    await axios.post('/api/tags/change-priority', {
      id: id,
      newPriority: false,
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
