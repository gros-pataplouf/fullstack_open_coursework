import axios from "axios";
import { Patient, Entry, PatientFormValues, EntryFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );
  return data;
};

const getOne = async (id: string) => {
  const patient = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );
  return patient;

};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    {...object, entries: []}
  );

  return data;
};

const addEntry = async (id: string, object: EntryFormValues) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );

  return data;
};


export default {
  getAll, create, getOne, addEntry
};

