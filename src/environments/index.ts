import * as dotenv from 'dotenv';
dotenv.config();

// DATABASE
const DB_HOST: string = process.env.DB_HOST;
const DB_PORT: number = parseInt(process.env.DB_PORT) || 5432;
const DB_USERNAME: string = process.env.DB_USERNAME;
const DB_PASSWORD: string = process.env.DB_PASSWORD;
const DB_NAME: string = process.env.DB_NAME;

export { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME };
