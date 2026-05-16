import type { Request, Response } from "express";
import { pool } from "../../db";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    
    try {
        const result = await userService.createUserToDB(req.body);
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
}

const getAllUsers = async(req: Request, res: Response) => {
    try {
        const result = await userService.getAllUsersFromDB();
    
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

}

const getUserByID = async (req: Request, res: Response) => {
    const {id} = req.params
    try {
        const result = await userService.getUserByIDFromDB(id as string);

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

}

const updateUser = async (req: Request, res: Response) => { 
    const { id } = req.params;
    try {
        const result = await userService.updateUserFromToDB(req.body, id as string);
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
}

const deleteUser = async (req: Request, res: Response) => { 
    const { id } = req.params;
    try {
        const result = await userService.deleteUserFromDB(id as string);
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
}

export const userController = {
    createUser,
    getAllUsers,
    getUserByID,
    updateUser,
    deleteUser,
}