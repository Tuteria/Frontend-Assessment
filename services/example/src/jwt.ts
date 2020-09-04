const jwt = require("jsonwebtoken");

export const verifyJwt = async (req: any, res: any, next: any) => {
	const authorization = req.headers["authorization"];

	if (!authorization) {
		req.payload = null;
		next();
	} else {
		try {
			const token = await authorization.split(" ")[1];
			const payload = await jwt.verify(token, process.env.TOKEN_SECRET);

			req.payload = payload;
			next();
		} catch (err) {
			console.log(err.message);
			res.status(401).send(err.message);
		}
	}
};
