import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const fetchServices = async (category: string, location: string) => {
  const { data } = await API.get(`/api/services?category=${category}&location=${location}`);
  return data;
};
