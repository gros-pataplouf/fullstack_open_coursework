import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { useState, SyntheticEvent } from "react";
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Box,
  Typography,
  Rating,
} from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { EntryType, PatientFormValues } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: PatientFormValues) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [entryType, setEntryType] = useState(EntryType.HealthCheck);
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [date, setDate] = React.useState<Dayjs | null>(null);
  const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
  const [endDate, setEndDate] = React.useState<Dayjs | null>(null);
  const [rating, setRating] = useState(0);
  const [employer, setEmployer] = useState("");
  const [sickLeave, setSickLeave] = useState(false);

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
            <DatePicker
              label="Date"
              value={date}
              onChange={(newValue) => setDate(newValue)}
            />
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
            onChange={({ target }) => setSpecialist(target.value)}
          />

          <TextField
            label="Diagnosis codes"
            fullWidth
            value={diagnosisCodes}
            onChange={({ target }) => setDiagnosisCodes(target.value)}
          />

          {entryType === EntryType.HealthCheck && (
            <>
              <Box sx={{ "& > legend": { mt: 2 } }}>
                <Typography component="legend">Health Rating</Typography>
                <Rating
                  name="healthrating"
                  value={rating}
                  onChange={(_event, rating) => {
                    rating !== null && setRating(rating);
                  }}
                />
              </Box>
            </>
          )}
          {entryType === EntryType.Hospital && <></>}
          {entryType === EntryType.OccupationalHealthcare && (
            <>
              <TextField
                label="Employer"
                fullWidth
                value={employer}
                onChange={({ target }) => setEmployer(target.value)}
              />
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={sickLeave}
                      onChange={() => {
                        setSickLeave(!sickLeave);
                      }}
                    />
                  }
                  label="Sickleave"
                />
                {sickLeave && (
                  <>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Start"
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                      />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="End"
                        value={endDate}
                        onChange={(newValue) => setEndDate(newValue)}
                      />
                    </LocalizationProvider>
                  </>
                )}
              </FormGroup>
            </>
          )}

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
