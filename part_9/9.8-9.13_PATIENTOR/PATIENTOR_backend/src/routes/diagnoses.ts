import express from "express";
import diagnosesService from "../services/diagnosesService";

const router = express.Router();

router.get("/", (_req, res) => {
  return res.send(diagnosesService.getDiagnoses());
});

export default router;
