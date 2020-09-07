import Cors from "cors";

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export default function runMiddleware(req, res, methods) {
	// Initializing the cors middleware
	const cors = Cors({ methods, });

	return new Promise((resolve, reject) => {
		cors(req, res, (result) => {
			if (result instanceof Error) {
				return reject(result);
			}

			return resolve(result);
		});
	});
}
