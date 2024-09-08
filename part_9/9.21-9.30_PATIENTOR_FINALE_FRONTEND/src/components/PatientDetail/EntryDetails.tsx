import { Entry, Diagnosis } from "../../types";
import diagnosisService from "../../services/diagnosis";
import DiagnosisDetails from "./DiagnosisDetails";

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
  return (
    <>
    <p>{entry.date}</p>
    <p>{entry.description}</p>
    <ul>
      {entry.diagnosisCodes?.map(code => <DiagnosisDetails key={code} diagnosis={diagnosis.find(diag => diag.code === code)}/>)}
    </ul>
    </>


  );
}

export default EntryDetails;
