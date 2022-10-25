import Feedbacks from '@db/models/feedbacks.model';

export const getFeedback = async (id: number) => {
  try {
    const feedback = await Feedbacks.findOne({ id: id });
    if (!feedback) throw new Error(`feedback with id ${id} not found.`);
    return feedback;
  } catch (error) {
    throw error;
  }
};

export const updateFeedback = async (id: number, body: any) => {
  try {
    const feedback = await Feedbacks.findOneAndUpdate(
      { id: id },
      { $set: body }
    );
    if (!feedback) throw new Error(`Feedback with id ${id} not found.`);
    return feedback;
  } catch (error) {
    throw error;
  }
};

export const getFeedbacks = async (
  page: number,
  limit: number,
  select: any = {},
  sort: any = { createdAt: -1 }
) => {
  try {
    const skip = page * limit - limit;
    const feedbacks = Feedbacks.find()
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select(select);
    return feedbacks;
  } catch (error) {
    throw error;
  }
};

export const countFeedbacks = async () => {
  const count = await Feedbacks.countDocuments();
  return count;
};
