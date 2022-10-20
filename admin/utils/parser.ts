import { MAX_RELATED_TAGS, IMAGE_TUBES } from 'constants/parser';
import { TUBES, parser } from 'tube-utils';
import { randomImageId } from './helpers';

const getRandomTube = (tubes: TUBES[]) => {
  return tubes[Math.floor(Math.random() * tubes.length)];
};

const randomizeImage = (tube: TUBES, image: string) => {
  if (tube === TUBES.XNXX || tube === TUBES.XVIDEOS)
    return randomImageId(image);
  return image;
};

export const getRelatedTags = async (keyword: string) => {
  const relatedTags = await parser.getRelatedKeywords(keyword, [
    TUBES.XVIDEOS,
    TUBES.XNXX,
    TUBES.XHAMSTER,
  ]);

  if (relatedTags.length === 0) return [];

  const result = relatedTags
    .map((tag, i) => {
      if (i < MAX_RELATED_TAGS) return tag.keyword;
      return '';
    })
    .filter((tag) => tag !== '');

  return result;
};

export const getRelatedImage = async (keyword: string) => {
  const tubeSource = getRandomTube(IMAGE_TUBES);
  const page = Math.floor(Math.random() * 5) + 1;
  const searchResults = await parser.parseSearch(tubeSource, keyword, page);

  if (searchResults.videos.length === 0) return '';

  const result =
    searchResults.videos[
      Math.floor(Math.random() * searchResults.videos.length)
    ];
  if (!result.poster) {
    const video = await parser.parseVideo(tubeSource, result.id);
    return randomizeImage(tubeSource, video.poster);
  }
  return randomizeImage(tubeSource, result.poster);
};
