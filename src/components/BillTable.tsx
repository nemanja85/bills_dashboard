import StarIcon from "@mui/icons-material/Star";
import {
	Box,
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useBills } from "../hooks/useBills";
import { type BillTableProps } from "../types";
import { Pagination } from "./Pagination";

export const BillTable = ({ onRowClick }: BillTableProps) => {
	const { error, isLoading, data } = useBills();

	if (isLoading) return <Typography>Loading Bills...</Typography>;
	if (error)
		return (
			<Typography color="error">
				Error fetching bills: {error.message}
			</Typography>
		);

	return (
		<Container>
			<Box
				sx={{
					padding: 1,
					backgroundColor: "#03DAC6",
					color: "#018786",
					margin: "2px",
					marginTop: "10px",
					width: "90%",
					borderRadius: 4,
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
						<TableBody>
							{data?.length === 0 ? (
								<TableRow>
									<TableCell colSpan={5} align="center">
										<Typography variant="subtitle1" color="textSecondary">
											No bills to display
										</Typography>
									</TableCell>
								</TableRow>
							) : (
								data?.map((bill, index) => (
									<TableRow key={index}>
										<TableCell>
											<IconButton aria-label="star">
												<StarIcon color="disabled" />
											</IconButton>
										</TableCell>
										<TableCell>{bill.billNo}</TableCell>
										<TableCell>{bill.billType}</TableCell>
										<TableCell>{bill.bill_status}</TableCell>
										<TableCell>bill.sponsors</TableCell>
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
		</Container>
	);
};
