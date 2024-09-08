import React from "react";
import { Diagnosis } from "../../types";

interface DiagnosisProps {
  diagnosis: Diagnosis | undefined;
}

function DiagnosisDetails(props: DiagnosisProps) : React.JSX.Element {
  const { diagnosis } = props;
  console.log(diagnosis, "Diagnosis")
  return <li>{diagnosis?.code} <span>{diagnosis?.name}</span></li>;
}

export default DiagnosisDetails;
