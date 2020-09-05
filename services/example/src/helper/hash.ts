import crypto from "crypto";

function hasPass(str: string) {
	const shasum = crypto.createHash("sha512");
	shasum.update(str);
	return shasum.digest("hex");
}

export default hasPass;
