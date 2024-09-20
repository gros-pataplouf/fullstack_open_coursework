import { Dayjs } from "dayjs";
import React from "react";
import { useState, useEffect } from "react";
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
  FormControl,
  SelectChangeEvent,
  OutlinedInput,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { EntryType, DiagnosisForm, EntryFormValues } from "../../types";
import diagnosisService from "../../services/diagnosis";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  useEffect(() => {
    diagnosisService
      .getAll()
      .then((data) => {
        const dataWithSelect: DiagnosisForm[] = data.map((diag) => {
          return { ...diag, selected: false };
        });
        setDiagnosis(dataWithSelect);
      })
      .catch((_err) => null);
  }, []);
  const [entryType, setEntryType] = useState(EntryType.HealthCheck);
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [date, setDate] = React.useState<Dayjs | null>(null);
  const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
  const [endDate, setEndDate] = React.useState<Dayjs | null>(null);
  const [dischargeDate, setDischargeDate] = React.useState<Dayjs | null>(null);
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [rating, setRating] = useState(0);
  const [employer, setEmployer] = useState("");
  const [sickLeave, setSickLeave] = useState(false);
  const [diagnosis, setDiagnosis] = useState<DiagnosisForm[]>([]);
  const [diagCodes, setDiagCodes] = React.useState<string[]>([]);


  const handleSubmit = (e : React.SyntheticEvent) => {
    e.preventDefault();    
    switch(entryType) {
      case EntryType.HealthCheck:
        return onSubmit({
          type: EntryType.HealthCheck,
          date: "2024-09-01",
          description,
          specialist,
          diagnosisCodes: diagCodes,
          healthCheckRating: rating
        });
      case EntryType.Hospital:
        return onSubmit({
          type: EntryType.Hospital,
          date: "2024-09-01",
          description, 
          specialist,
          diagnosisCodes: diagCodes,
          discharge: {
            date: "2024-09-01", //dischargeDate,
            criteria: dischargeCriteria
          }
        });

        case EntryType.OccupationalHealthcare:
          return onSubmit({
            type: EntryType.OccupationalHealthcare,
            date: "2024-09-01",
            description, 
            specialist,
            employerName : employer,
            diagnosisCodes: diagCodes,
            sickLeave: {
              startDate: "2024-09-01", //dischargeDate,
              endDate: "2025-09-01"
            }
          });
    }
    
  };


  const handleChange = (event: SelectChangeEvent<typeof diagCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagCodes(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };


  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };




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
        <form onSubmit={handleSubmit}>
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

          <FormControl sx={{ mt: 4, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Diagnosis codes</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={diagCodes}
              onChange={handleChange}
              input={<OutlinedInput label="Diagnosis codes" />}
              MenuProps={MenuProps}
            >
              {diagnosis.map((diag) => (
                <MenuItem key={diag.code} value={diag.code}>

                  {diag.code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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
