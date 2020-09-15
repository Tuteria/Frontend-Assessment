import fetch from "node-fetch";
const API_URL = "http://backup.tuteria.com:5020";

interface Position {
	symbol?: string;
	entry?: number;
	margin?: number;
	leverage: number;
	margin_type: "isolated" | "cross";
	kind: "long" | "short";
	isolatedMargin: number;
	markPrice: number;
	pnl: number;
	[key: string]: any;
}

class Fetcher {
	owner: string;
	constructor(owner: string) {
		this.owner = owner;
	}
	buildUrl(path: string) {
		return `${API_URL}/ft/${this.owner}${path}`;
	}
	async getOpenPositions(): Promise<Array<Position>> {
		const url = this.buildUrl("/active-markets");
		const response = await fetch(url);
		if (response.status < 400) {
			const result = await response.json();
			return result.data;
		}
	}
	async getOpenOrders() {}
}
class Market {
	position: Position;
	orders: Array<any> = [];
	constructor(position: Position) {
		this.position = position;
	}
}
class Trader {
	symbol: string;
	fetcher: Fetcher;
	interval: number; // interval to check current position.
	constructor(symbol: string, fetcher: Fetcher, updateInterval = 20) {
		this.symbol = symbol;
		this.fetcher = fetcher;
	}
}
