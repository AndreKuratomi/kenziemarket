import ErrorHandler from "../utils/errors";

export const areHeadersEnabled = (auth: string | undefined) => {
  if (auth === undefined) {
    throw new ErrorHandler("Headers unabled!", 400);
  }

  const token = auth.split(" ")[1];

  return token;
};
