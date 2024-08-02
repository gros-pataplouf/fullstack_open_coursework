import express from "express";
import patientsService from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
  return res.send(patientsService.getPatientsSafe());
});

router.post("/", (req, res) => {
  return res.send(patientsService.createPatient(req.body));
});

export default router;
