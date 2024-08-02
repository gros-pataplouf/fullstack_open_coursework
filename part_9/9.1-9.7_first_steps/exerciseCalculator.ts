interface result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function calculateExercices(): result | void {
  const data: string[] = process.argv.slice(2);
  const errors: string[] = data.filter((_) => isNaN(Number(_)));
  if (data.length < 2) {
    throw new Error("You must enter at least two numbers.");
  }
  if (errors.length) {
    throw new Error("Please only enter numbers.");
  } else {
    try {
      const dataAsNumbers: number[] = data.map((arg) => Number(arg));
      const target: number = dataAsNumbers[0];
      const week: number[] = dataAsNumbers.slice(1);
      const trainingHours: number = week.reduce((a, b) => a + b);
      const periodLength = week.length;
      const trainingDays = week.filter((hours) => hours > 0).length;
      const average: number = trainingHours / week.length;
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
    } catch (error: unknown) {
      const errorMessage = "Something bad happened";
      if (error instanceof Error) {
        throw new Error(`${errorMessage} ${error}`);
      }
    }
  }
}

calculateExercices();
