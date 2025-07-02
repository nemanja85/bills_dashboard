

type statusOptions = 'active' | 'inactive'

export type BillProps = {
  billNumber: string;
  billType: string;
  billStatus: statusOptions;
  sponsor: string;
  titleEnglish: string;
  titleGaeilge: string;
}
