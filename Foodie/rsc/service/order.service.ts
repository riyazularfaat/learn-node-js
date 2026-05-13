import fs  from "fs/promises";
import path from "node:path";
import type { Order } from "../types/action.types";


const DB_PATH = path.join(process.cwd(), "db", "data.json")

class OrderService { 
    
    private async readData():Promise<Order[]> { 
        try {
            const data = await fs.readFile(DB_PATH, "utf-8");
            return JSON.parse(data)
        } catch {
            return []
        }
        
    }
    private async writeData(data: Order[]){ 
        await fs.writeFile(DB_PATH,JSON.stringify(data, null, 2))

    }
    idGenerator(){ 
        let count = 10;
        return count += 1;
    }
    // get
    async get() { 
        const data = await this.readData();
        return data
    }
    // create
    async create(order:Omit<Order, "id">) { 
        const data = await this.readData()
        const newOrder = {
            id: this.idGenerator(),
            ...order
        }
        data.push(newOrder)
        this.writeData(data)
    }
    // Find by ID
    async getById(id: number) { 
        const data = await this.readData();
        return data.find((order) => order.id === id) || null
    }
    // Update
    async update(id: number, updates: Partial<Omit<Order, "id">>):Promise<Order | null> { 
        const data = await this.readData();
        const index = data.findIndex((order) => order.id === id);

        if (index=== -1) return null
        data[index] = { ...data[index], ...updates } as Order;
        await this.writeData(data)
        return data[index]
    }
    // Delete
    async delete(id: number){ 
        const data = await this.readData();
        const index = data.findIndex((order) => order.id === id);

        if (index === -1) return false;
        data.splice(index,1)
        await this.writeData(data)
        return true
    }
}

const dataget = new OrderService();


const order1 = {
    customer: "Amin",
    quantity: 4,
    food: "pizza",
    price: 1000

}
const order2 = {
    customer: "Hamid",
    quantity: 4,
    food: "Burger",
    price: 500

}
console.log(await dataget.delete(11))

// relative path: node ./rsc/service/order.service.ts