import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useBills } from '../hooks/useBills';
export const BillTable = () => {
  const { error, isLoading } = useBills();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching bills</div>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Bill Number</TableCell>
            <TableCell>Bill Type</TableCell>
            <TableCell>Bill Status</TableCell>
            <TableCell>Sponsor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

            <TableRow >
              <TableCell>bill.bill_no</TableCell>
              <TableCell>bill.billType</TableCell>
              <TableCell>bill.billStatus</TableCell>
              <TableCell>bill.member_id</TableCell>
            </TableRow>

        </TableBody>
      </Table>
    </TableContainer>
  );
};

