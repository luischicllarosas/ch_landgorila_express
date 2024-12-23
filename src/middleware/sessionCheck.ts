// import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";

// const prisma = new PrismaClient();

export const sessionMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): RequestHandler | any => {
    try {
        const token = req.headers["authorization"];

        if (!token) {
            return res
                .status(401)
                .json({ message: "You need create a session first." })._final;
        }

        jwt.verify(token, "no_secret_from_env");
        next();
    } catch (err) {
        res.status(401).json({ message: "You need create a session first." });
    }
};
