import { Entry, Diagnosis } from "../../types";
import diagnosisService from "../../services/diagnosis";
import DiagnosisDetails from "./DiagnosisDetails";
import BaseEntryDetails from "./BaseEntryDetails";
import HealthCheckDetails from "./HealthCheckDetails";
import HospitalDetails from "./HospitalDetails";
import OccupationalDetails from "./OccupationalDetails";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ChecklistIcon from '@mui/icons-material/Checklist';
import BusinessIcon from '@mui/icons-material/Business';



import { useEffect, useState } from "react";

interface EntryProps {
    entry: Entry;
}


function EntryDetails(props: EntryProps) {
  const {entry} = props;
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  useEffect(() => {
    const getDiagnosis = async () => {
      const diagArray = await diagnosisService.getAll();
      console.log(diagArray);
      setDiagnosis(diagArray);
    };
    getDiagnosis();
  }, []);

  switch(entry.type) {
    case 'HealthCheck':
      console.log(entry)
      return (
        <BaseEntryDetails entry={entry}>
        <ChecklistIcon />
        <ul>
        {entry.diagnosisCodes?.map(code => <DiagnosisDetails key={code} diagnosis={diagnosis.find(diag => diag.code === code)}/>)}
        </ul>

        <HealthCheckDetails {...entry} />
        </BaseEntryDetails>
      );
    case 'OccupationalHealthcare':
      return (
        <BaseEntryDetails entry={entry}>
        <BusinessIcon />
        <ul>
        {entry.diagnosisCodes?.map(code => <DiagnosisDetails key={code} diagnosis={diagnosis.find(diag => diag.code === code)}/>)}
        </ul>

        <OccupationalDetails {...entry} />
        </BaseEntryDetails>
      );
    case 'Hospital':
      return (
        <BaseEntryDetails entry={entry}>
        <LocalHospitalIcon />
        <p>Diagnosis</p>
        <ul>
        {entry.diagnosisCodes?.map(code => <DiagnosisDetails key={code} diagnosis={diagnosis.find(diag => diag.code === code)}/>)}
        </ul>
        <HospitalDetails {...entry} />
        </BaseEntryDetails>
      );
    default:
      return (
        <>
        <p>problem</p>
        {/* <p>{entry.date}</p>
        <p>{entry.description}</p>
        <ul>
          {entry.diagnosisCodes?.map(code => <DiagnosisDetails key={code} diagnosis={diagnosis.find(diag => diag.code === code)}/>)}
        </ul> */}
        </>
      )

  }


;
}

export default EntryDetails;
