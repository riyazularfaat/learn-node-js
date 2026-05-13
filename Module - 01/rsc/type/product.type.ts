import type { IncomingMessage, ServerResponse } from "http";

export interface IProduct { 
    id: number
    name: string
    description: string
    price: number
}

export type Req = IncomingMessage;
export type Res = ServerResponse;