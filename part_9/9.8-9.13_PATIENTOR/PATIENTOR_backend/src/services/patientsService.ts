import patientsData from "../data/patients";
import { PatientSafe, Patient, NewPatient } from "../types/types";
import { v1 as uuid } from "uuid";

const patients: Patient[] = patientsData as Patient[];

const getPatientsSafe = (): PatientSafe[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

const createPatient = (object: NewPatient): Patient | void => {
  console.log(object);
  const id: string = uuid();
  patientsData.push({ id, ...object });
};

export default {
  getPatientsSafe,
  createPatient,
};
