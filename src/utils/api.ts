import axios from "axios";
import { type FetchedBillsData, type GetBillsResponse } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchBills = async (): Promise<FetchedBillsData> => {
	const response = await axios.get<GetBillsResponse>(
		`${API_URL}/v1/legislation?bill_status=Current,Withdrawn,Enacted,Rejected,Defeated,Lapsed&bill_source=Government,Private%20Member&skip=0&limit=50&lang=en`,
		{
			headers: {
				Accept: "application/json",
			},
		},
	);

	const bills = response.data.results.map((result) => result.bill);
	const head = response.data.head;

	return { bills, head };
};
