import { z } from "zod";

export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3
}

export enum Gender {
  male = "male",
  female = "female",
  other = "other"
}


const DiagnosisSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});


const BaseEntrySchema = {
  id: z.string(),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional()
}


export const EntrySchema = z.discriminatedUnion("type", [
  z.object({
    ...BaseEntrySchema,
    type: z.literal('Hospital'),
    discharge: z.object({
      date: z.string(),
      criteria: z.string()
    })
  }),
  z.object({
    type: z.literal('OccupationalHealthcare'),
    ...BaseEntrySchema,
    employerName: z.string(),
    sickLeave: z.object({
      startDate: z.string(),
      endDate: z.string()
    }).optional()

  }),
  
  z.object({
    type: z.literal('HealthCheck'),
    ...BaseEntrySchema,
    healthCheckRating: z.nativeEnum(HealthCheckRating)
  }),
]);

const PatientSchema = z.object({
  id: z.string(), 
  name: z.string(),
  ssn: z.string(),
  occupation: z.string(),
  gender: z.nativeEnum(Gender),
  dateOfBirth: z.string().date(),
  entries: z.array(EntrySchema).optional()
})

export type Diagnosis = z.infer<typeof DiagnosisSchema>;
export type Patient = z.infer<typeof PatientSchema>
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export type PatientSafe = Omit<Patient, "ssn">;
export type NewPatient = Omit<Patient, "id">;