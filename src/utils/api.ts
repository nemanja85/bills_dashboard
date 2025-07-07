import axios from "axios";
import { type BillProps, type GetBillsResponse } from "../types";

const API_URL = import.meta.env.VITE_API_URL as string;

export const fetchBills = async (): Promise<BillProps[]> => {
	const response = await axios.get<GetBillsResponse>(
		`${API_URL}/v1/legislation`,
		{
			headers: {
				Accept: "application/json",
			},
		},
	);

	return response.data.results.map((result) => result.bill);
};
