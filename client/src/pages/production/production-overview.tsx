import { useToast } from '../../hooks/use-toast-context';

const ProductionOverview = () => {
	const { addToast } = useToast();

	const handleToast = () => {
		addToast('success', 'Hello World', () => {
			console.log('Hello Console!');
		});
	};

	return (
		<div>
			<button onClick={handleToast}>Click Me To Add Toast</button>
		</div>
	);
};

export default ProductionOverview;
