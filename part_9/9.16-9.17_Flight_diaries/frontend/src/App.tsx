import React, { useState, useEffect } from "react";
import { DiaryEntry } from "./types";
import diaryService from "./services/diaries"

function App(): React.JSX.Element {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])
  useEffect(() => {
    diaryService.getAll()
    .then(res => setDiaryEntries(res));
  }, [])
  return (
    <>
      <h1>Flight diaries</h1>
      {diaryEntries.map(entry => {
        return (
        <div key={entry.id}>
          <p>Date : {entry.date}</p>
          <p>Visibility: {entry.visibility}</p>
          <p>Weather: {entry.weather}</p>
          <p>Remarks: {entry.comment}</p>
          <hr />
        </div>
        )
      })}
      

    </>
  );
}

export default App;
