import dotenv from "dotenv";
import path from "path";
import process from "process";

dotenv.config();

const config = {
    connection_string: process.env.CONNECTION_STRING as string,
    port: process.env.PORT ||5000
}

export default config;