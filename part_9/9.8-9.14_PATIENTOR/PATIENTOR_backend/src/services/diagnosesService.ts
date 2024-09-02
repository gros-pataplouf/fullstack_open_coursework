import { diagnosesData } from "../data/diagnoses";
import { Diagnose } from "../types/types";

const diagnoses: Diagnose[] = diagnosesData;

const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

export default {
  getDiagnoses,
};
