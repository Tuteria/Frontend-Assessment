import axios from "axios";
import { getAuthToken } from "../libs/cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/";

const client = axios.create({
	baseURL: API_URL,
});

export const fetcher = (url) =>
	client
		.get(url, {
			headers: {
				Authorization: `Bearer ${getAuthToken()}`,
			},
		})
		.then((res) => res.data);

export const setDefaultHeaders = () => {
	const token = getAuthToken();
	if (token) {
		axios.defaults.headers.common = {
			Authorization: `Bearer ${token}`,
		};
	}
};

export default client;
