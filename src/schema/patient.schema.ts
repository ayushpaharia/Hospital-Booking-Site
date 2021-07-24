import { object, string, ref, array, number } from "yup";

export const createPatientSchema = object({
  body: object({
    name: string().required("Name is required"),
    password: string()
      .required("Password is required")
      .min(6, "Password is too short - shoyld be 8 characters or longer")
      .matches(
        /^[a-zA-Z0-9._-]*$/,
        "Password can only contain alphabets, numbers , underscore, period and dash"
      ),
    passwordConfirmation: string().oneOf(
      [ref("password"), null],
      "Passwords must match"
    ),
    sex: string()
      .required("Sex is required")
      .matches(/^[MFO]$/, "Sex not Valid"),
    age: number().required("Age is required"),
    email: string()
      .required("Email is required")
      .email("Must be a valid Email"),
  }),
});
