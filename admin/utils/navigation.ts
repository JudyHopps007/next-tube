export const calculateMinItemPerPage = (
  page: number,
  itemPerPage: number,
  totalItems: number
) => {
  if (totalItems === 0) return totalItems;
  return page === 1 ? page : (page - 1) * itemPerPage + 1;
};

export const calculateMaxItemPerPage = (
  page: number,
  itemPerPage: number,
  totalItems: number
) => {
  if (page === 1) {
    const items = page * itemPerPage;
    if (items > totalItems) return totalItems;
    return items;
  } else {
    const items = page * itemPerPage;
    if (items > totalItems) return totalItems;
    return items;
  }
};
