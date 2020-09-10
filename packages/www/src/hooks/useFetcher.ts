import useSWR, { mutate } from "swr";

import { fetcher } from "../api/client";

export default function useFetcher(url) {
	return useSWR(url, fetcher);
}
