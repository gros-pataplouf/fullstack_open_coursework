import { NewPatient } from "./types/types";

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
  const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

const parseString = (input: unknown, inputName: string) : string => {
    if (!input || !isString(input)) {
        throw new Error(`${inputName} must be a string!`)
    }
    return input;

}


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
    const newPatient : NewPatient = {
        name: parseString(object.name, 'name'),
        dateOfBirth : parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn, 'ssn'),
        gender: parseString(object.gender, 'gender'),
        occupation: parseString(object.occupation, 'occupation')
    }
    return newPatient;

  } else {
    throw new Error("Incorrect data: some fields are missing");
  }


};
