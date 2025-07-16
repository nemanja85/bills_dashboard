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
import React, {
	Fragment,
	useEffect,
	useMemo,
	useState,
	type ChangeEvent,
} from "react";
import { useBills } from "../hooks/useBills";
import {
	type BillFavoriteProps,
	type BillTableProps,
	type GetBillsResponse,
} from "../types";
import { BillModal } from "./BillModal";
import { Pagination } from "./Pagination";

// --- Mock API Call  ---
const mockUpdateFavoriteStatus = async (
	billNo: string,
	isFavorited: boolean,
) => {
	return new Promise<void>((resolve) => {
		setTimeout(() => {
			console.log(
				`[MOCK SERVER]: ${isFavorited ? "Un-favourite" : "Favourite"} bill with ID: ${billNo}`,
			);
			resolve();
		}, 200);
	});
};
// --- End Mock API Call ---

export const BillTable = ({ onRowClick }: BillTableProps) => {
	const { error, isLoading, data } = useBills();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedBill, setSelectedBill] = useState<GetBillsResponse | null>(
		null,
	);

	const [filterStatus, setFilterStatus] = useState<string>("");
	// 0: All Bills, 1: Favorited Bills
	const [currentTab, setCurrentTab] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [favoritedBills, setFavoritedBills] = useState<Set<string>>(() => {
		try {
			const storedFavorites = localStorage.getItem("favoritedBills");
			return storedFavorites ? new Set(JSON.parse(storedFavorites)) : new Set();
		} catch (e) {
			console.error("Failed to load favorited bills from localStorage", e);
			return new Set();
		}
	});

	useEffect(() => {
		try {
			localStorage.setItem(
				"favoritedBills",
				JSON.stringify(Array.from(favoritedBills)),
			);
		} catch (e) {
			console.error("Failed to save favorited bills", e);
		}
	}, [favoritedBills]);

	const handleRowClick = (bill: GetBillsResponse) => {
		setSelectedBill(bill);
		setIsModalOpen(true);
		if (onRowClick) {
			onRowClick(bill);
		}
	};

	const RECORDS_PER_PAGE = 10;

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedBill(null);
	};

	const handleFilterChange = (event: React.ChangeEvent<{ value: string }>) => {
		setFilterStatus(event.target.value);
		setCurrentPage(1);
	};
	const handleToggleFavorite = async ({
		event,
		billNo,
		isFavorited,
	}: BillFavoriteProps) => {
		event.stopPropagation();

		const newFavoritedBills = new Set(favoritedBills);

		isFavorited
			? newFavoritedBills.delete(billNo)
			: newFavoritedBills.add(billNo);

		setFavoritedBills(newFavoritedBills);

		try {
			await mockUpdateFavoriteStatus(billNo, isFavorited);
		} catch (error) {
			console.error("Failed to update favorite status:", error);
		}
	};

	const allBills = useMemo(() => {
		return data?.bills || [];
	}, [data]);

	const favoritedBillsData = useMemo(() => {
		return allBills.filter((bill) => favoritedBills.has(bill.billNo));
	}, [allBills, favoritedBills]);

	const filteredAndTabbedBills = useMemo(() => {
		let billsToDisplay = [];

		if (currentTab === 0) {
			billsToDisplay = allBills;
		} else if (currentTab === 1) {
			billsToDisplay = favoritedBillsData;
		}

		if (filterStatus) {
			billsToDisplay = billsToDisplay.filter(
				(bill) => bill.status === filterStatus,
			);
		}
		return billsToDisplay;
	}, [allBills, favoritedBillsData, currentTab, filterStatus]);

	const totalBillCount = filteredAndTabbedBills.length;
	const totalPages = Math.ceil(totalBillCount / RECORDS_PER_PAGE);

	const paginatedBills = useMemo(() => {
		const startIndex = (currentPage - 1) * RECORDS_PER_PAGE;
		const endIndex = startIndex + RECORDS_PER_PAGE;
		return filteredAndTabbedBills.slice(startIndex, endIndex);
	}, [filteredAndTabbedBills, currentPage, RECORDS_PER_PAGE]);

	const uniqueBillStatuses = useMemo(() => {
		if (!data) return [];
		const statuses = new Set<string>();
		data.bills.forEach((bill) => statuses.add(bill.status));
		return Array.from(statuses).sort();
	}, [data?.bills]);

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setCurrentTab(newValue);
		setFilterStatus("");
		setCurrentPage(1);
	};

	const handlePageChange = (event: ChangeEvent, value: number) => {
		setCurrentPage(value);
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
					onChange={handleTabChange}
					sx={{ "border-bottom": "1px solid #2196f3", "margin-bottom": "30px" }}
					aria-label="bill table tabs"
				>
					<Tab label="All Bills" />
					<Tab label="Favorited Bills" />
				</Tabs>
			</Box>
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
							color: "#2196f3",
							"& .MuiOutlinedInput-notchedOutline": {
								borderColor: "#2196f3",
							},
							"& .MuiSvgIcon-root": {
								color: "#2196f3",
							},
							"&:hover .MuiOutlinedInput-notchedOutline": {
								borderColor: "2196f3",
							},
							"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
								borderColor: "2196f3",
							},
						}}
						MenuProps={{
							PaperProps: {
								sx: {
									fontSize: "16px",
									fontWeight: "bold",
									backgroundColor: "#2196f3",
									color: "white",
								},
							},
						}}
					>
						<MenuItem value="">
							<em>All Statuses</em>
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
					backgroundColor: "#2196f3",
					color: "#1565c0",
					marginTop: "10px",
					width: "100%",
					borderRadius: 2,
				}}
			>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow sx={{ width: "100%", backgroundColor: "#1883ef" }}>
								<TableCell
									sx={{
										fontSize: "16px",
										fontWeight: "bold",
										letterSpacing: "0.05em",
										color: "white",
									}}
								>
									Icon
								</TableCell>
								<TableCell
									sx={{
										fontSize: "16px",
										fontWeight: "bold",
										letterSpacing: "0.05em",
										color: "white",
									}}
								>
									Bill Number
								</TableCell>
								<TableCell
									sx={{
										fontSize: "16px",
										fontWeight: "bold",
										letterSpacing: "0.05em",
										color: "white",
									}}
								>
									Bill Type
								</TableCell>
								<TableCell
									sx={{
										fontSize: "16px",
										fontWeight: "bold",
										letterSpacing: "0.05em",
										color: "white",
									}}
								>
									Bill Status
								</TableCell>
								<TableCell
									sx={{
										fontSize: "16px",
										fontWeight: "bold",
										letterSpacing: "0.05em",
										color: "white",
									}}
								>
									Sponsor
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody sx={{ cursor: "pointer" }}>
							{paginatedBills?.length === 0 ? (
								<TableRow sx={{ backgroundColor: "#bce0fb" }}>
									<TableCell colSpan={5} align="center">
										<Typography variant="h5" color="error">
											No bills to display
										</Typography>
									</TableCell>
								</TableRow>
							) : (
								paginatedBills?.map((bill, index) => {
									const isFavorited = favoritedBills.has(bill.billNo);
									return (
										<TableRow
											sx={{ backgroundColor: "#bce0fb" }}
											key={bill.bill_id || index}
											onClick={() => handleRowClick(bill)}
										>
											<TableCell sx={{ borderBottom: "1px solid #1883ef" }}>
												<IconButton
													aria-label="star"
													onClick={(e) =>
														handleToggleFavorite({
															event: e,
															billNo: bill.billNo,
															isFavorited: isFavorited,
														})
													}
												>
													<StarIcon
														color={isFavorited ? "success" : "disabled"}
													/>
												</IconButton>
											</TableCell>
											<TableCell sx={{ borderBottom: "1px solid #1883ef" }}>
												{bill.billNo}
											</TableCell>
											<TableCell sx={{ borderBottom: "1px solid #1883ef" }}>
												{bill.billType}
											</TableCell>
											<TableCell sx={{ borderBottom: "1px solid #1883ef" }}>
												{bill.status}
											</TableCell>
											<TableCell sx={{ borderBottom: "1px solid #1883ef" }}>
												{bill.sponsors
													.map((sponsor) => sponsor.sponsor.as.showAs)
													.join(", ")}{" "}
											</TableCell>
										</TableRow>
									);
								})
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
			{paginatedBills.length > 0 && (
				<Fragment>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							width: "100%",
							marginTop: "50px",
						}}
					>
						<Pagination
							count={totalPages}
							page={currentPage}
							// @ts-ignore
							onChange={handlePageChange}
							variant="outlined"
							shape="rounded"
							color="primary"
							size="large"
						/>
					</Box>
					<BillModal
						open={isModalOpen}
						onClose={handleCloseModal}
						bill={selectedBill}
					/>
				</Fragment>
			)}
		</Container>
	);
};
