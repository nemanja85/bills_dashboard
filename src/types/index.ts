
type typeOptions = 'favourite a bill' | 'un-favourite';
type statusOptions = 'Current' | 'Withdrawn' | 'Enacted' | 'Rejected' | 'Defeated' | 'Lapsed';

export type BillProps = {
  bill_id: string;
  bill_no: string;
  billType: typeOptions;
  billStatus: statusOptions;
  member_id: string;
  titleEnglish: string;
  titleGaeilge: string;
}
