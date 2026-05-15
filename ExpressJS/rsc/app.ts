import express, { type Application, type Request, type RequestHandler, type Response } from "express";
import { Pool } from "pg";
import config from "./config";
import { pool } from "./db";
import { userRoute } from "./models/user/user.route";

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

// Get all users
app.get('/api/users', async(req: Request, res: Response) => {
    try {
        const result = await pool.query(`
        SELECT * FROM users
    `)
    
    res.status(200).json({
        success: true,
        message: "Users are retrieved successfully!",
        data: result.rows
    })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        })
    }

})

// Get user by id

app.get('/api/users/:id', async (req: Request, res: Response) => {
    const {id} = req.params
    try {
        const result = await pool.query(`
        SELECT * FROM users WHERE id = $1
    `, [id])

        if (result.rows.length === 0) { 
            res.status(404).json({
            success: false,
            message: "User is not found!"
        })
        }
    
    res.status(200).json({
        success: true,
        message: "User is retrieved successfully!",
        data: result.rows[0]
    })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        })
    }

})

// Create a user
app.use('/api/users', userRoute);

// Update  id
app.put('/api/users/:id', async (req: Request, res: Response) => { 
    const { id } = req.params;
    const {name, password,is_active, age} = req.body;
    try {
        const result = await pool.query(`
        UPDATE users 
        SET name=COALESCE($1, name), 
        password=COALESCE($2, password), 
        is_active=COALESCE($3, is_active), 
        age=COALESCE($4, age)
        WHERE id=$5 RETURNING *
    `, [name, password, is_active, age, id])
    if (result.rows.length === 0) { 
            res.status(404).json({
            success: false,
            message: "User is not found!"
        })
        }
    
    res.status(200).json({
        success: true,
        message: "User is updated successfully!",
        data: result.rows[0]
    })
    }catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        })
    }
})

// Delete  id
app.delete('/api/users/:id', async (req: Request, res: Response) => { 
    const { id } = req.params;
    try {
        const result = await pool.query(`
        DELETE FROM users WHERE id=$1
    `, [id])
    if (result.rowCount === 0) { 
            res.status(404).json({
            success: false,
            message: "User is not found!"
        })
    }
    
    res.status(200).json({
        success: true,
        message: "User is deleted successfully!"
    })
    }catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        })
    }
})

export default app;
