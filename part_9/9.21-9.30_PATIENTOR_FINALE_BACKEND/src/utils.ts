import { z } from "zod";
import { NewPatient } from "./types/types";
import { Gender } from "./types/types";

const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string()


});

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect of missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    return newPatientSchema.parse(object);
  } else {
    throw new Error("Incorrect data: some fields are missing");
  }
};
