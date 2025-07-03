import { useQuery } from '@tanstack/react-query';
import { fetchBills } from '../utils/api';
import { type BillProps } from '../types';

export const useBills = () => {
  return useQuery<BillProps[], Error>('bills', fetchBills);
};


