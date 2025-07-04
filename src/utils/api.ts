import axios from 'axios';
import { type BillProps, type BillResponseProps } from '../types';

const API_URL = import.meta.env.API_URL;

export const fetchBills = async (): Promise<BillProps[]> => {
  const response = await axios.get<BillResponseProps>(`${API_URL}/legislation`);

  return response.data.results.map(result => result.bill);
};
