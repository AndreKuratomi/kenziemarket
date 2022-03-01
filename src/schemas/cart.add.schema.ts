import * as yup from "yup";

export const AddToCartSchema = yup.object().shape({
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
    .typeError("'price' must be typeof string!")
    .strict(true)
    .required("'price' is a required field!")
    .positive(),
  id: yup
    .string()
    .typeError("'id' must be typeof string!")
    .strict(true)
    .required("'id' is a required field!")
    .min(36, "Minimun of 36 digits for id field!"),
  createdOn: yup
    .string()
    .typeError("'createdOn' must be typeof string!")
    .strict(true)
    .required("'createdOn' is a required field!")
    .min(24, "Minimun of 24 digits for createdOn field!"),
});
