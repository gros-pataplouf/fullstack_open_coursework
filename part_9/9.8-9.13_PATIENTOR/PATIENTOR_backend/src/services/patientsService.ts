import patientsData from "../data/patients";
import { toNewPatient } from "../utils";
import { PatientSafe, Patient, NewPatient } from "../types/types";
import { v1 as uuid } from "uuid";

const patients: Patient[] = patientsData as Patient[];

const getPatientsSafe = (): PatientSafe[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

const createPatient = (object: unknown): Patient | void => {
  const newPatient : NewPatient = toNewPatient(object);
  const id: string = uuid();
  patientsData.push({ id, ...newPatient });
};

export default {
  getPatientsSafe,
  createPatient,
};
