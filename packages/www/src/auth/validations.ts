import Joi from "joi";
import {
	RegisterUserInterface,
	LoginUserInterface,
} from "../../../../../interfaces/userInterface";

export const RegisterValidation = (data: RegisterUserInterface) => {
	const schema = Joi.object({
		username: Joi.string().min(4).required(),
		email: Joi.string().required().email(),
		password: Joi.string().min(8).required(),
	});

	return schema.validate(data);
};

export const LoginValidation = (data: LoginUserInterface) => {
	const schema = Joi.object({
		email: Joi.string().required().email(),
		password: Joi.string().min(8).required(),
	});

	return schema.validate(data);
};
