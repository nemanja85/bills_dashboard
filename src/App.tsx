import { Container } from '@mui/material';
import './App.css';
import { BillTable } from './components/BillTable';

function App() {
  return (
    <Container>
      <h1>Bill Information</h1>
      <BillTable />
    </Container>
  );
}

export default App;
