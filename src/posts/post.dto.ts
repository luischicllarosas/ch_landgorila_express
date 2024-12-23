import Joi from "joi";

export const postSchema = Joi.object().keys({
    id: Joi.number().optional(),
    title: Joi.string().min(3).max(30).required(),
    content: Joi.string().min(3).max(30).required(),
});
