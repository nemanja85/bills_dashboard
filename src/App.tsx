import { useState } from 'react';
import { Container } from '@mui/material';
import { BillTable } from './components/BillTable';
import { BillModal } from './components/BillModal';
import { type BillProps } from './types';
function App() {

  const [selectedBill, setSelectedBill] = useState<BillProps | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleRowClick = (bill: BillProps) => {
    setSelectedBill(bill);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedBill(null);
  };

  return (
    <Container>
      <h1>Bill Information</h1>
      <BillTable onRowClick={handleRowClick} />
      {selectedBill && <BillModal open={modalOpen} onClose={handleCloseModal} />}
    </Container>
  );
}

export default App;
