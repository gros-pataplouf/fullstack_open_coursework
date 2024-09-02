import React, { SyntheticEvent } from "react";
import { useState } from "react";
import { InitialForm, DiaryForm } from "../types";
import diaryService from "../services/diaries";
import { Weather, Visibility } from "../types";

function parse(
  input: any,
  kind: "weather" | "visibility" | "comment" | "date"
): string {
  console.log(input, kind)
  switch (kind) {
    case "weather":
      if (Object.values(Weather).includes(input)) {
        return input;
      } else {
        throw new Error("Invalid value for weather");
      }
    case "visibility":
      if (Object.values(Visibility).includes(input)) {
        return input;
      } else {
        throw new Error("Invalid value for visibility");
      }
    case "comment":
      if (typeof input == "string") {
        return input;
      } else {
        throw new Error("Invalid value for comment");
      }
    case "date":
      if (!isNaN(Date.parse(input))) {
        return input;
      } else {
        throw new Error("Invalid value for date");
      }
    default:
      throw new Error("Invalid key");
  }
}

function Form(): React.JSX.Element {
  const initialState: InitialForm = {
    date: undefined,
    weather: undefined,
    visibility: undefined,
    comment: undefined,
  };
  const [newEntry, setNewEntry] = useState<InitialForm>(initialState);
  function handleChange(e: SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    const key = target.name;
    if (
      key === "weather" ||
      key === "date" ||
      key === "visibility" ||
      key === "comment"
    ) {
      const value = target.value;
      setNewEntry({ ...initialState, [key]: value });
    } else {
      throw new Error("invalid fields in source file");
    }
  }

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const newDiaryEntry: DiaryForm = {
      weather: parse(newEntry, "weather") as Weather,
      visibility: parse(newEntry, "visibility") as Visibility,
      comment: parse(newEntry, "comment"),
      date: parse(newEntry, "date"),
    };

    diaryService.create(newDiaryEntry);
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="date">date</label>
      <input
        type="date"
        name="date"
        id="date"
        value={newEntry.date}
        onChange={handleChange}
      />
      <label htmlFor="weather">weather</label>
      <input
        type="text"
        name="weather"
        id="weather"
        value={newEntry.weather}
        onChange={handleChange}
      />
      <label htmlFor="visibility">visibility</label>
      <input
        type="text"
        name="visibility"
        id="visibility"
        value={newEntry.visibility}
        onChange={handleChange}
      />
      <label htmlFor="comment">comment</label>
      <input
        type="text"
        name="comment"
        id="comment"
        value={newEntry.comment}
        onChange={handleChange}
      />
      <button>submit</button>
    </form>
  );
}

export default Form;
