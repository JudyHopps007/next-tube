export const formatTimeFull = (duration: number) => {
  if (duration <= 59 && duration <= 9) return `00:0${duration}`;
  if (duration <= 59) return `00:${duration}`;
  const seconds = duration % 60;
  return `${Math.floor(duration / 60)}:${
    seconds <= 9 ? '0' + seconds : seconds
  }`;
};

export const formatTimeLite = (duration: number, showSeconds = false) => {
  if (duration <= 59) return `${duration} sec`;
  return (
    `${Math.floor(duration / 60)} min` +
    (showSeconds ? ` ${duration % 60} sec` : '')
  );
};
