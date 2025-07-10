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
	shortTitleEn: string;
	longTitleEn: string;
	shortTitleGa: string;
	longTitleGa: string;
	limit: number;
	act: Act;
};

export type BillTableProps = {
	onRowClick: (bill: GetBillsResponse) => void;
};

export type BillFavoriteProps = {
	event: React.MouseEvent<HTMLButtonElement>;
	bill_id: string;
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
	head: GetBillsResponse['head'];
}
