import { Pagination as MuiPagination } from '@mui/material';
import { type PaginationProps } from '../types/index';

/**
 *
 * @param {number} count
 * @param {number} page
 * @param  {void} onChange
 */
export const Pagination = ({ count, page, onChange }: PaginationProps) => {
  return <MuiPagination count={count} page={page} onChange={onChange} />;
};

