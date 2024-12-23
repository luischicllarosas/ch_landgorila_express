import { Request, Response } from "express";
import { postSchema } from "./post.dto";
import { Post, PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export class PostsController {
    async list(req: Request, res: Response) {
        const allUsers = await prisma.post.findMany();

        res.send(allUsers);
    }

    create(req: Request, res: Response) {
        const schema = postSchema.validate(req.body);
        if (schema.error) res.status(400).json({ error: schema.error })._final;

        prisma.post
            .create({ data: req.body })
            .then((newPost) => {
                res.send(newPost);
            })
            .catch((e: PrismaClient) => {
                res.status(400).json({ error: e })._final;
            });
    }

    async update(req: Request, res: Response): Promise<Post | any> {
        const postId = req.params.id;
        const schema = postSchema.validate(req.body);

        if (schema.error) res.status(400).json({ error: schema.error })._final;
        if (!postId) res.status(400).json({ error: "Id not provide" })._final;

        const newPost = await prisma.post
            .update({
                where: { id: parseInt(postId) },
                data: {
                    title: req.body.title,
                    content: req.body.content,
                },
            })
            .catch((e) => {
                res.status(400).json({ error: e })._final;
            });

        res.send(newPost).status(201);
    }

    async remove(req: Request, res: Response) {
        const postId = req.params.id;
        if (!postId) res.status(400).json({ error: "Id not provide" })._final;

        prisma.post
            .delete({
                where: {
                    id: parseInt(postId),
                },
            })
            .then(() => {
                res.status(204).send();
            })
            .catch((error: PrismaClientKnownRequestError) => {
                res.status(400).json({ error: error.meta });
            })
            .finally(() => {});
    }
}
