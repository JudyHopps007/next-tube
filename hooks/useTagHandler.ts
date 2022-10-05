const useTagHandler = () => {
  const handleTagDelete = async (id: string) => {
    console.log(id);
  };

  const handleTagEdit = async (id: string) => {
    console.log(id);
  };

  const handleTagPriorityUp = async (id: string) => {
    console.log(id);
  };

  const handleTagPriorityDown = async (id: string) => {
    console.log(id);
  };

  return {
    handleTagDelete,
    handleTagEdit,
    handleTagPriorityUp,
    handleTagPriorityDown,
  };
};

export default useTagHandler;
