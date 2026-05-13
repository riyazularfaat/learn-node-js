import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "./rsc/database/db.json")

export const readProduct = () => { 
    const products = fs.readFileSync(filePath, "utf-8")
    return JSON.parse(products)
}

export const insertProduct = (payload: any) => { 
    fs.writeFileSync(filePath, JSON.stringify(payload, null, 2));
}