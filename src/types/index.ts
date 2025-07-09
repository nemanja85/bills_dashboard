type StatusOptions =
	| "Current"
	| "Withdrawn"
	| "Enacted"
	| "Rejected"
	| "Defeated"
	| "Lapsed";

export type SponsorElement = {
	sponsor: SponsorOptions;
};

type ShowOptions = {
	showAs: null | string;
};

type SponsorOptions = {
	as: ShowOptions;
};

export type GetBillsResponse = {
	results: {
		bill: BillProps;
	}[];
};

export type BillProps = GetBillsResponse & {
	bill_id: string;
	billNo: string;
	billType: string;
	bill_status: StatusOptions;
	sponsors: SponsorElement[];
	shortTitleEn: string;
	longTitleEn: string;
	shortTitleGa: string;
	longTitleGa: string;
};

export type BillTableProps = {
	onRowClick: (bill: GetBillsResponse) => void;
};

export type BillFavoriteProps = {
	event: React.MouseEvent<HTMLButtonElement>;
	billId: string;
	isFavorited: boolean;
};

export type BillModalProps = {
	open: boolean;
	onClose: () => void;
	bill: GetBillsResponse | null;
};

type SizePaginationOptions = "small" | "medium" | "large";
type ColorPaginationOptions = "primary" | "secondary" | "standard";

export type PaginationProps = {
	count: number;
	color: ColorPaginationOptions;
	size: SizePaginationOptions;
};
