export function calculateExercisesWeb(
  daily_exercises: number[],
  target: number,
): object {
  const trainingHours: number = daily_exercises.reduce((a, b) => a + b);
  const periodLength = daily_exercises.length;
  const trainingDays = daily_exercises.filter((hours) => hours > 0);
  const average: number = trainingHours / daily_exercises.length;
  const success: boolean = average - target >= 0;
  let rating: number;
  if (average / target > 2) {
    rating = 3;
  } else if (average / target > 0.9) {
    rating = 2;
  } else {
    rating = 1;
  }
  rating == 0 ? (rating += 1) : rating;
  const ratingDescriptions: [string, string, string] = [
    "lazy ass",
    "ok",
    "fantastic",
  ];
  const ratingDescription = ratingDescriptions[rating - 1];

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}
