import { Patient } from '../../types'


interface PatientProps {
  patient? : Patient | null;
}

function PatientDetail(props: PatientProps) {
  const {patient} = props;

  return (
    <div>
      <h1>Patient detail</h1>
      <p>{patient?.name}</p>
      <p>{patient?.gender}</p>
      <p>{patient?.occupation}</p>
      <p>{patient?.dateOfBirth}</p>
      <p>{patient?.ssn}</p>
    </div>
  )
}

export default PatientDetail