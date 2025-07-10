import { Pagination as MuiPagination } from "@mui/material";
import { type BillCounts } from "../types";
type SizePaginationOptions = "small" | "medium" | "large";
type ColorPaginationOptions = "primary" | "secondary" | "standard";

type PaginationProps = {
	counts?: BillCounts;
	color: ColorPaginationOptions;
	size: SizePaginationOptions;
};

export const Pagination = ({ counts, size, color }: PaginationProps) => {
	return (
		<MuiPagination count={counts?.billCount} size={size} color={color} />
	);
};
