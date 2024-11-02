import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AppProvider } from './contexts/app-context.tsx';
import { ThemeProvider } from './contexts/theme-context.tsx';
import { ToastProvider } from './contexts/toast-context.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AppProvider>
			<ThemeProvider>
				<ToastProvider>
					<App />
				</ToastProvider>
			</ThemeProvider>
		</AppProvider>
	</StrictMode>
);
