import { Box, Modal, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { type BillModalProps } from "../types";

/**
 *
 * @param {boolean} open
 * @param {void} onClose
 */
export const BillModal = ({ open, onClose }: BillModalProps) => {
	const [value, setValue] = useState(0);

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Modal open={open} onClose={onClose}>
			<Box
				sx={{
					padding: 4,
					backgroundColor: "white",
					margin: "auto",
					marginTop: "20px",
					width: "90%",
					borderRadius: 4,
				}}
			>
				<Tabs value={value} onChange={handleChange}>
					<Tab label="English" />
					<Tab label="Gaeilge" />
				</Tabs>
				{value === 0 && <Typography variant="h4">bill.shortTitleEn</Typography>}
				{value === 1 && <Typography variant="h4">bill.shortTitleGa</Typography>}
			</Box>
		</Modal>
	);
};
