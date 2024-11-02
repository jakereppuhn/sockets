export const formatDate = (date: Date) => {
	const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const year = date.getFullYear();
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	const month = monthNames[date.getMonth()];
	const day = date.getDate();
	const dayOfWeek = daysOfWeek[date.getDay()];

	const suffix = (day: number) => {
		if (day > 3 && day < 21) return 'th';
		if (day % 10 === 1) return 'st';
		if (day % 10 === 2) return 'nd';
		if (day % 10 === 3) return 'rd';
		return 'th';
	};

	return `${dayOfWeek}, ${month} ${day}${suffix(day)}, ${year}`;
};

export const formatTime = (date: Date, format: string): string => {
	let hours: number = date.getHours();
	const minutes: string = String(date.getMinutes()).padStart(2, '0');
	const seconds: string = String(date.getSeconds()).padStart(2, '0');

	if (format !== '24h') {
		const period: string = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12 || 12;
		return `${hours}:${minutes}:${seconds} ${period}`;
	}

	hours = Number(String(hours).padStart(2, '0'));
	return `${hours}:${minutes}:${seconds}`;
};
