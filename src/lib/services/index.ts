import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import URLs from '../endpoints';

// API call without token
export const ServiceUnAuthAPI = axios.create({
    baseURL: URLs.BASE_URL,
    timeout: 50000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
});

// API call with Access token
export const ServiceAccessAPI = axios.create({
    baseURL: URLs.BASE_URL,
    timeout: 50000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
});

ServiceAccessAPI.interceptors.request.use(
    async (config: any) => {
        try {
            const token = await AsyncStorage.getItem('x_a_t');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('Error retrieving token:', error);
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);
