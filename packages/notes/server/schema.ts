import Joi from "joi";

export const userSchema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
	admin: Joi.boolean(),
});

export const noteSchema = Joi.object({
	title: Joi.string(),
	description: Joi.string(),
});
