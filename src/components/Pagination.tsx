import { Pagination as MuiPagination } from "@mui/material";
import { type PaginationProps } from "../types/index";

/**
 *
 * @param {number} limit
 * @param {number} page
 * @param  {void} onChange
 */
export const Pagination = ({ limit, page, onChange }: PaginationProps) => {
  return <MuiPagination count={limit} page={page} onChange={onChange} />;
};
