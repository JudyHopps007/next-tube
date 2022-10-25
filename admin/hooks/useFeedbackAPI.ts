import axios from 'axios';

const useFeedbackAPI = () => {
  const feedbackHasSeen = async (id: number) => {
    await axios.patch(`/api/feedbacks/${id}`);
  };
  return {
    feedbackHasSeen,
  };
};

export default useFeedbackAPI;
