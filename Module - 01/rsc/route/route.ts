import type { IncomingMessage, ServerResponse } from "http";
import { productController } from "../controller/products.controller";
import { sendResponse } from "../service/sendResponse.service";

export const routeHandeler = (req:IncomingMessage, res:ServerResponse) => { 
    const url = req.url;
    const method = req.method;

    if (url === '/' && method === "GET") {
        sendResponse(res, { message: "This is root route." });
    } else if (url?.startsWith("/products")) { 
        productController(req, res);
    } else { 
        sendResponse(res, { message: "Route not found!"}, 404);

    }
}