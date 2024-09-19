import { Dayjs } from "dayjs";
import React from "react";
import { useState, useEffect, SyntheticEvent } from "react";
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
import { EntryType, PatientFormValues, Diagnosis, DiagnosisForm } from "../../types";
import diagnosisService from "../../services/diagnosis";
import { SpaRounded } from "@mui/icons-material";

interface Props {
  onCancel: () => void;
  onSubmit: (values: PatientFormValues) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  useEffect(() => {
    diagnosisService.getAll()
    .then(data => {
      const dataWithSelect : DiagnosisForm[] = data.map((diag) => {return {...diag, selected: false}} );
      setDiagnosis(dataWithSelect);
    })
    .catch(err => console.error(err))

  }, [])
  const [entryType, setEntryType] = useState(EntryType.HealthCheck);
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [date, setDate] = React.useState<Dayjs | null>(null);
  const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
  const [endDate, setEndDate] = React.useState<Dayjs | null>(null);
  const [dischargeDate, setDischargeDate] = React.useState<Dayjs | null>(null);
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [rating, setRating] = useState(0);
  const [employer, setEmployer] = useState("");
  const [sickLeave, setSickLeave] = useState(false);
  const [diagnosis, setDiagnosis] = useState<DiagnosisForm[]>([]);

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
            value={diagnosis.filter(diag => diag.selected).map(diag => diag.code)}
          />


          {diagnosis.map(diag => <FormControlLabel
                  key={diag.code}
                  control={
                    <Checkbox
                      checked={diag.selected}
                      onChange={() => {
                        setDiagnosis(diagnosis.map(diag2 => diag2.code === diag.code ? {...diag, selected: !diag.selected} : diag2));
                      }}
                    />
                  }
                  label={diag.code}
                />)}


          {entryType === EntryType.HealthCheck && (
            <>
              <Box sx={{ "& > legend": { mt: 2 } }}>
                <Typography component="legend">Health Rating</Typography>
                <Rating
                  name="healthrating"
                  max={4}
                  value={rating}
                  onChange={(_event, rating) => {
                    rating !== null && setRating(rating);
                  }}
                />
              </Box>
            </>
          )}
          {entryType === EntryType.Hospital && (
            <>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Discharge date"
                  value={dischargeDate}
                  onChange={(newValue) => setDischargeDate(newValue)}
                />
              </LocalizationProvider>
            <TextField
            label="Discharge criteria"
            fullWidth
            value={dischargeCriteria}
            onChange={({ target }) => setDischargeCriteria(target.value)}
          />
          </>
          )}
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
