import { useContext } from 'react';
import { ToastContext, ToastContextType } from '../contexts/toast-context';

export const useToast = (): ToastContextType => {
	const context = useContext(ToastContext);
	if (context === undefined) {
		throw new Error('useToast must be used within a ToastProvider');
	}
	return context;
};