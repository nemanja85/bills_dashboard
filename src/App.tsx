import { Container } from "@mui/material";
import { useState } from "react";
import { BillTable } from "./components/BillTable";
import { type BillProps } from "./types";

function App() {
	return (
		<Container>
			<h1>Bills Information:</h1>
			<BillTable />
		</Container>
	);
}

export default App;
