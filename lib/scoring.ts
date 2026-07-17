export function normalizeAnswer(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(",", ".");
}

export function calculateAccuracy(
  type: string,
  correct: string,
  answer: string
): number {

  if (!answer) return 0;

  correct = normalizeAnswer(correct);
  answer = normalizeAnswer(answer);

  switch (type) {

    case "sim_nao":
    case "pessoa":
      return correct === answer ? 100 : 0;

    case "numero":
    case "valor": {

      const correctNumber = Number(correct);
      const answerNumber = Number(answer);

      if (isNaN(correctNumber) || isNaN(answerNumber))
        return 0;

      if (correctNumber === answerNumber)
        return 100;

      if (correctNumber === 0)
        return 0;

      const difference = Math.abs(
        answerNumber - correctNumber
      );

      const percentage =
        (difference / Math.abs(correctNumber)) * 100;

      return Math.max(
        0,
        Number((100 - percentage).toFixed(2))
      );
    }

    case "hora": {

      const [correctHour, correctMinute] =
        correct.split(":").map(Number);

      const [answerHour, answerMinute] =
        answer.split(":").map(Number);

      if (
        isNaN(correctHour) ||
        isNaN(correctMinute) ||
        isNaN(answerHour) ||
        isNaN(answerMinute)
      ) {
        return 0;
      }

      const correctTotal =
        correctHour * 60 + correctMinute;

      const answerTotal =
        answerHour * 60 + answerMinute;

      const difference = Math.abs(
        answerTotal - correctTotal
      );

      return Math.max(
        0,
        Number((100 - difference).toFixed(2))
      );
    }

    default:
      return 0;

  }
}

export function calculatePoints(
  maxPoints: number,
  accuracy: number
): number {

  return Number(
    (maxPoints * accuracy / 100).toFixed(2)
  );

}