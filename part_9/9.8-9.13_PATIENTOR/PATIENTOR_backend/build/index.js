"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnoses_1 = __importDefault(require("./src/routes/diagnoses"));
const patients_1 = __importDefault(require("./src/routes/patients"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
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
app.use("/api/diagnoses", diagnoses_1.default);
app.use("/api/patients", patients_1.default);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
