import { Request, Response } from "express";
import { postSchema } from "./post.dto";
// import { Post, PrismaClient } from "@prisma/client";
// import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { supabase } from "../db";

// const prisma = new PrismaClient();

export class PostsController {
    async list(req: Request, res: Response) {
        const { data, error } = await supabase.from("posts").select();
        if (error) {
            res.status(400).json({ error })._final;
        }
        res.send(data);
    }

    async create(req: Request, res: Response) {
        const schema = postSchema.validate(req.body);
        if (schema.error) res.status(400).json({ error: schema.error })._final;

        const { error } = await supabase.from("posts").insert({
            title: req.body.title,
            content: req.body.content,
        });

        if (error) res.status(400).json({ error })._final;

        res.status(200).send("Created");
    }

    async update(req: Request, res: Response) {
        const postId = req.params.id;
        const schema = postSchema.validate(req.body);

        if (schema.error) res.status(400).json({ error: schema.error })._final;
        if (!postId) res.status(400).json({ error: "Id not provide" })._final;

        const { data, error } = await supabase
            .from("posts")
            .select()
            .is("id", req.params.id);

        if (!error) res.status(400).json({ error: error })._final;

        res.send(data).status(201);
    }

    async remove(req: Request, res: Response) {
        const postId = req.params.id;
        if (!postId) res.status(400).json({ error: "Id not provide" })._final;

        const { error } = await supabase
            .from("posts")
            .delete()
            .eq("id", postId);

        if (error) res.status(400).json({ error: error })._final;

        res.status(204).send("deleted!!");
    }
}
