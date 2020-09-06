import { useState, useEffect } from "react";
const isServer = typeof window === "undefined";
function defaultMatch(query: string): boolean | undefined {
	if (isServer) {
		return undefined;
	}
	return window.matchMedia(query).matches;
}
export const useMedia = (query: string) => {
	const [matches, setMatches] = useState(defaultMatch(query));

	useEffect(() => {
		if (!isServer) {
			const media = window.matchMedia(query);
			const listener = () => setMatches(media.matches);
			media.addListener(listener);
			listener();
			return () => media.removeListener(listener);
		}
	}, [query]);

	return matches;
};
