import { PRE_PROCESSED_WORDS_ARR } from "./functions/preprocessed-words-arr";

document.addEventListener("DOMContentLoaded", function () {
  let currentWordIndex = 0;

  const audioSource = document.getElementById(
    "input-file"
  ) as HTMLAudioElement | null;

  if (!audioSource) {
    throw new Error("Audio source not found");
  }

  const interval = setInterval(() => {
    const currentTime = audioSource.currentTime;
    const currentWord = PRE_PROCESSED_WORDS_ARR[currentWordIndex];

    if (currentTime >= currentWord.startTime) {
      highlightWord(currentWordIndex);
    }

    if (currentTime >= currentWord.endTime) {
      currentWordIndex++;
    }

    if (currentWordIndex >= PRE_PROCESSED_WORDS_ARR.length) {
      clearInterval(interval);
    }
  }, 10);

  function highlightWord(currentWordIndex: number) {
    const wordSpan = document.getElementById(
      `${currentWordIndex}`
    ) as HTMLSpanElement | null;

    if (wordSpan?.getAttribute("current")) {
      return;
    }

    const previousWordSpan = document.getElementById(
      `${currentWordIndex - 1}`
    ) as HTMLSpanElement | null;

    if (previousWordSpan) {
      previousWordSpan.removeAttribute("current");
    }

    wordSpan?.setAttribute("current", "true");
  }
});
