export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const isEmpty = (val: any) => {
  return val === undefined || val == null || val.length <= 0 ? true : false;
};

export const slugify = (str: string) => {
  str = str
    .trim()
    .toLowerCase()
    .replaceAll(' ', '-')
    .replaceAll('.', '-')
    .replace(/-+/g, '-');
  return str;
};
