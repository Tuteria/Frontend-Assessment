const jwt = require("jsonwebtoken");

export const verifyJwt = (req: any, res: any, next: any) => {
	const authorization = req.headers["authorization"];

	if (!authorization) {
		return res.status(401).send("no authorization, you have to log in");
	}
	try {
		const token = authorization.split(" ")[1];
		const payload = jwt.verify(token, "secret12345");
		req.payload = payload;
		next();
	} catch (err) {
		console.log(err.message);
		res.status(401).send(err.message);
	}
};
