import { Pagination as MuiPagination } from "@mui/material";
type SizePaginationOptions = "small" | "medium" | "large";
type ColorPaginationOptions = "primary" | "secondary" | "standard";

type PaginationProps = {
	count: number;
	variant: "outlined" | undefined;
	shape: "rounded" | undefined;
	color: ColorPaginationOptions;
	size: SizePaginationOptions;
	page: number;
	onChange: (event: React.ChangeEvent, value: string) => void
};

export const Pagination = ({
	count,
	variant,
	shape,
	size,
	color,
	page,
	onChange
}: PaginationProps) => {
	return (
		<MuiPagination
			count={count}
			page={page}
			variant={variant}
			shape={shape}
			size={size}
			color={color}
			//@ts-ignore
			onChange={onChange}
		/>
	);
};
