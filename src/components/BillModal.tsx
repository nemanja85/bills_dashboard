import { Box, Modal, Tab, Tabs, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { useBills } from "../hooks/useBills";
import { type BillModalProps } from "../types";

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
				<Tabs
					sx={{ "border-bottom": "1px solid #2196f3", marginBottom: "30px" }}
					value={value}
					onChange={handleChange}
				>
					<Tab
						sx={{ "border-right": "1px solid #2196f3", marginRight: "5px" }}
						label="English"
					/>
					<Tab label="Gaeilge" />
				</Tabs>
				{data?.bills.map((bill) => (
					<Fragment key={bill.act.actNo}>
						{value === 0 && (
							<Typography variant="body1" sx={{ mt: 2 }}>
								<h3 style={{ color: "#1883ef" }}>{bill.act.shortTitleEn}</h3>
								<div
									dangerouslySetInnerHTML={{ __html: bill.act.shortTitleGa }}
								/>
							</Typography>
						)}
						{value === 1 && (
							<Typography variant="body1" sx={{ mt: 2 }}>
								<h3 style={{ color: "#1883ef" }}>{bill.act.shortTitleGa}</h3>
								<div
									dangerouslySetInnerHTML={{ __html: bill.act.longTitleGa }}
								/>
							</Typography>
						)}
					</Fragment>
				))}
			</Box>
		</Modal>
	);
};
