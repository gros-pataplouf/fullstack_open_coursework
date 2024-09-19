import { Patient, Gender } from '../../types';
import { useState } from 'react';
import EntryDetails from './EntryDetails';
import { Button } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import AddEntryModal from '../AddEntryModal/index';


interface PatientProps {
  patient? : Patient | null;
}

function PatientDetail(props: PatientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const {patient} = props;
  function toggleModal() {
    setModalOpen(!modalOpen)
  }
  function onSubmit() {

  }

  const error = "";
  function onClose() {
    
  }

  return (
    <div>
      <h1>Patient detail</h1>
      <p>{patient?.name}</p>
      <p>{patient?.gender === Gender.Male ? <MaleIcon/> : <FemaleIcon/> }</p>
      <p>{patient?.occupation}</p>
      <p>{patient?.dateOfBirth}</p>
      <p>{patient?.ssn}</p>

      {modalOpen ? <AddEntryModal modalOpen={modalOpen} onClose={onClose} onSubmit={onSubmit} error={error} /> : <Button style={{backgroundColor: "purple", color: "white", marginBottom: "10px" }} onClick={toggleModal}>New entry</Button>
    }


      <div>
      {patient?.entries?.map(entry => <EntryDetails key={entry.id} entry={entry}/>)}
      </div>


    </div>
  );
}

export default PatientDetail;