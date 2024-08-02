import dotenv from 'dotenv';

dotenv.config();

export const secretKey = process.env.JWT_SECRET as string;
export const code = process.env.CODE as string;