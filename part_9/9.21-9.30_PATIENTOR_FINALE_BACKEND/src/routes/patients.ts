import express from "express";
import {z} from "zod";
import patientsService from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
  return res.send(patientsService.getPatientsSafe());
});

router.post("/:id/entries", (req, res) => {
  const id = req.params.id;
  try {
    return res.send(patientsService.addEntry(id, req.body));
    
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return res.status(400).send({error: error.issues});
    } else {
      return res.status(400).send({error: 'unknown error'});
    }
  }
});


router.get("/:id", (req, res) => {
  const id = req.params.id;
  const patient = patientsService.getOneById(id);
  if (patient !== undefined) {
    return res.send(patientsService.getOneById(id));
  } else {
    return res.status(404).send({error: 'patient not found'});
  }
});

router.post("/", (req, res) => {
  try {
    return res.send(patientsService.createPatient(req.body));
    
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return res.status(400).send({error: error.issues});
    } else {
      return res.status(400).send({error: 'unknown error'});
    }
  }
});


export default router;
