import { createElement, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatDate, formatTime } from '../lib/utils';
import modules from '../config/modules';
import { DoorOpenIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react';
import { useTheme } from '../hooks/use-theme-context';

const MainMenu = () => {
	const [time, setTime] = useState<Date>(new Date());
	const [timeFormat, setTimeFormat] = useState('24h');
	const [logoutModalOpen, setLogoutModalOpen] = useState(false);
	const [isShiftPressed, setIsShiftPressed] = useState<boolean>(false);

	const { theme, toggleTheme } = useTheme();

	const navigate = useNavigate();

	const currentDate = new Date();

	const toggleTimeFormat = () => {
		if (timeFormat === '24h') {
			setTimeFormat('12h');
		} else {
			setTimeFormat('24h');
		}
	};

	const toggleLogoutModal = () => {
		setLogoutModalOpen(!logoutModalOpen);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.shiftKey) {
				setIsShiftPressed(true);
			}

			if (event.key === 't' || event.key === 'T') {
				event.preventDefault();
				toggleTheme();
			}

			if (
				event.shiftKey &&
				(event.code.startsWith('Digit') || event.code.startsWith('Numpad'))
			) {
				let index: number | null = null;

				if (event.code.startsWith('Digit')) {
					index = Number(event.code.replace('Digit', ''));
				} else if (event.code.startsWith('Numpad')) {
					index = Number(event.key);
				}

				if (index !== null && modules[index]) {
					const module = modules[index];

					navigate(`${module.path}`);
				}
			}

			if (event.shiftKey && event.key === '~') {
				navigate('/information-technology');
			}
		};

		const handleKeyUp = (event: KeyboardEvent) => {
			if (!event.shiftKey) {
				setIsShiftPressed(false);
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
		};
	}, []);

	return (
		<div className="flex flex-col h-screen w-screen bg-background">
			<div className="flex-1 items-center flex flex-col justify-center gap-12">
				<div className="text-center m-2 select-none text-primary">
					<div>{formatDate(currentDate)}</div>
					<div onClick={toggleTimeFormat} className="cursor-pointer">
						{formatTime(time, timeFormat)}
					</div>
				</div>

				<div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
					{modules.slice(0, 10).map((module, index) => (
						<Link
							key={module.label}
							to={`/${module.path}`}
							className="flex flex-col text-center">
							<div className="bg-primary-foreground p-1 w-24 aspect-square rounded-lg border border-border shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer flex items-center justify-center transform hover:scale-105 relative">
								{<module.icon />}
								{isShiftPressed && (
									<div className="absolute bottom-0 left-0 mx-2 my-1">
										{index}
									</div>
								)}
							</div>
							<p className="text-xs mt-1 text-primary font-semibold">
								{module.label}
							</p>
						</Link>
					))}
					<div className="col-span-1 lg:col-start-3">
						<Link
							key={modules[10].label}
							to={`/${modules[10].path}`}
							className="flex flex-col text-center">
							<div className="bg-primary-foreground p-1 w-24 aspect-square rounded-lg border border-border shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer flex items-center justify-center transform hover:scale-105">
								{createElement(modules[10].icon)}
								{isShiftPressed && (
									<div className="absolute bottom-0 left-0 mx-2 my-1">~</div>
								)}
							</div>
							<p className="text-xs mt-1 text-primary font-semibold">
								{modules[10].label}
							</p>
						</Link>
					</div>
				</div>

				<div className="absolute bottom-0 left-0 p-2 flex gap-2 w-full text-primary">
					<button
						onClick={toggleLogoutModal}
						className="hover:opacity-50 duration-200 transition-all ease-in-out cursor-pointer">
						<DoorOpenIcon />
					</button>

					<Link
						to={'/settings'}
						className=" hover:opacity-50 duration-200 transition-all ease-in-out cursor-pointer">
						<SettingsIcon />
					</Link>

					<button
						onClick={toggleTheme}
						className="hover:opacity-50 duration-200 transition-all ease-in-out cursor-pointer">
						{theme === 'dark' ? <SunIcon /> : <MoonIcon />}
					</button>
				</div>
			</div>

			{logoutModalOpen && (
				<div className="w-screen h-screen bg-black bg-opacity-20 absolute flex items-center justify-center">
					<div className="bg-primary-foreground border border-border shadow p-4 rounded-lg w-full max-w-sm flex flex-col items-center gap-4 justify-center">
						<p className="text-lg">Are you sure you want to logout?</p>

						<div className="flex gap-2">
							<button
								onClick={toggleLogoutModal}
								className="px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-all ease-in-out duration-200">
								Yes
							</button>
							<button
								onClick={toggleLogoutModal}
								className="px-3 py-1.5 bg-neutral-200 rounded-lg hover:bg-neutral-300 transition-all ease-in-out duration-200">
								No
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default MainMenu;
