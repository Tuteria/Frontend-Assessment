const Validate = {
	createUser(req: any, res: any, next: any) {
		const username = req.body.username ? req.body.username.trim() : null;
		const { email } = req.body;
		const { password } = req.body;

		if (!username || typeof username !== "string") {
			return res.status(400).json({
				username: "Please Enter Username",
			});
		} else if (!email || typeof email !== "string") {
			return res.status(400).json({
				email: "Please Enter Email",
			});
		} else if (!password || typeof password !== "string") {
			return res.status(400).json({
				password: "Please Enter password",
			});
		} else if (password.length < 6) {
			return res.status(400).json({
				password: "Password is too short!",
			});
		}
		next();
	},
};

export default Validate;
