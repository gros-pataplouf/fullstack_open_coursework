import { z } from "zod";

export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
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

const HospitalEntrySchema =   z.object({
  ...BaseEntrySchema,
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.string(),
    criteria: z.string()
  })
})

const OccupationalHealthcareSchema =   z.object({
  type: z.literal('OccupationalHealthcare'),
  ...BaseEntrySchema,
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string(),
    endDate: z.string()
  }).optional()

})

const HealthCheckSchema =   z.object({
  type: z.literal('HealthCheck'),
  ...BaseEntrySchema,
  healthCheckRating: z.nativeEnum(HealthCheckRating)
})


export const EntrySchema = z.discriminatedUnion("type", [
  HospitalEntrySchema,
  OccupationalHealthcareSchema,
  HealthCheckSchema
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
export type Patient = z.infer<typeof PatientSchema>;
export type Entry = z.infer<typeof EntrySchema>;
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export type PatientSafe = Omit<Patient, "ssn">;
export type NewPatient = Omit<Patient, "id">;
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type NewEntry = UnionOmit<Entry, 'id'>;