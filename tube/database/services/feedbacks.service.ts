import Feedbacks from '@db/models/feedbacks.model';
import { NextApiRequest } from 'next';

export const addFeedback = async (req: NextApiRequest) => {
  try {
    const { message, email, subject } = req.body;

    if (!message || message.length < 1) {
      throw "Message can't be empty!";
    }

    if (!email || email.length < 1 || !email.includes('@')) {
      throw 'E-Mail is not valid!';
    }

    if (!subject) {
      throw 'A subject is needed!';
    }

    const feedback = new Feedbacks({
      id: 1,
      subject,
      email,
      message,
    });
    await feedback.save();
    return feedback;
  } catch (err: any) {
    throw err;
  }
};
