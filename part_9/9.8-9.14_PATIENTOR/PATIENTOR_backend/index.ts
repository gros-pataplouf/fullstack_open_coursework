import express from "express";
import diagnosesRouter from "./src/routes/diagnoses";
import patientsRouter from "./src/routes/patients";

const app = express();
app.use(express.json());
app.use(function (_req, res, _next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  _next();
});

const PORT = 3001;

app.get("/api/ping", (_req, res, _next) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
