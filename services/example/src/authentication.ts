import jwt from "jsonwebtoken";

interface IPayload {
	id: number,
	role: string
}

const generateToken = (payload: IPayload) => {
	const token = jwt.sign(payload, process.env.JWT_SECRET || 'letsgothere', {
		expiresIn: 86400, // expires in 24 hours
	});
	return token;
}

export {generateToken};
