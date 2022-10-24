export const PANEL_CONSTANTS = {
  VIDEOS_TABLE_TITLES: [
    'Id',
    'Video',
    'Plattform',
    'Tags / Categories / Actors',
    'Actions',
  ],
  VIDEOS_PER_PAGE: 50,
  TAGS_TABLE_TITLES: ['Id', 'Name', 'Status', 'Related Tags', 'Actions'],
  TAGS_PER_PAGE: 50,
  KEYWORDS_TABLE_TITLES: [
    'Id',
    'Name',
    'Status',
    'Message',
    'Videos Added',
    'Actions',
  ],
  KEYWORDS_PER_PAGE: 50,
};

export const TAG_ROLES_DROPDOWN = [
  {
    label: 'Tag',
    query: 'tag',
  },
  {
    label: 'Category',
    query: 'category',
  },
  {
    label: 'Actor',
    query: 'actor',
  },
];

export const ADD_TAG_STEPSIZE = 10;
export const ADD_KEYWORD_STEPSIZE = 10;
