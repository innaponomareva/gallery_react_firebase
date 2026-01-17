import { useContext } from 'react';
import { AlertContext } from './alertContext';

export const useAlertState = () => useContext(AlertContext);
