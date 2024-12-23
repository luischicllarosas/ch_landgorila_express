import { Request, Response } from "express";
// import { userSchema } from "./users.dto";
// import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

export class UsersController {
    //
    createSession(req: Request, res: Response) {
        var ip = req.socket.remoteAddress || req.ip;
        const expiredMil = 1800000; // 30mins in milsec

        // Could would check ip if exist from DB

        if (!ip) {
            res.status(400).json({ message: "U are a bot (? " })._final;
        }

        const token = jwt.sign({ ip }, "no_secret_from_env", {
            expiresIn: expiredMil,
        });

        res.cookie("token", token, { maxAge: expiredMil, httpOnly: true });
        res.json({
            ip,
            token,
            expiredMil,
        });
    }
}
