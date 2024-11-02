import { Toast } from '../lib/types';

const ToastContainer: React.FC<{ toasts: Toast[] }> = ({ toasts }) => {
	return (
		<div className="fixed bottom-4 right-4 z-50 space-y-2">
			{toasts.map(({ id, type, message, action }) => (
				<div
					key={id}
					className={`flex items-center p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out ${
						type === 'success'
							? 'bg-green-500 text-white'
							: type === 'error'
							? 'bg-red-500 text-white'
							: type === 'warning'
							? 'bg-yellow-500 text-white'
							: 'bg-gray-500 text-white'
					} animate-fade-up`}>
					<span>{message}</span>
					{action && (
						<button
							onClick={action}
							className="ml-4 px-2 py-1 text-sm font-semibold text-white bg-opacity-50 rounded hover:bg-opacity-70">
							Action
						</button>
					)}
				</div>
			))}
		</div>
	);
};

export default ToastContainer;
