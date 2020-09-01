const jwt = require("jsonwebtoken");

export const verifyAuth = (mandatory = true) => {
	return (req: any, res: any, next: any) => {
		const authorization = req.headers["authorization"];
		// it is mandatory and authorization is set
		// or
		// is not mandator and has authorization is set (don't set if auth is not mandatory)
		if ((authorization && mandatory) || (authorization && !mandatory)) {
			try {
				const token = authorization.split(" ")[1];
				const payload = jwt.verify(token, "secret12345");
				req.payload = payload;
				next();
			} catch (error) {
				console.log(error);
				next(error);
			}
		} else if (!mandatory && !authorization) {
			// not mandatory and no authorization continue the request
			next();
		} else if (mandatory && !authorization) {
			// mandatory and no authorization
			return res
				.status(401)
				.json({ error: "no authorization, you have to log in" });
		}
	};
};
