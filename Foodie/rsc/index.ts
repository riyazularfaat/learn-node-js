import { createServer } from "http";
import { sendResponse } from './utility/utils.utility';

const server = createServer((req, res) => {
    const url = req.url ?? "/";

    if (url === "/") { 
        sendResponse(res, { message: "This is the root route." })
        return 
    }

    sendResponse(res,{message: "Not found!"}, 404)
});

const port = 3000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});