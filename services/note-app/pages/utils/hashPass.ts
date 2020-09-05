import crypto from "crypto";

function hashPass(str: string) {
	const shasum = crypto.createHash("sha512");
	shasum.update(str);
	return shasum.digest("hex");
}

export default hashPass;
