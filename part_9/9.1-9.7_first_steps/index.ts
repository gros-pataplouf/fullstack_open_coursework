import express from "express";
import calcBmi from "./bmiCalculatorWeb";
import { BmiMessage } from "./bmiCalculatorWeb";
import { calculateExercisesWeb } from "./exerciseCalculatorWeb";

const app = express();

app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/bmi", (req, res) => {
  const result: BmiMessage = calcBmi(req.query);
  if (result.error) {
    res.statusCode = 400;
    return res.send(result.error);
  }
  return res.send(calcBmi(req.query).message);
});

app.post("/exercise", (req, res): object => {
  //   eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {
    daily_exercises,
    target,
  }: { daily_exercises: number[]; target: number } = req.body;
  //validate data
  if (!target || !daily_exercises) {
    return res.status(400).send({ error: "parameters missing" });
  }
  for (const item of daily_exercises) {
    if (isNaN(Number(item)) || isNaN(Number(target))) {
      return res.status(400).send({ error: "malformatted parameters" });
    }
  }
  return res.status(200).send(calculateExercisesWeb(daily_exercises, target));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
