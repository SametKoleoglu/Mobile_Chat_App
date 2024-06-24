import axios from 'axios';
import {Platform} from 'react-native';

export const API_ADDRESS = '192.168.1.26';

export const ADDRESS =
  Platform.OS === 'ios'
    ? 'localhost:8000'
    : `192.168.1.26:8000`;

const api = axios.create({
  baseURL: 'http://' + ADDRESS,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
