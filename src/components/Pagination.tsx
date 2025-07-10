import { Pagination as MuiPagination } from "@mui/material";
type SizePaginationOptions = "small" | "medium" | "large";
type ColorPaginationOptions = "primary" | "secondary" | "standard";

type PaginationProps = {
  count: number;
  variant: 'outlined' | undefined;
  shape: 'rounded' | undefined;
  color: ColorPaginationOptions;
  size: SizePaginationOptions;
};

export const Pagination = ({ count, variant, shape, size, color }: PaginationProps) => {
	return <MuiPagination count={count} variant={variant} shape={shape} size={size} color={color} />;
};
