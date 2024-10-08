import { NextFunction, Request, Response } from "express";
import { appError } from "../errors/appError";
import jwt from "jsonwebtoken"

export class validateToken {
    static execute (req: Request, res: Response, next: NextFunction) {
        const authorization = req.headers.authorization;
        
        const token = authorization?.replace("Bearer ", "");
        console.log("validate token")
        if(!token) {
            throw new appError(403, "Token is required");
        }

        jwt.verify(token, process.env.JWT_SECRET as string);

        res.locals.decode = jwt.decode(token);

        next();
    }
}