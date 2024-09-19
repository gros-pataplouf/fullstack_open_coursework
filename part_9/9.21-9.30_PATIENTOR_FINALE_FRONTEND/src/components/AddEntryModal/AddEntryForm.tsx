import { useState, SyntheticEvent } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { EntryType } from "../../types";
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
} from "@mui/material";

import { PatientFormValues, Gender } from "../../types";
import dayjs, { Dayjs } from "dayjs";
import React from "react";

interface Props {
  onCancel: () => void;
  onSubmit: (values: PatientFormValues) => void;
}

interface GenderOption {
  value: Gender;
  label: string;
}

const genderOptions: GenderOption[] = Object.values(Gender).map((v) => ({
  value: v,
  label: v.toString(),
}));

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [typeSelected, setTypeSelected] = useState(false);
  const [entryType, setEntryType] = useState(EntryType.HealthCheck);
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [date, setDate] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
  const [occupation, setOccupation] = useState("");
  const [ssn, setSsn] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState(Gender.Other);



  // const addPatient = (event: SyntheticEvent) => {
  //   event.preventDefault();
  //   onSubmit({
  //     name,
  //     occupation,
  //     ssn,
  //     dateOfBirth,
  //     gender,
  //   });
  // };


  return (
    <>
      <InputLabel style={{ marginTop: 20 }}>Select Entry Type</InputLabel>
      <Select fullWidth value={entryType}>
        {Object.values(EntryType).map((option) => (
          <MenuItem
            key={option}
            value={option}
            onClick={() => setEntryType(option)}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
      <div>
        <form onSubmit={() => {}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker label="Date" value={date}  onChange={(newValue) => setDate(newValue)} />
            </DemoContainer>
          </LocalizationProvider>
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            label="Specialist"
            fullWidth
            value={specialist}
            onChange={({ target }) => setDescription(target.value)}
          />

          <TextField
            label="Diagnosis codes"
            fullWidth
            value={diagnosisCodes}
            onChange={({ target }) => setDiagnosisCodes(target.value)}
          />

          {entryType === EntryType.HealthCheck && <div>Test</div>} 
          {entryType === EntryType.Hospital && <div>Test 2</div>}
          {entryType === EntryType.OccupationalHealthcare && <div>Test 3</div>}

          <Grid>
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                style={{ float: "left" }}
                type="button"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{
                  float: "right",
                }}
                type="submit"
                variant="contained"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
};

export default AddEntryForm;
