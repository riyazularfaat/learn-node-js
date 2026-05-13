import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/product.service";
import type { IProduct } from "../type/product.type";
import { parseBody } from "../utility/parseBody";
import { sendResponse } from "../service/sendResponse.service";

export const productController = async(req:IncomingMessage, res:ServerResponse) => { 
    const url = req.url;
    const method = req.method;

    const urlParts = url?.split("/");
    const id = urlParts && urlParts[1] === "products" && urlParts[2] ? Number(urlParts[2]) : null;
    const hasValidId = id !== null && !Number.isNaN(id);
    
    
    if (method === "GET" && hasValidId) {
        const products = readProduct();
        const product = products.find((p: IProduct) => p.id === id)
        if (!product) {
            return sendResponse(res,{message:"Product is not found!"}, 404);
        }
        return sendResponse(res,{message:"Product is retrived successfully", data:product});
    } else if (url?.startsWith("/products") && method === "GET") {
        const products = readProduct();
        return sendResponse(res,{message:"Products are retrived successfully", data: products}, 200);  
    } else if (method === "POST" && url === "/products") {
        const body = await parseBody(req);
        const products = readProduct();
        const newProduct = {
            id: Date.now(),
            ...body,
        }
        products.push(newProduct)
        insertProduct(products)
        return sendResponse(res,{message:"Product is created successfully", data: newProduct}, 200);  

    } else if (method === "PUT" && id !== null) {
        const body = await parseBody(req);
        const products = readProduct();
        const index = products.findIndex((p: IProduct) => p.id === id)


        if (index < 0) {
            return sendResponse(res,{message:"Route not found!"}, 404);
        }

        products[index] = {
            id: products[index].id,
            ...body
        }
        insertProduct(products);
        return sendResponse(res,{message:"Product is updated successfully", data: products[index]}, 200);  

    } else if (method === "DELETE" && id !== null) { 
        const products = readProduct();
        const index = products.findIndex((p: IProduct) => p.id === id)
        if (index < 0) {
            return sendResponse(res,{message:"Product is not found!"}, 404);  
            
        }
        const deletedProduct = products[index]
        products.splice(index, 1);
        insertProduct(products)
        return sendResponse(res,{message:"Product is deleted successfully", data: deletedProduct}, 200);  
    }
}