import express, { type Application, type Request, type RequestHandler, type Response } from "express";
import { Pool } from "pg";
import config from "./config";

const app:Application = express()
const port = config.port;

const pool = new Pool({
    connectionString: config.connection_string,
})
app.use(express.json());

const initDB = async()=>{ 
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(20),
                email VARCHAR(30) UNIQUE NOT NULL,
                password VARCHAR(15) NOT NULL,
                is_active BOOLEAN DEFAULT true,
                age INT,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            )
        `);
        console.log("Database connected successfully.");
        
    } catch (error) {
        console.log(error)
    }
}

initDB();
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
app.post('/api/users', async (req: Request, res: Response) => {
    const {name, email, password,age} = req.body;
    try {
        const result = await pool.query(`
            INSERT INTO users(name,email,password,age) VALUES($1,$2,$3,$4) RETURNING *
            `,
            [name, email, password, age]
        )
        res.status(201).json({
            success: true,
            message: "User is created successfully.",
            data: result.rows[0],
        })
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
    })
    }
})

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

app.listen(port, () => {
  console.log(`The app is listening on port ${port}`)
})
