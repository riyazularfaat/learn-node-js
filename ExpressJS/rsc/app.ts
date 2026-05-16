import express, { type Application, type Request, type RequestHandler, type Response } from "express";
import { Pool } from "pg";
import config from "./config";
import { pool } from "./db";
import { userRoute } from "./models/user/user.route";
import { profileRoute } from "./models/profile/profile.route";
import { authRoute } from "./models/auth/auth.route";

const app:Application = express()
const port = config.port;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req: Request, res: Response) => {
    
    res.status(201).json({
        name: "Riyazul Arfaat",
        course: "Next Level development",
        email: "riyazularfaat@gmail.com"
    })

})



// Create a user
app.use('/api/users', userRoute);
app.use('/api/profile', profileRoute);
app.use('/api/auth', authRoute);



export default app;
