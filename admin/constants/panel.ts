export const PANEL_CONSTANTS = {
  VIDEOS_TABLE_TITLES: [
    'Id',
    'Video',
    'Plattform',
    'Tags / Categories / Models',
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
  FEEDBACKS_TABLE_TITLES: ['Subject', 'E-Mail'],
  FEEDBACKS_PER_PAGE: 50,
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
    label: 'Model',
    query: 'model',
  },
];

export const ADD_TAG_STEPSIZE = 10;
export const ADD_KEYWORD_STEPSIZE = 10;

export const FEEDBACK_SUBJECTS = {
  broken: 'Broken Video',
  copyright: 'DMCA / Copyright Infringement',
  age: 'Inappropriate content',
  others: 'Support / Feedback',
};
