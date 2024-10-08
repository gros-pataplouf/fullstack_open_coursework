import { z } from "zod";
import { Gender, EntrySchema, Entry } from "./types/types";


const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(EntrySchema).optional()
});

export const toNewPatient = (object: unknown): z.infer<typeof NewPatientSchema> => {
    return NewPatientSchema.parse(object);
};


export const toNewEntry = (object: unknown): Entry => {
  return EntrySchema.parse(object);
}