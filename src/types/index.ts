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

export type SponsorElement = {
	sponsor: SponsorOptions;
};

type SponsorOptions = {
	as: ShowOptions;
};

type Act = {
	actNo: string;
	shortTitleEn: string;
	longTitleEn: string;
	shortTitleGa: string;
	longTitleGa: string;
};

export type GetBillsResponse = {
	head: {
		counts: BillCounts;
	};
	results: {
		bill: BillProps;
	}[];
};

export type BillProps = GetBillsResponse & {
	bill_id: string;
	billNo: string;
	billType: string;
	status: StatusOptions;
	sponsors: SponsorElement[];
	act: Act;
};

export type BillTableProps = {
	onRowClick: (bill: GetBillsResponse) => void;
};

export type BillFavoriteProps = {
	event: React.MouseEvent<HTMLButtonElement>;
	billNo: string;
	isFavorited: boolean;
};

export type BillModalProps = {
	open: boolean;
	onClose: () => void;
	bill: GetBillsResponse | null;
};

export type BillCounts = {
	billCount: number;
	resultCount: number;
};

export type FetchedBillsData = {
	bills: BillProps[];
	head: GetBillsResponse["head"];
};
