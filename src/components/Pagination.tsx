import { Pagination as MuiPagination } from "@mui/material";
import { type PaginationProps } from "../types/index";

/**
 *
 * @param {number} count
 * @param {string} size
 * @param {string} color
 */
export const Pagination = ({ count, size, color }: PaginationProps) => {
	return <MuiPagination count={count} size={size} color={color} />;
};
