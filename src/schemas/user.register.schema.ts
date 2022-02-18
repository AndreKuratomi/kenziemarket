import * as yup from "yup";

export const UserRegisterSchema = yup.object().shape({
  name: yup
    .string()
    .typeError("'name' must be typeof string!")
    .strict(true)
    .required("'name' is a required field!"),
  email: yup
    .string()
    .email("Invalid email. Correct format example: 'email@email.com'")
    .required("'email' is a required field!"),
  password: yup
    .string()
    .typeError("'password' must be typeof string!")
    .strict(true)
    .min(4, "Minimun 4 digits for password field.")
    .required("'password' is a required field!"),
  isAdm: yup
    .boolean()
    .typeError("'isAdm' must be typeof boolean!")
    .strict(true)
    .required("'isAdm' is a required field!"),
});
