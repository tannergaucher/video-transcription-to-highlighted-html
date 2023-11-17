export type CloudTranscriptionResponse = {
  results: Result[];
};

type Result = {
  alternatives: Alternative[];
  languageCode: string;
  resultEndTime: string;
};

type Alternative = {
  confidence: number;
  words: Word[];
  transcript: string;
};

type Word = {
  word: string;
  confidence: number;
  startTime: string;
  endTime: string;
};

type FormattedWord = {
  word: string;
  startTime: number;
  endTime: number;
};

export function getWordsFromTranscription(
  res: CloudTranscriptionResponse
): FormattedWord[] {
  const words: FormattedWord[] = [];

  res.results.forEach((result) => {
    result.alternatives.forEach((alternative) => {
      alternative.words.forEach((word) => {
        words.push({
          word: word.word,
          startTime: parseFloat(word.startTime.replace("s", "")),
          endTime: parseFloat(word.endTime.replace("s", "")),
        });
      });
    });
  });

  return words;
}
