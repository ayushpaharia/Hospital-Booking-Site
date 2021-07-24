import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface PatientDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  age: number;
  sex: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const PatientSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    sex: { type: String, required: true },
  },
  { timestamps: true }
);

PatientSchema.pre("save", async function (next: mongoose.HookNextFunction) {
  let student = this as PatientDocument;

  // hash pass if modified or new
  if (!student.isModified("password")) return next();

  // additional data
  const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));

  const hash = bcrypt.hashSync(student.password, salt);

  // Replace password with hash
  student.password = hash;
  return next();
});

PatientSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as PatientDocument;
  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const Patient = mongoose.model<PatientDocument>("Patient", PatientSchema);

export default Patient;
