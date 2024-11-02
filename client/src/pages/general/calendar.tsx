import { useEffect, useState } from 'react';

import DatePicker from '../../components/date-picker';
import Button from '../../components/button';

const Calendars = () => {
	const [createEventModalOpen, setCreateEventModalOpen] = useState(false);
	const [calendarViewDropdownOpen, setCalendarViewDropdownOpen] =
		useState(false);
	const [calendarView, setCalendarView] = useState<
		'day' | 'week' | 'month' | 'year'
	>('month');
	const [selectedYear, setSelectedYear] = useState<number>(
		new Date().getFullYear()
	);
	const [selectedMonth, setSelectedMonth] = useState<number>(
		new Date().getMonth() + 1
	);
	const [monthDays, setMonthDays] = useState<Date[]>([]);

	const weekdays = [
		{
			name: 'Sunday',
			initial: 'S',
			short: 'Sun',
		},
		{
			name: 'Monday',
			initial: 'M',
			short: 'Mon',
		},
		{
			name: 'Tuesday',
			initial: 'T',
			short: 'Tue',
		},
		{
			name: 'Wednesday',
			initial: 'W',
			short: 'Wed',
		},
		{
			name: 'Thursday',
			initial: 'T',
			short: 'Thu',
		},
		{
			name: 'Friday',
			initial: 'F',
			short: 'Fri',
		},
		{
			name: 'Saturday',
			initial: 'S',
			short: 'Sat',
		},
	];

	const toggleCalendarViewDropdown = () => {
		setCalendarViewDropdownOpen(!calendarViewDropdownOpen);
	};

	const toggleCreateEventModal = () => {
		setCreateEventModalOpen(!createEventModalOpen);
	};

	const now = new Date();
	const today = now.getDate();
	const currentMonth = now.getMonth() + 1;

	const getFirstDayOfMonth = (year: number, month: number) => {
		return new Date(year, month - 1, 1);
	};

	const getLastDayOfMonth = (year: number, month: number) => {
		return new Date(year, month, 0);
	};

	const getDaysArrayForMonth = (year: number, month: number) => {
		const daysArray = [];
		const firstDay = getFirstDayOfMonth(year, month);
		const lastDay = getLastDayOfMonth(year, month);
		const currentDate = new Date(firstDay);

		const firstDayOfWeek = firstDay.getDay();
		if (firstDayOfWeek > 0) {
			const prevMonthLastDay = new Date(year, month - 1, 0);
			for (let i = firstDayOfWeek - 1; i >= 0; i--) {
				const day = new Date(prevMonthLastDay);
				day.setDate(prevMonthLastDay.getDate() - i);
				daysArray.unshift(day);
			}
		}

		while (currentDate <= lastDay) {
			daysArray.push(new Date(currentDate));
			currentDate.setDate(currentDate.getDate() + 1);
		}

		while (daysArray.length < 42) {
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

	const handleViewChange = (e: React.MouseEvent<HTMLElement>) => {
		const view = e.currentTarget.id as 'day' | 'week' | 'month';
		setCalendarView(view);
		setCalendarViewDropdownOpen(false);
	};

	useEffect(() => {
		setMonthDays(getDaysArrayForMonth(selectedYear, selectedMonth));
	}, [getDaysArrayForMonth, selectedMonth, selectedYear]);

	const renderCalendar = () => {
		switch (calendarView) {
			case 'day':
				return (
					<div className="flex w-full h-full">
						<div className="flex-1 bg-red-500 flex overflow-auto no-scrollbar">
							<div className="w-16 bg-neutral-900 border-r border-neutral-700 flex flex-col h-max">
								{Array.from({ length: 24 }, (_, i) => {
									const hour = i % 12 === 0 ? 12 : i % 12;
									const period = i < 12 ? 'AM' : 'PM';
									return (
										<div
											key={i}
											className={`h-44 ${
												i === 23 ? '' : 'border-b'
											} border-neutral-700 flex items-center justify-center relative`}>
											<span className="text-neutral-400 absolute text-xs">
												{hour} {period}
											</span>
										</div>
									);
								})}
							</div>
							<div className="bg-neutral-700 text-xs leading-6 flex flex-auto h-max">
								<div className="w-full gap-px">
									<div className="bg-neutral-800">
										{Array.from({ length: 24 }, (_, j) => (
											<div
												key={j}
												className={`h-44 ${
													j === 23 ? '' : 'border-b'
												} border-neutral-700`}></div>
										))}
									</div>
								</div>
							</div>
						</div>

						<div className="w-max hidden md:flex justify-center pt-2.5 px-2.5">
							<DatePicker />
						</div>
					</div>
				);
			case 'week':
				return (
					<>
						<div className="flex w-full">
							<div className="hidden md:block w-16 bg-neutral-800 border-b border-neutral-700"></div>
							<div className="flex-1">
								<div className="grid grid-cols-7 gap-px border-b border-neutral-700 bg-neutral-800 text-center text-xs font-semibold leading-6 lg:flex-none">
									{weekdays.map((day, index) => (
										<div
											key={index}
											className="flex flex-col md:flex-row md:gap-2 justify-center bg-neutral-800 text-neutral-400 py-2">
											<div>
												<span className="md:hidden">{day.initial}</span>
												<span className="hidden md:block">{day.short}</span>
											</div>

											<span>-</span>
										</div>
									))}
								</div>
							</div>
						</div>

						<div className="flex flex-1 overflow-auto no-scrollbar">
							<div className="w-16 bg-neutral-900 border-r border-neutral-700 flex flex-col h-max">
								{Array.from({ length: 48 }, (_, i) => {
									const hour =
										Math.floor(i / 2) % 12 === 0 ? 12 : Math.floor(i / 2) % 12;
									const period = i < 24 ? 'AM' : 'PM';
									return (
										<div
											key={i}
											className={`h-20 ${
												i === 47 ? '' : 'border-b'
											} border-neutral-900 flex items-start justify-center relative`}>
											{i % 2 === 0 && !(i === 0) ? (
												<span className="text-neutral-400 absolute -top-2 text-xs">
													{hour} {period}
												</span>
											) : null}
										</div>
									);
								})}
							</div>

							<div className="hidden bg-neutral-700 text-xs leading-6 md:flex flex-auto h-max">
								<div className="w-full grid grid-cols-7 gap-px">
									{Array.from({ length: 7 }, (_, i) => (
										<div key={i} className="bg-neutral-800">
											{Array.from({ length: 48 }, (_, j) => (
												<div
													key={j}
													className={`h-20 ${
														j === 47 ? '' : 'border-b'
													} border-neutral-700`}></div>
											))}
										</div>
									))}
								</div>
							</div>

							<div className="flex md:hidden w-full bg-neutral-700 flex-col">
								{Array.from({ length: 48 }, (_, j) => (
									<div
										key={j}
										className={`min-h-20 ${
											j === 47 ? '' : 'border-b'
										} border-neutral-700 bg-neutral-800`}></div>
								))}
							</div>
						</div>
					</>
				);
			case 'month':
				return (
					<div className="flex-1 w-full">
						<div className="grid grid-cols-7 gap-px border-b border-neutral-700 bg-neutral-800 text-center text-xs font-semibold leading-6 lg:flex-none">
							{weekdays.map((day, index) => (
								<div
									key={index}
									className="flex justify-center bg-neutral-800 text-neutral-400 py-2">
									<span className="md:hidden">{day.initial}</span>
									<span className="hidden md:block">{day.short}</span>
								</div>
							))}
						</div>

						<div className="flex bg-neutral-700 text-xs leading-6 lg:flex-auto h-full">
							<div className="hidden w-full md:grid md:grid-cols-7 md:grid-rows-6 md:gap-px">
								{monthDays.map((date, index) => {
									return (
										<div
											key={index}
											className={
												`p-1 flex-grow overflow-auto cursor-pointer ` +
												(date.getMonth() === selectedMonth - 1
													? 'bg-neutral-800'
													: 'bg-neutral-900')
											}>
											<div className="flex flex-col h-full mx-auto overflow-hidden p-2">
												<div className="top h-5 w-full text-sm">
													<span
														className={`text-neutral-400 ${
															date.getDate() === today &&
															date.getMonth() + 1 === currentMonth
																? 'text-primary'
																: ''
														}`}>
														{date.getDate()}
													</span>
												</div>
												<div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
											</div>
										</div>
									);
								})}
							</div>

							<div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px md:hidden h-full">
								{monthDays.map((date, index) => {
									return (
										<button
											key={index}
											className={`p-1 flex-grow overflow-auto cursor-pointer ${
												date.getMonth() + 1 === selectedMonth
													? 'bg-neutral-800'
													: 'bg-neutral-900'
											}`}>
											<div className="flex flex-col h-full mx-auto overflow-hidden p-2">
												<div className="top h-5 w-full text-sm text-start">
													<span
														className={`text-neutral-400 ${
															date.getDate() === today &&
															date.getMonth() + 1 === currentMonth
																? 'text-primary'
																: ''
														}`}>
														{date.getDate()}
													</span>
												</div>
												<div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
											</div>
										</button>
									);
								})}
							</div>
						</div>
					</div>
				);
			default:
				return <div>Month View</div>;
		}
	};

	return (
		<div className="flex flex-1 flex-col p-2.5">
			<header className="flex items-center justify-between pb-2.5 lg:flex-none">
				{calendarView === 'day' && (
					<h3 className="text-2xl text-neutral-200 font-bold">
						Monday, June 3rd, 2024
					</h3>
				)}

				{calendarView === 'week' && (
					<h3 className="text-2xl text-neutral-200 font-bold">
						June 2nd - June 8th
					</h3>
				)}

				{calendarView === 'month' && (
					<h3 className="text-2xl text-neutral-200 font-bold">
						{new Date(selectedYear, selectedMonth - 1).toLocaleString(
							'default',
							{
								month: 'long',
								year: 'numeric',
							}
						)}
					</h3>
				)}

				<div className="flex items-center gap-2.5">
					<div className="hidden md:block">
						<Button
							onClick={toggleCreateEventModal}
							text="Add Event"
							theme="full"
							type="button"
						/>
					</div>

					<div className="relative md:hidden"></div>

					<div>
						<div className="relative">
							<button
								type="button"
								onClick={toggleCalendarViewDropdown}
								className="w-full md:w-auto md:flex items-center justify-center py-2 px-4 text-sm font-medium focus:outline-none rounded-lg border hover:text-primary bg-neutral-800 text-neutral-400 border-neutral-600 hover:bg-neutral-700 hidden">
								View
								<svg
									className="-mr-1 ml-1.5 w-5 h-5"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true">
									<path
										clipRule="evenodd"
										fillRule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									/>
								</svg>
							</button>

							<button
								type="button"
								onClick={toggleCalendarViewDropdown}
								className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-neutral-400 hover:text-neutral-400 md:hidden">
								<span className="sr-only">Open menu</span>
								<svg
									className="h-5 w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true">
									<path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
								</svg>
							</button>

							{calendarViewDropdownOpen && (
								<div className="absolute right-0 z-10 mt-2.5 w-36 origin-top-right divide-y md:divide-y-0 divide-neutral-700 overflow-hidden rounded-lg bg-neutral-800 text-neutral-400 border border-neutral-700 shadow-xl focus:outline-none">
									<div className="py-1 md:hidden" role="none">
										<button className="px-4 py-2 text-sm w-full hover:bg-neutral-700 text-left">
											Create event
										</button>
									</div>
									<div className="py-1" role="none">
										<button
											id="day"
											onClick={handleViewChange}
											className="px-4 py-2 text-sm w-full hover:bg-neutral-700 text-left">
											Day view
										</button>
										<button
											id="week"
											onClick={handleViewChange}
											className="px-4 py-2 text-sm w-full hover:bg-neutral-700 text-left">
											Week view
										</button>
										<button
											id="month"
											onClick={handleViewChange}
											className="px-4 py-2 text-sm w-full hover:bg-neutral-700 text-left">
											Month view
										</button>
									</div>
								</div>
							)}
						</div>
					</div>

					<div className="relative flex items-center shadow-sm h-max">
						<button
							type="button"
							onClick={handlePrevMonth}
							className="flex p-2 h-full items-center justify-center rounded-l-md border-y border-l border-neutral-700 text-neutral-400 hover:text-primary focus:relative  md:hover:bg-neutral-700 bg-neutral-800">
							<span className="sr-only">Previous month</span>
							<svg
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true">
								<path
									fillRule="evenodd"
									d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
									clipRule="evenodd"
								/>
							</svg>
						</button>

						<button
							type="button"
							onClick={() => {
								setSelectedYear(new Date().getFullYear());
								setSelectedMonth(new Date().getMonth() + 1);
							}}
							className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium focus:outline-none border hover:text-primary bg-neutral-800 text-neutral-400 border-neutral-600 hover:bg-neutral-700">
							Today
						</button>

						<button
							type="button"
							onClick={handleNextMonth}
							className="flex p-2 items-center justify-center rounded-r-md border-y border-r border-neutral-700 text-neutral-400 hover:text-primary focus:relative md:hover:bg-neutral-700 bg-neutral-800">
							<span className="sr-only">Next month</span>

							<svg
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true">
								<path
									fillRule="evenodd"
									d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					</div>
				</div>
			</header>

			<div className="flex flex-auto flex-col rounded-lg overflow-clip border border-neutral-700 shadow-xl h-full">
				{renderCalendar()}
			</div>
		</div>
	);
};

export default Calendars;
