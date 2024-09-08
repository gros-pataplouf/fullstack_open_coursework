import patientsData from "../data/patients";
import { toNewPatient } from "../utils";
import { Patient, NewPatient, NonSensitivePatient } from "../types/types";
import { v1 as uuid } from "uuid";

const patients: Patient[] = patientsData as Patient[];

const getPatientsSafe = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, ssn, entries }) => {
    return { id, name, dateOfBirth, gender, occupation, ssn, entries };
  });
};

const createPatient = (object: unknown): Patient | void => {
  const newPatient : NewPatient = toNewPatient(object);
  const id: string = uuid();
  patientsData.push({ id, ...newPatient });
};

const getOneById = (id: string) : Patient | undefined => {
  return patients.find(patient => patient.id === id);
};


export default {
  getPatientsSafe,
  createPatient,
  getOneById
};
