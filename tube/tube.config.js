const sharedConfig = {
  videosLimit: 40,
  tagsLimit: 15,
  maxPage: 5,
};

module.exports = {
  /** Routes **/
  routes: {
    index: 'index',
    video: 'video',
    tag: 'tag',
    category: 'category',
    model: 'model',
    toplist: 'models',
  },
  /** Index Page **/
  index: {
    randomVideosLimit: 40,
    tagsLimit: 15,
    categoriesSectionRole: 'category',
    categoriesSectionLimit: 20,
  },
  /** Video Page **/
  video: {
    relatedVideosLimit: 40,
  },
  /** Tag Page **/
  tag: {
    ...sharedConfig,
  },
  /** Category Page **/
  category: {
    ...sharedConfig,
  },
  /** Model Page **/
  model: {
    ...sharedConfig,
  },
  /** Toplist Page **/
  toplist: {
    listLimit: 100,
    role: 'model',
  },
};
