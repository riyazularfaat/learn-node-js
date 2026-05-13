import type { Res} from '../types/action.types'
export function sendResponse<T>(res: Res, { message, data, error }: { message: string; data?: T; error?: boolean }, status = 200) {
    res.writeHead(status, { "content-type": "application/json" });
    res.end(JSON.stringify({
        success: error ? false : true,
        message,
        data: error ? null : data,
    }));
}

