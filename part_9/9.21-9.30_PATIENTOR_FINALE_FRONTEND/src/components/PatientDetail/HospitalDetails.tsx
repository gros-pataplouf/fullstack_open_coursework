import React from 'react'
import { HospitalEntry } from '../../types'

function HospitalDetails(entry: HospitalEntry) : React.JSX.Element {
  return (
    <>
    <p>Discharge date: {entry.discharge?.date}</p>
    <p>Discharge decision: {entry.discharge?.criteria}</p>
    </>
  )
}

export default HospitalDetails