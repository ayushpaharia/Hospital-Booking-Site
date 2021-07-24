import { Router } from "express";
import {
  createPatientHandler,
  getPatientsHandler,
  getPatientHandler,
} from "../controller/patient.controller";
import validateRequest from "../middlewares/validateRequest";
import { createPatientSchema } from "../schema/patient.schema";

const patientRoutes: Router = Router();

/**
 * @route   POST /api/patients
 * @desc    Registers student
 */
patientRoutes.post(
  "/api/students",
  validateRequest(createPatientSchema),
  createPatientHandler
);

/**
 * @route   GET /api/students
 * @desc    Gets a students
 */
patientRoutes.get("/api/students", getPatientsHandler);

export default patientRoutes;
