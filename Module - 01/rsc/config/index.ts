import dotenv from "dotenv";
import path from "path";


dotenv.config();
// dotenv.config({path:path.resolve(process.cwd(), "rsc", ".env")}) => if the .env is located in rsc.

const config = {
    port: Number(process.env.PORT)||5000,
}

export default config;