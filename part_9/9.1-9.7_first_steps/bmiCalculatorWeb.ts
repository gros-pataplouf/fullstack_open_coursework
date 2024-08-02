import { ParsedQs } from "qs";

export interface BmiMessage {
  message: string | null;
  error: string | null;
}

// look up human friendly meaning of bmi
function bmiReference(x: number): string {
  if (x < 18) {
    return "underweight";
  } else if (x < 25) {
    return "normal (healthy weight)";
  } else if (x < 30) {
    return "obese";
  } else return "severely obese";
}

export default function calcBmi(params: ParsedQs): BmiMessage {
  if (
    isNaN(Number(params.height)) ||
    isNaN(Number(params.weight)) ||
    !params.height ||
    !params.weight
  ) {
    return { message: null, error: "malformatted parameters" };
  }
  const bmiResult = Number(params.weight) / (Number(params.height) / 100) ** 2;
  return {
    error: null,
    message: `Your BMI is ${bmiResult}, which means you are ${bmiReference(
      bmiResult,
    )}`,
  };
}
