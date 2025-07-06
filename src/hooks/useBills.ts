import { useQuery } from "@tanstack/react-query";
import { fetchBills } from "../utils/api";

export const useBills = () => {
	return useQuery({
		queryKey: ["bills"],
		queryFn: fetchBills,
	});
};
