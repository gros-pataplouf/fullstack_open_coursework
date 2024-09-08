import { Entry } from "../../types"

interface EntryProps {
    entry: Entry;
}


function EntryDetails(props: EntryProps) {
  const {entry} = props;
  return (
    <>
    <p>{entry.date}</p>
    <p>{entry.description}</p>
    <ul>
      {entry.diagnosisCodes?.map(code => <li key={code}>{code}</li>)}
    </ul>
    </>


  )
}

export default EntryDetails
