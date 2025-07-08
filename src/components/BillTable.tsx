import StarIcon from "@mui/icons-material/Star";
import {
	Box,
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useMemo, useState } from "react";
import { useBills } from "../hooks/useBills";
import { type BillTableProps, type GetBillsResponse } from "../types";
import { BillModal } from "./BillModal";
import { Pagination } from "./Pagination";

export const BillTable = ({ onRowClick }: BillTableProps) => {
	const { error, isLoading, data } = useBills();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedBill, setSelectedBill] = useState<GetBillsResponse | null>(
		null,
	);
	const [filterStatus, setFilterStatus] = useState<string>("");

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

	const filteredBills = useMemo(() => {
		if (!data) return [];
		if (!filterStatus) return data;
		return data.filter((bill) => bill.bill_status === filterStatus);
	}, [data, filterStatus]);

	const uniqueBillStatuses = useMemo(() => {
		if (!data) return [];
		const statuses = new Set<string>();
		data.forEach((bill) => statuses.add(bill.bill_status));
		return Array.from(statuses);
	}, [data]);

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
				<FormControl sx={{ my: 5, minWidth: 200 }}>
					<InputLabel id="bill-status-select-label">
						Filter by Status
					</InputLabel>
					<Select
						labelId="bill-status-select-label"
						id="bill-status-select"
						value={filterStatus}
						label="Filter by Status"
						//@ts-ignore
						onChange={handleFilterChange}
						sx={{
							color: "#000",
							"& .MuiOutlinedInput-notchedOutline": {
								borderColor: "#000",
							},
							"& .MuiSvgIcon-root": {
								color: "#000",
							},
							"&:hover .MuiOutlinedInput-notchedOutline": {
								borderColor: "#000",
							},
							"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
								borderColor: "#000",
							},
						}}
						MenuProps={{
							PaperProps: {
								sx: {
									backgroundColor: "#fff",
									color: "#000",
									border: "1px solid #000",
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
					backgroundColor: "GrayText",
					color: "#1565c0",
					margin: "2px",
					marginTop: "10px",
					width: "90%",
					borderRadius: 2,
				}}
			>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Icon</TableCell>
								<TableCell>Bill Number</TableCell>
								<TableCell>Bill Type</TableCell>
								<TableCell>Bill Status</TableCell>
								<TableCell>Sponsor</TableCell>
							</TableRow>
						</TableHead>
						<TableBody sx={{ cursor: "pointer" }}>
							{filteredBills?.length === 0 ? (
								<TableRow>
									<TableCell colSpan={5} align="center">
										<Typography variant="subtitle1" color="textSecondary">
											No bills to display
										</Typography>
									</TableCell>
								</TableRow>
							) : (
								filteredBills?.map((bill, index) => (
									<TableRow
										key={bill.bill_id || index}
										onClick={() => handleRowClick(bill)}
									>
										<TableCell>
											<IconButton aria-label="star">
												<StarIcon color="disabled" />
											</IconButton>
										</TableCell>
										<TableCell>{bill.billNo}</TableCell>
										<TableCell>{bill.billType}</TableCell>
										<TableCell>{bill.bill_status}</TableCell>
										<TableCell>
											{bill.sponsors.map(
												(sponsor) => sponsor.sponsor.as.showAs,
											)}
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					width: "100%",
					marginTop: "50px",
				}}
			>
				<Pagination page={2} color="standard" size="large" />
			</Box>
			<BillModal
				open={isModalOpen}
				onClose={handleCloseModal}
				bill={selectedBill} // Pass the selected bill to the modal
			/>
		</Container>
	);
};
