import axios from 'axios';
import { useRouter } from 'next/router';
import { KeywordRole } from 'types/types';

const useKeywordAPI = () => {
  const router = useRouter();
  const keywordDelete = async (id: number) => {
    await axios.delete(`/api/keywords/${id}`);
    router.push(router.asPath);
  };

  const keywordEdit = async (id: number, data: any) => {
    await axios.patch(`/api/keywords/${id}`, data);
    router.push(router.asPath);
  };

  const keywordChangeRole = async (id: number, newRole: KeywordRole) => {
    await axios.patch(`/api/keywords/${id}`, {
      role: newRole,
    });
    router.push(router.asPath);
  };

  const keywordAdd = async (data: any) => {
    const result = await axios.post('/api/keywords', data);
    return result.data;
  };

  return {
    keywordDelete,
    keywordEdit,
    keywordChangeRole,
    keywordAdd,
  };
};

export default useKeywordAPI;
