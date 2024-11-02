import { useEffect, useState } from 'react';

const DatePicker = () => {
	const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

	const [monthDays, setMonthDays] = useState<Date[]>([]);

	const getFirstDayOfMonth = (year: number, month: number) => {
		const firstDay = new Date(year, month, 1);
		return firstDay;
	};

	const getLastDayOfMonth = (year: number, month: number) => {
		const lastDay = new Date(year, month + 1, 0);
		return lastDay;
	};

	const getDaysArrayForMonth = (year: number, month: number) => {
		const firstDay = getFirstDayOfMonth(year, month);
		const lastDay = getLastDayOfMonth(year, month);
		const daysArray = [];
		const currentDate = new Date(firstDay);

		while (currentDate <= lastDay) {
			daysArray.push(new Date(currentDate));
			currentDate.setDate(currentDate.getDate() + 1);
		}

		return daysArray;
	};

	const handlePrevMonth = () => {
		if (selectedMonth === 1) {
			setSelectedYear((prevYear) => prevYear - 1);
			setSelectedMonth(12);
		} else {
			setSelectedMonth((prevMonth) => prevMonth - 1);
		}
	};

	const handleNextMonth = () => {
		if (selectedMonth === 12) {
			setSelectedYear((prevYear) => prevYear + 1);
			setSelectedMonth(1);
		} else {
			setSelectedMonth((prevMonth) => prevMonth + 1);
		}
	};

	useEffect(() => {
		const daysArray = getDaysArrayForMonth(selectedYear, selectedMonth - 1);
		const firstDayOfWeek = daysArray[0].getDay();
		const lastDayOfWeek = daysArray[daysArray.length - 1].getDay();

		if (firstDayOfWeek > 0) {
			for (let i = 0; i < firstDayOfWeek; i++) {
				daysArray.unshift(new Date(selectedYear, selectedMonth - 1, -i));
			}
		}

		if (lastDayOfWeek < 6) {
			for (let i = 1; i <= 6 - lastDayOfWeek; i++) {
				daysArray.push(new Date(selectedYear, selectedMonth, i));
			}
		}

		setMonthDays(daysArray);
	}, [selectedMonth, selectedYear]);

	return (
		<div className="flex flex-col w-max h-max">
			<div className="flex items-center justify-between">
				<button
					onClick={handlePrevMonth}
					className="flex items-center justify-center p-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900">
					<svg
						fill="none"
						stroke="currentColor"
						strokeWidth={1.5}
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
						className="h-4 w-4 text-neutral-900 dark:text-neutral-600">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 19.5L8.25 12l7.5-7.5"
						/>
					</svg>
				</button>

				<button
					onClick={() => {
						setSelectedYear(new Date().getFullYear());
						setSelectedMonth(new Date().getMonth() + 1);
					}}>
					<div className="text-sm font-semibold text-neutral-200">
						{new Date(selectedYear, selectedMonth - 1).toLocaleString(
							'default',
							{
								month: 'long',
								year: 'numeric',
							}
						)}
					</div>
				</button>

				<button
					onClick={handleNextMonth}
					className="flex items-center justify-center p-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900">
					<svg
						fill="none"
						stroke="currentColor"
						strokeWidth={1.5}
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
						className="h-4 w-4 text-neutral-900 dark:text-neutral-600">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M8.25 4.5l7.5 7.5-7.5 7.5"
						/>
					</svg>
				</button>
			</div>

			<div className="grid grid-cols-7 text-xs text-center text-neutral-900 dark:text-white">
				<span className="flex items-center justify-center w-10 h-10 font-semibold rounded-lg">
					Su
				</span>
				<span className="flex items-center justify-center w-10 h-10 font-semibold rounded-lg">
					Mo
				</span>
				<span className="flex items-center justify-center w-10 h-10 font-semibold rounded-lg">
					Tu
				</span>
				<span className="flex items-center justify-center w-10 h-10 font-semibold rounded-lg">
					We
				</span>
				<span className="flex items-center justify-center w-10 h-10 font-semibold rounded-lg">
					Th
				</span>
				<span className="flex items-center justify-center w-10 h-10 font-semibold rounded-lg">
					Fri
				</span>
				<span className="flex items-center justify-center w-10 h-10 font-semibold rounded-lg">
					Sa
				</span>
				{monthDays.map((date, index) => (
					<button key={index}>
						<div className={`bg-opacity-50`}>
							<span
								className={`flex items-center justify-center w-10 h-10 font-semibold hover:rounded-lg ${
									date.getMonth() === selectedMonth - 1
										? 'text-white hover:bg-neutral-900'
										: 'text-neutral-600 hover:bg-neutral-900'
								}  
														
													}`}>
								{date.getDate()}
							</span>
						</div>
					</button>
				))}
			</div>
		</div>
	);
};

export default DatePicker;
