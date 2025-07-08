import { Container } from "@mui/material";
import { BillTable } from "./components/BillTable";

function App() {
	return (
		<Container>
			<h1>Bills Information:</h1>
			<BillTable />
		</Container>
	);
}

export default App;
