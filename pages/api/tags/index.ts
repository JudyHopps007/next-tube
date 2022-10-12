import { connectToDbHandler } from 'database/database';
import { addTag, tagExists } from 'database/services/tags.service';
import { generateTagId } from 'database/utils/helper';
import { NextApiRequest, NextApiResponse } from 'next';
import { getRelatedImage, getRelatedTags } from 'utils/parser';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const { role, name, parseRelated, parseImage } = req.body;
      if (await tagExists(generateTagId(name))) {
        return res.status(200).send({ exists: true });
      }

      let relatedTags = [] as string[];
      let isParsed = false;

      if (parseRelated) {
        relatedTags = await getRelatedTags(generateTagId(name));
        isParsed = true;
      }

      let image = '';
      if (parseImage) {
        image = await getRelatedImage(generateTagId(name));
      }

      const tag = await addTag({ name, role, relatedTags, image, isParsed });
      return res.status(200).send(tag);
    }
  } catch (err: any) {
    return res.status(400).json({
      message: `API Error ${err.message || 'Unknown error'}`,
    });
  }
  return res.status(400).json({ message: 'API Error' });
};

export default connectToDbHandler(handler);
