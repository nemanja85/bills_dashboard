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
					position: "relative",
					top: "50%",
					transform: "translateY(-50%)",
					padding: 4,
					backgroundColor: "#fff",
					color: "#000",
					margin: "auto",
					marginTop: "20px",
					width: "55%",
					height: "50vh",
					"overflow-y": "auto",
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
								<h2>{bill.shortTitleEn}</h2>
								<div dangerouslySetInnerHTML={{ __html: bill.longTitleEn }} />
							</Typography>
						)}
						{value === 1 && (
							<Typography variant="body1" sx={{ mt: 2 }}>
								<h2>{bill.shortTitleGa}</h2>
								<div dangerouslySetInnerHTML={{ __html: bill.longTitleGa }} />
							</Typography>
						)}
					</Fragment>
				))}
			</Box>
		</Modal>
	);
};
