import React, { SyntheticEvent } from "react";
import axios from "axios";
import { useState } from "react";
import { InitialForm, DiaryForm, FormProps } from "../types";
import diaryService from "../services/diaries";
import { Weather, Visibility } from "../types";

function parse(
  input: InitialForm,
  kind: "weather" | "visibility" | "comment" | "date"
): string {
  switch (kind) {
    case "weather":
      if (Object.values(Weather).includes(input.weather)) {
        return input.weather;
      } else {
        throw new Error("Invalid value for weather");
      }
    case "visibility":
      if (Object.values(Visibility).includes(input.visibility)) {
        return input.visibility;
      } else {
        throw new Error("Invalid value for visibility");
      }
    case "comment":
      if (typeof input.comment == "string") {
        return input.comment;
      } else {
        throw new Error("Invalid value for comment");
      }
    case "date":
      if (!isNaN(Date.parse(input.date))) {
        return input.date;
      } else {
        throw new Error("Invalid value for date");
      }
    default:
      throw new Error("Invalid key");
  }
}

function Form(props: FormProps): React.JSX.Element {
  const { setNotification, setDiaryEntries, diaryEntries } = props;
  const initialState: InitialForm = {
    date: "2024-09-01",
    weather: Weather.Sunny,
    visibility: Visibility.Great,
    comment: "",
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
      setNewEntry({ ...newEntry, [key]: value });
    } else {
      throw new Error("invalid fields in source file");
    }
  }

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    try {
      const newDiaryEntry: DiaryForm = {
        weather: parse(newEntry, "weather") as Weather,
        visibility: parse(newEntry, "visibility") as Visibility,
        comment: parse(newEntry, "comment"),
        date: parse(newEntry, "date"),
      };
      (async () => {
        await diaryService.create(newDiaryEntry);
      })()
        .then((res) => {
          if (res !== undefined) {
            setDiaryEntries([...diaryEntries, res]);
          } else {
            throw new Error("undefined error");
          }
        })
        .catch((error: unknown) => {
          if (axios.isAxiosError(error)) {
            if (typeof error.response?.data === "string") {
              setNotification(error.response?.data);
            } else {
              setNotification("unknown error");
            }
          }
        });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setNotification(error.message);
      }
    }
    setTimeout(() => {
      setNotification("");
      setNewEntry(initialState);
      console.log(initialState);
    }, 3000);
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
      <div>
        <span>weather</span>
        {Object.values(Weather).map((value) => {
          return (
            <div key={value}>
              <input
                type="radio"
                id={value}
                name="weather"
                value={value}
                checked={newEntry.weather === value}
                onChange={handleChange}
              />
              <label htmlFor="weather">{value}</label>
            </div>
          );
        })}
        <div>
          <span>visibility</span>
          {Object.values(Visibility).map((value) => {
            return (
              <div key={value}>
                <input
                  type="radio"
                  id={value}
                  name="visibility"
                  value={value}
                  checked={newEntry.visibility === value}
                  onChange={handleChange}
                />
                <label htmlFor="visibility">{value}</label>
              </div>
            );
          })}
        </div>
      </div>
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
