import { DocumentDefinition, FilterQuery } from "mongoose";
import Patient, { PatientDocument } from "../model/patient.model";

export async function createPatient(
  input: DocumentDefinition<PatientDocument>
) {
  try {
    return await Patient.create(input);
  } catch (err) {
    throw new Error(err);
  }
}

export async function findPatient(query: FilterQuery<PatientDocument>) {
  try {
    return await Patient.findOne({ email: query.email }).lean();
  } catch (err) {
    throw new Error(err);
  }
}

export function getPatients() {
  try {
    return Patient.find().lean();
  } catch (err) {
    throw new Error(err);
  }
}
