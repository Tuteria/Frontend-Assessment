const jwt = require("jsonwebtoken");

export const verifyAuth = (req: any, res: any, next: any) => {
	const authorization = req.headers["authorization"];
	if (!authorization) {
		return res
			.status(401)
			.json({ error: "no authorization, you have to log in" });
	}
	try {
		const token = authorization.split(" ")[1];
		const payload = jwt.verify(token, "secret12345");
		req.payload = payload;
		next();
	} catch (error) {
		console.log(error);
		next(error);
	}
};
