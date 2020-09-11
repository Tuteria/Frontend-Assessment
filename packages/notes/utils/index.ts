export function truncateText(text: string, len: number, fallback = ""): string {
	if (!text) return fallback;
	if (text.length <= len) return text;
	return `${text.substr(0, len)}...`;
}

export function isActiveLink(path: string): boolean {
	if (window !== undefined) {
		return window.location.pathname === path;
	}
	return false;
}
