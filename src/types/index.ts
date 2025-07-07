type TypeOptions = "favourite a bill" | "un-favourite";
type StatusOptions =
	| "Current"
	| "Withdrawn"
	| "Enacted"
	| "Rejected"
	| "Defeated"
	| "Lapsed";

type ShowOptions = {
	showAs: null | string;
};

type SponsorOptions = {
	as: ShowOptions;
};

export type BillProps = {
	bill_id: string;
	billNo: string;
	billType: TypeOptions;
	bill_status: StatusOptions;
	sponsors: SponsorOptions;
	shortTitleEn: string;
	shortTitleGa: string;
};

export type GetBillsResponse = {
	results: {
		bill: BillProps;
	}[];
};

export type BillTableProps = {
	onRowClick: (bill: BillProps) => void;
};

export type BillModalProps = {
	open: boolean;
	onClose: () => void;
};

type SizePaginationOptions = "small" | "medium" | "large";
type ColorPaginationOptions = "primary" | "secondary" | "standard";

export type PaginationProps = {
	page: number;
	color: ColorPaginationOptions;
	size: SizePaginationOptions;
};
