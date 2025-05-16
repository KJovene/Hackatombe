import dotenv from "dotenv";

dotenv.config();

const ENV = {
    PORT: process.env.PORT || 6782,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
}

export default ENV;