import React, { useEffect } from "react";
import { useRouter } from "next/router";

export function HOC(Component) {
	return function () {
		const router = useRouter();
		useEffect(() => {
			if (!localStorage.getItem("isAuth")) {
				router.push("/");
			}
		}, []);

		return <Component {...arguments} />;
	};
}
