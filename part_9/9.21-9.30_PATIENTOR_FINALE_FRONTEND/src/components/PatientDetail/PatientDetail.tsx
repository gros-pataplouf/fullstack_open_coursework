import { Patient, Gender } from '../../types';
import { useState } from 'react';
import axios from 'axios';
import EntryDetails from './EntryDetails';
import { Button } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import AddEntryModal from '../AddEntryModal/index';
import { EntryFormValues } from '../../types';
import patientService from '../../services/patients';

interface PatientProps {
  patient? : Patient | null;
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  patients: Patient[];
  
}

function PatientDetail(props: PatientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");
  const {patient, patients, setPatients} = props;
  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      if (patient?.id !== undefined) {
        const entry = await patientService.addEntry(patient.id, values);
        const newEntries = patient.entries?.concat(entry);
        const patientIndex = patients.indexOf(patient);
        setPatients(patients.splice(patientIndex, 1, {...patient, entries: newEntries}));

      }
      
      setModalOpen(false);

    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        setError("Unknown error");
      }
    }
  };
  

  function onClose() {
    setModalOpen(false);
    setError("");
    
  }

  return (
    <div>
      <h1>Patient detail</h1>
      <p>{patient?.name}</p>
      <p>{patient?.gender === Gender.Male ? <MaleIcon/> : <FemaleIcon/> }</p>
      <p>{patient?.occupation}</p>
      <p>{patient?.dateOfBirth}</p>
      <p>{patient?.ssn}</p>

      {modalOpen ? <AddEntryModal modalOpen={modalOpen} onClose={onClose} onSubmit={submitNewEntry} error={error} /> : <Button style={{backgroundColor: "purple", color: "white", marginBottom: "10px" }} onClick={toggleModal}>New entry</Button>
    }


      <div>
      {patient?.entries?.map(entry => <EntryDetails key={entry.id} entry={entry}/>)}
      </div>


    </div>
  );
}

export default PatientDetail;