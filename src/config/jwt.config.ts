import dotenv from "dotenv";

dotenv.config();

const config = {
  secret: process.env.JWT_SECRET_KEY,
  expiresIn: process.env.JWT_EXPIRES_IN,
};

export default config;
