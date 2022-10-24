import { connectToDbHandler } from '@db/database';
import { addTag, tagExists } from '@db/services/tags.service';
import { generateTagId } from '@db/utils/helper';
import { NextApiRequest, NextApiResponse } from 'next';
import { hasSession } from 'utils/auth';
import { getRelatedImage, getRelatedTags } from 'utils/parser';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!(await hasSession(req))) {
      return res.status(400).json({ message: 'API Error - No Auth' });
    }
    if (req.method === 'POST') {
      const { role, tags, parseRelated, parseImage } = req.body;
      const totalTags = tags.length;
      let addedTags = 0;
      for (let tag of tags) {
        let relatedTags = [] as string[];
        let isParsed = false;

        if (!(await tagExists(generateTagId(tag)))) {
          if (parseRelated) {
            relatedTags = await getRelatedTags(generateTagId(tag));
            isParsed = true;
          }

          let originalImage = '';
          if (parseImage) {
            originalImage = await getRelatedImage(generateTagId(tag));
          }

          const newTag = await addTag({
            name: tag,
            role,
            relatedTags,
            originalImage,
            isParsed,
          });

          addedTags++;
        }
      }
      return res
        .status(200)
        .send({ errors: totalTags - addedTags, success: addedTags });
    }
  } catch (err: any) {
    return res.status(400).json({
      message: `API Error ${err.message || 'Unknown error'}`,
    });
  }
  return res.status(400).json({ message: 'API Error' });
};

export default connectToDbHandler(handler);
