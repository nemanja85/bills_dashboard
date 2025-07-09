import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, { useMemo, useState } from "react";
import { useBills } from "../hooks/useBills";
import {
  type BillFavoriteProps,
  type BillTableProps,
  type GetBillsResponse,
} from "../types";
import { BillModal } from "./BillModal";
import { Pagination } from "./Pagination";

export const BillTable = ({ onRowClick }: BillTableProps) => {
	const { error, isLoading, data } = useBills();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedBill, setSelectedBill] = useState<GetBillsResponse | null>(
		null,
	);
	const [filterStatus, setFilterStatus] = useState<string>("");
	const [favoritedBills, setFavoritedBills] = useState<Set<string>>(new Set());
	const [currentTab, setCurrentTab] = useState(0);

	const handleRowClick = (bill: GetBillsResponse) => {
		setSelectedBill(bill);
		setIsModalOpen(true);
		if (onRowClick) {
			onRowClick(bill);
		}
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedBill(null);
	};

	const handleFilterChange = (event: React.ChangeEvent<{ value: string }>) => {
		setFilterStatus(event.target.value as string);
	};

	const handleToggleFavorite = ({
		event,
		billId,
		isFavorited,
	}: BillFavoriteProps) => {
		event.stopPropagation();

		const newFavoritedBills = new Set(favoritedBills);
		if (isFavorited) {
			newFavoritedBills.delete(billId);
			console.log(`Un-favouriting a bill ID: ${billId}`);
		} else {
			newFavoritedBills.add(billId);
			console.log(`Favouriting a bill with ID: ${billId}`);
		}
		setFavoritedBills(newFavoritedBills);
	};

	const filteredBills = useMemo(() => {
		if (!data) return [];

		let billsDisplay = data;

		if (filterStatus) {
			billsDisplay = billsDisplay.filter((bill) =>
				favoritedBills.has(bill.bill_id),
			);
		}

		return billsDisplay;
	}, [data, filterStatus, currentTab, favoritedBills]);

	const uniqueBillStatuses = useMemo(() => {
		if (!data) return [];
		const statuses = new Set<string>();
		data.forEach((bill) => statuses.add(bill.bill_status));
		return Array.from(statuses);
	}, [data]);

	const handleTabChange = (newValue: number) => {
		setCurrentTab(newValue);
	};

	if (isLoading) return <Typography>Loading Bills...</Typography>;
	if (error)
		return (
			<Typography color="error">
				Error fetching bills: {error.message}
			</Typography>
		);

	return (
    <Container>
      <Box>
        <Tabs
          value={currentTab}
          //@ts-ignore
          onChange={handleTabChange}
          sx={{ 'border-bottom': '1px solid #2196f3', marginBottom: '30px' }}
          aria-label="bill table tabs"
        >
          <Tab sx={{ 'border-right': '1px solid #2196f3', marginRight: '5px' }} label="Favorited Bills" />
          <Tab label="Un-favorited Bills" />
        </Tabs>
      </Box>
      <Box>
        <FormControl sx={{ my: 5, minWidth: 200 }}>
          <InputLabel id="bill-status-select-label">Filter by Status</InputLabel>
          <Select
            labelId="bill-status-select-label"
            id="bill-status-select"
            value={filterStatus}
            label="Filter by Status"
            //@ts-ignore
            onChange={handleFilterChange}
            sx={{
              color: '#2196f3',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#2196f3',
              },
              '& .MuiSvgIcon-root': {
                color: '#2196f3',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '2196f3',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '2196f3',
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  fontSize: '16px',
                  fontWeight: 'bold',
                  backgroundColor: '#2196f3',
                  color: 'white',
                },
              },
            }}
          >
            <MenuItem value="">
              <em>All Statuses</em>
            </MenuItem>
            <MenuItem value="Current">
              <p>Current</p>
            </MenuItem>
            <MenuItem value="Withdrawn">
              <p>Withdrawn</p>
            </MenuItem>
            <MenuItem value="Enacted">
              <p>Enacted</p>
            </MenuItem>
            <MenuItem value="Rejected">
              <p>Rejected</p>
            </MenuItem>
            <MenuItem value="Defeated">
              <p>Defeated</p>
            </MenuItem>
            <MenuItem value="Lapsed">
              <p>Defeated</p>
            </MenuItem>
            {uniqueBillStatuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          padding: 1,
          backgroundColor: '#2196f3',
          color: '#1565c0',
          marginTop: '10px',
          width: '100%',
          borderRadius: 2,
        }}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ width: '100%', backgroundColor: '#1883ef' }}>
                <TableCell
                  sx={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    letterSpacing: '0.05em',
                    color: 'white',
                  }}
                >
                  Icon
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    letterSpacing: '0.05em',
                    color: 'white',
                  }}
                >
                  Bill Number
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    letterSpacing: '0.05em',
                    color: 'white',
                  }}
                >
                  Bill Type
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    letterSpacing: '0.05em',
                    color: 'white',
                  }}
                >
                  Bill Status
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    letterSpacing: '0.05em',
                    color: 'white',
                  }}
                >
                  Sponsor
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ cursor: 'pointer' }}>
              {filteredBills?.length === 0 ? (
                <TableRow sx={{ backgroundColor: '#bce0fb' }}>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="h5" color="error">
                      No bills to display
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredBills?.map((bill, index) => {
                  const isFavorited = favoritedBills.has(bill.bill_id);
                  return (
                    <TableRow
                      sx={{ backgroundColor: '#bce0fb' }}
                      key={bill.bill_id || index}
                      onClick={() => handleRowClick(bill)}
                    >
                      <TableCell sx={{ borderBottom: '1px solid #1883ef' }}>
                        <IconButton aria-label="star">
                          {(e: React.MouseEvent<HTMLButtonElement>) =>
                            handleToggleFavorite(e, bill.bill_id, isFavorited)
                          }
                          <StarIcon color={isFavorited ? 'success' : 'disabled'} />
                        </IconButton>
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #1883ef' }}>{bill.billNo}</TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #1883ef' }}>{bill.billType}</TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #1883ef' }}>{bill.bill_status}</TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #1883ef' }}>
                        {bill.sponsors.map((sponsor) => sponsor.sponsor.as.showAs)}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          marginTop: '50px',
        }}
      >
        <Pagination count={3} color="primary" size="large" />
      </Box>
      <BillModal open={isModalOpen} onClose={handleCloseModal} bill={selectedBill} />
    </Container>
  );
};
