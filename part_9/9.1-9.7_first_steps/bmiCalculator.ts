function bmiReference(x: number): string {
  if (x < 18) {
    return "Underweight";
  } else if (x < 25) {
    return "Normal (healthy weight)";
  } else if (x < 30) {
    return "Obese";
  } else return "Severely obese";
}

function calcBmiCLI(): string {
  const data: string[] = process.argv.slice(2);
  const errors: string[] = data.filter((_) => isNaN(Number(_)));
  if (data.length != 2) {
    throw new Error("Please enter exactly two numbers.");
  } else if (errors.length) {
    throw new Error("Please only enter numbers.");
  }
  const height: number = Number(data[0]);
  const weight: number = Number(data[1]);
  const bmi: number = weight / (height / 100) ** 2;
  return bmiReference(bmi);
}

console.log(calcBmiCLI());
