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

export function capitalize(text: string | string[]): string {
	if (Array.isArray(text)) {
		return `${text[0][0].toUpperCase()}${text[0].substr(1)}`;
	}
	return `${text[0].toUpperCase()}${text.substr(1)}`;
}
