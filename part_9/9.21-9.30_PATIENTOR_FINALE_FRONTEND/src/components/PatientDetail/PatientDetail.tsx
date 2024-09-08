import { Patient, Gender } from '../../types'
import EntryDetails from './EntryDetails';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';


interface PatientProps {
  patient? : Patient | null;
}

function PatientDetail(props: PatientProps) {
  const {patient} = props;

  return (
    <div>
      <h1>Patient detail</h1>
      <p>{patient?.name}</p>
      <p>{patient?.gender === Gender.Male ? <MaleIcon/> : <FemaleIcon/> }</p>
      <p>{patient?.occupation}</p>
      <p>{patient?.dateOfBirth}</p>
      <p>{patient?.ssn}</p>
      <>
      {patient?.entries?.map(entry => <EntryDetails entry={entry}/>)}
      </>


    </div>
  )
}

export default PatientDetail