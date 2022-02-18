import * as yup from "yup";

export const ProductRegisterSchema = yup.object().shape({
  name: yup
    .string()
    .typeError("'name' must be typeof string!")
    .strict(true)
    .required("'name' is a required field!"),
  type: yup
    .string()
    .typeError("'name' must be typeof string!")
    .strict(true)
    .required("'type' is a required field!"),
  price: yup
    .number()
    .typeError("'password' must be typeof string!")
    .strict(true)
    .required("'password' is a required field!")
    .positive(),
});
