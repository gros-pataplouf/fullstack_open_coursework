import React from 'react'
import { OccupationalHealthcareEntry } from '../../types'

function OccupationalDetails(entry: OccupationalHealthcareEntry) : React.JSX.Element {
    console.log(entry);
  return (
    <>
    <p>Employer: {entry.employerName}</p>
    <p>Sickleave: {entry.sickLeave?.startDate} - {entry.sickLeave?.startDate} </p>
    </>
  )
}

export default OccupationalDetails

