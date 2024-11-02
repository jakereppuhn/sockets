import React, { createContext, useState, ReactNode } from 'react';
import { Toast, ToastType } from '../lib/types';
import ToastContainer from '../components/toast';

export interface ToastContextType {
	addToast: (type: ToastType, message: string, action?: () => void) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
	undefined
);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const addToast = (type: ToastType, message: string, action?: () => void) => {
		const id = Date.now();
		setToasts((prev) => [...prev, { id, type, message, action }]);
		setTimeout(() => {
			setToasts((prev) => prev.filter((toast) => toast.id !== id));
		}, 3000);
	};

	return (
		<ToastContext.Provider value={{ addToast }}>
			{children}
			<ToastContainer toasts={toasts} />
		</ToastContext.Provider>
	);
};
