import StarIcon from '@mui/icons-material/Star';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { useBills } from "../hooks/useBills";
import { type BillTableProps } from "../types";

export const BillTable = ({ onRowClick }: BillTableProps) => {
  const { error, isLoading, data } = useBills();

  if (isLoading) return <Typography>Loading Bills...</Typography>;
  if (error) return <Typography color="error">Error fetching bills: {error.message}</Typography>;


  const [isStarActive, setIsStarActive] = useState(true);

  const handleToggleStar = () => {
      setIsStarActive(prev => !prev);
    };

	return (
    <Box
      sx={{
        padding: 1,
        backgroundColor: '#03DAC6',
        color: '#018786',
        margin: '2px',
        marginTop: '20px',
        width: '90%',
        borderRadius: 4,
      }}
    >
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bill Status</TableCell>
              <TableCell>Bill Number</TableCell>
              <TableCell>Bill Type</TableCell>
              <TableCell>Sponsor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          { data?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="subtitle1" color="textSecondary">
                      No bills to display
                  </Typography>
                </TableCell>
              </TableRow>
            ) : ( data?.map((bill) => (
            <TableRow>
              <TableCell>
                <IconButton
                  aria-label="star"
                  onClick={handleToggleStar}
                  disabled={!isStarActive}
                >
                  <StarIcon color={isStarActive ? 'success' : 'disabled'} />
                </IconButton>
              </TableCell>
              <TableCell>{bill.bill_no}</TableCell>
              <TableCell>{bill.billType}</TableCell>
              <TableCell>{bill.member_id}</TableCell>
            </TableRow>
          )))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
