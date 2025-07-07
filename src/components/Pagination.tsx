import { Pagination as MuiPagination } from "@mui/material";
import { type PaginationProps } from "../types/index";

/**
 *
 * @param {number} page
 * @param {string} size
 * @param {string} color
 */
export const Pagination = ({ page, size, color }: PaginationProps) => {
	return <MuiPagination page={page} size={size} color={color} />;
};
