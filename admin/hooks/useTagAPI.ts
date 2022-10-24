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
      isPriority: true,
    });
    router.push(router.asPath);
  };

  const tagPriorityDown = async (id: string) => {
    await axios.patch(`/api/tags/${id}`, {
      isPriority: false,
    });
    router.push(router.asPath);
  };

  const tagGet = async (id: string) => {
    const tag = await axios.get(`/api/tags/${id}`);
    return tag.data;
  };

  const tagRandomImage = async (name: string) => {
    const result = await axios.get(`/api/parser/image?keyword=${name}`);
    const { image } = result.data;
    return image;
  };

  const tagRelated = async (name: string) => {
    const result = await axios.get(`/api/parser/tags?keyword=${name}`);
    const { relatedTags } = result.data;
    return relatedTags;
  };

  const tagAdd = async (data: any) => {
    const result = await axios.post('/api/tags', data);
    return result.data;
  };

  return {
    tagDelete,
    tagEdit,
    tagPriorityUp,
    tagPriorityDown,
    tagGet,
    tagRandomImage,
    tagRelated,
    tagAdd,
  };
};

export default useTagAPI;
