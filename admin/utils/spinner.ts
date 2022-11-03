import spinenrData from 'constants/spinnerData.json';

const prepareSentence = (sentence: string) => {
  return (
    sentence
      .toString()
      .replace(/\s+/g, ' ') // Replace spaces with -
      //.replace(/[^\w\-]+/g, ' ') // Remove all non-word chars
      .replace(/\-\-+/g, ' ') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '')
  );
};

const charAtIsUpper = (str: string, atPos: number) => {
  var chr = str.charAt(atPos);
  return /[A-Z]|[\u0080-\u024F]/.test(chr) && chr === chr.toUpperCase();
};

export const spin = (sentence: string) => {
  const lowerSentence = prepareSentence(sentence);
  let res = [] as string[];
  const singleWords = lowerSentence.split(' ');
  singleWords.map((word) => {
    if (word.length >= 1 && !res.includes(word)) {
      res.push(word);
    }
  });

  let spinSentence = '';

  for (let word of res) {
    let spinWord = word;

    for (let data of spinenrData) {
      if (data.includes(word.toLowerCase())) {
        const number = Math.floor(Math.random() * 3) + 1;
        if (number === 1 || number === 3) {
          spinWord = data[Math.floor(Math.random() * data.length)];
          break;
        }
      }
    }
    spinSentence += `${
      charAtIsUpper(word, 0)
        ? spinWord.charAt(0).toUpperCase() + spinWord.slice(1)
        : spinWord
    } `;
  }
  spinSentence = spinSentence.trim();
  return spinSentence;
};
