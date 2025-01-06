import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';

// Create a typed version of useDispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
