export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}


export enum Gender {
  male = "male",
  female = "female",
  other = "other"

}

export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export type PatientSafe = Omit<Patient, "ssn">;
export type NewPatient = Omit<Patient, "id">;
