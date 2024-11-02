import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
	text?: string;
	type: 'button' | 'link' | 'submit';
	onClick?: () => void;
	theme?: 'full' | 'outline' | 'dark';
	icon?: React.ReactNode;
	destination?: string;
	isLoading?: boolean;
	isDisabled?: boolean;
};

const Button = ({
	text,
	type,
	onClick,
	theme,
	icon,
	destination,
	isLoading,
	isDisabled,
}: Props) => {
	let classes;

	const base =
		'px-4 py-2 rounded-lg text-sm transition duration-200 font-medium flex gap-2 items-center justify-center border';

	const full =
		'bg-primary text-white border-primary hover:bg-secondary hover:text-white hover:border-secondary ' +
		base;

	const outline =
		'bg-white text-primary border-primary hover:bg-primary hover:text-white ' +
		base;

	const dark =
		'bg-neutral-900 text-neutral-400 border-neutral-700 hover:text-primary ' +
		base;

	switch (theme) {
		case 'full':
			classes = full;
			break;
		case 'outline':
			classes = outline;
			break;
		case 'dark':
			classes = dark;
			break;
		default:
			classes = full;
	}

	const loading = classes + ' cursor-not-allowed';

	const disabled =
		'bg-gray-200 text-gray-500 border-2 border-gray-200 cursor-not-allowed ' +
		base;

	const normal = classes;

	const buttonClasses = isLoading ? loading : isDisabled ? disabled : normal;

	const buttonContent = (
		<>
			{isLoading ? (
				<svg
					className="h-5 w-5 animate-spin"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24">
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"></circle>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
				</svg>
			) : (
				icon
			)}
			{text}
		</>
	);

	const button = (
		<button
			className={buttonClasses}
			onClick={onClick}
			disabled={isDisabled || isLoading}>
			{buttonContent}
		</button>
	);

	const submit = (
		<button
			type="submit"
			className={buttonClasses}
			onClick={onClick}
			disabled={isDisabled || isLoading}>
			{buttonContent}
		</button>
	);

	const link = (
		<Link
			className={buttonClasses}
			to={destination ? destination : '/'}
			target="_blank">
			{buttonContent}
		</Link>
	);

	switch (type) {
		case 'button':
			return button;
		case 'submit':
			return submit;
		case 'link':
			return link;
		default:
			return button;
	}
};

export default Button;
