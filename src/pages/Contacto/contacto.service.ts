import axios from 'axios';
import type { ContactoForm } from './contacto.types';

const API_URL = import.meta.env.VITE_API_URL;

export const enviarContacto = async (data: ContactoForm) => {
  await axios.post(`${API_URL}/contacto`, data);
};
