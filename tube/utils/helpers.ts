export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const slugify = (str: string) => {
  const badChars = '#!?;./`´§%&)(/$,:+';
  for (let c of badChars) {
    str = str.replaceAll(c, '');
  }
  str = str.trim().toLowerCase().replaceAll(' ', '-').replace(/-+/g, '-');
  return str;
};
