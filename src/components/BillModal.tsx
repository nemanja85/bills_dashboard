import { Box, Modal, Tab, Tabs, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { useBills } from "../hooks/useBills";
import { type BillModalProps } from "../types";

/**
 *
 * @param {boolean} open
 * @param {void} onClose
 */
export const BillModal = ({ open, onClose, bill }: BillModalProps) => {
	const { data } = useBills();
	const [value, setValue] = useState(0);

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Modal open={open} onClose={onClose}>
			<Box
				sx={{
					padding: 4,
					backgroundColor: "#fff",
					color: "#000",
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
				{data?.map((bill, index) => (
					<Fragment key={index}>
						{value === 0 && (
							<Typography variant="body1" sx={{ mt: 2 }}>
								{bill.shortTitleEn}
							</Typography>
						)}
						{value === 1 && (
							<Typography variant="body1" sx={{ mt: 2 }}>
								{bill.shortTitleGa}
							</Typography>
						)}
					</Fragment>
				))}
			</Box>
		</Modal>
	);
};
