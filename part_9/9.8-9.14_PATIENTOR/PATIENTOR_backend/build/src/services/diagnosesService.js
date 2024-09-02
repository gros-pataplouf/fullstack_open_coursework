"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const diagnoses_1 = require("../data/diagnoses");
const diagnoses = diagnoses_1.diagnosesData;
const getDiagnoses = () => {
  return diagnoses;
};
exports.default = {
  getDiagnoses,
};
