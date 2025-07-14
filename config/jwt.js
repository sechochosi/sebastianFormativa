import dotenv from "dotenv";

dotenv.config();

export const secret = process.env.JWT_SECRET || "okey";

export const expiresIn = "1h";
