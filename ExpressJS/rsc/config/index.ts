import dotenv from "dotenv";
import path from "path";

dotenv.config();


const config = {
    connection_string: process.env.CONNECTION_STRING as string,
    port: process.env.PORT || 3000,
    secret:process.env.JWT_SECRET,
}

export default config;