
type typeOptions = 'favourite a bill' | 'un-favourite';
type statusOptions = 'Current' | 'Withdrawn' | 'Enacted' | 'Rejected' | 'Defeated' | 'Lapsed';

export type BillProps = {
  bill_id: string;
  bill_no: string;
  billType: typeOptions;
  billStatus: statusOptions;
  member_id: string;
  title: {
    English:string;
    Gaeilge: string;
  }
}

export type BillResponseProps = {
  results: {
    bill: BillProps;
  }[];
}

export type BillTableProps = {
  onRowClick: (bill: BillProps) => void;
}

export type BillModalProps = {
  open: boolean;
  onClose: () => void;
}

export type PaginationProps = {
  count: number;
  page: number;
  onClose: (event: React.ChangeEvent<unknown>, value: number) => void;
}
