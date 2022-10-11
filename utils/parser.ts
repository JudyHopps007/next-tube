import { TUBES, parser } from 'tube-utils';

const imageTubes = [
  //TUBES.XHAMSTER,
  TUBES.XNXX,
  TUBES.XVIDEOS,
  //TUBES.SPANKBANG,
  // TUBES.EPORNER,
];

const getRandomTube = (tubes: TUBES[]) => {
  return tubes[Math.floor(Math.random() * tubes.length)];
};

const randomizeImage = (tube: TUBES, image: string) => {
  if (tube === TUBES.XNXX || tube === TUBES.XVIDEOS) {
    const lastDot = image.lastIndexOf('.');
    const imageType = image.substring(lastDot);
    const beforeNumber = image.lastIndexOf('.', lastDot - 1);
    const imagePath = image.substring(0, beforeNumber + 1);
    const newImageIndex = Math.floor(Math.random() * 10) + 5;
    return (
      imagePath
        .replace('169poster', '169lll')
        .replace('xnxxposter', 'xnxxlll') +
      newImageIndex +
      imageType
    );
  }
  return image;
};

export const getRelatedImage = async (keyword: string) => {
  const tubeSource = getRandomTube(imageTubes);
  const page = Math.floor(Math.random() * 5) + 1;
  const searchResults = await parser.parseSearch(tubeSource, keyword, page);
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
