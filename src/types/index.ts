type TypeOptions = "favourite a bill" | "un-favourite";
type StatusOptions =
	| "Current"
	| "Withdrawn"
	| "Enacted"
	| "Rejected"
	| "Defeated"
	| "Lapsed";

export type BillProps = {
	bill_id: string;
	bill_no: string;
	billType: TypeOptions;
	bill_status: StatusOptions;
	member_id: string;
  shortTitleEn: string,
  shortTitleGa: string,
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

export type PaginationProps = {
  limit: number;
	page: number;
	onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};
