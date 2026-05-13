import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import {routeHandeler} from "./route/route";
import config from "./config/index";

const server: Server = createServer((req: IncomingMessage, res:ServerResponse) => { 
    routeHandeler(req, res);
})

server.listen(config.port,()=> {
    console.log(`Serever is running on port ${config.port}`)
})