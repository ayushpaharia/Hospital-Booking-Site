import { Request, Response } from "express";
import { omit } from "lodash";
import Patient from "../model/patient.model";
import {
  createPatient,
  findPatient,
  getPatients,
} from "../services/patient.services";

export async function createPatientHandler(req: Request, res: Response) {
  try {
    const isStudentFound = await findPatient(req.body);
    if (isStudentFound)
      return res.send({ message: "Student with this email already exists!" });

    const student = await createPatient(req.body);

    return res.send(omit(student.toJSON(), "password"));
  } catch (error) {
    console.log(error);
    return res.status(200).json({ error: "Something went Wrong" });
  }
}

export async function getPatientsHandler(req: Request, res: Response) {
  try {
    const students = await getPatients();
    return res.status(200).json({ students });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ error: "Something went Wrong" });
  }
}

export async function getPatientHandler(req: Request, res: Response) {
  try {
    const students = await getPatients();
    return res.status(200).json({ students });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ error: "Something went Wrong" });
  }
}
