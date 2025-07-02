import axios from 'axios';
import { type BillProps } from '../types';

const API_URL = import.meta.env.REACT_APP_API_URL;

export const fetchBills = async (): Promise<BillProps[]> => {
  const response = await axios.get(`${API_URL}/legislation`);
  return response.data;
};
