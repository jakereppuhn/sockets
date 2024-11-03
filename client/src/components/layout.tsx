import {
	ChevronRight,
	HomeIcon,
	MoreVertical,
	Search,
	SettingsIcon,
} from 'lucide-react';
import React, { FC, useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/use-app-context';
import modules, { generalModules } from '../config/modules';
import { useTheme } from '../hooks/use-theme-context';

type LayoutProps = {
	children: React.ReactNode;
};

type SidebarItemProps = {
	label: string;
	path: string;
	icon: FC;
	alert?: boolean;
};

const SidebarItem = ({ label, path, icon: Icon, alert }: SidebarItemProps) => {
	const { sidebarExpanded } = useAppContext();

	return (
		<NavLink
			to={path}
			end
			className={({ isActive }) =>
				`relative flex items-center py-2 px-3 font-medium rounded-md cursor-pointer transition-colors group ${
					isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
				}`
			}>
			<div className={`flex items-center transition-all`}>
				<Icon />
			</div>

			<span
				className={`overflow-hidden transition-all whitespace-nowrap ${
					sidebarExpanded ? 'w-52 ml-3' : 'w-0'
				}`}>
				{label}
			</span>

			{alert && (
				<div
					className={`absolute right-2 w-2 h-2 rounded bg-primary ${
						sidebarExpanded ? '' : 'top-2'
					}`}></div>
			)}

			{!sidebarExpanded && (
				<div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-primary text-primary-foreground text-sm invisible opacity-20 -translate-x-3 transition-all ease-in-out group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-20 whitespace-nowrap">
					{label}
				</div>
			)}
		</NavLink>
	);
};

const Layout = ({ children }: LayoutProps) => {
	const { sidebarExpanded, toggleSidebar } = useAppContext();
	const [commandBoxOpen, setCommandBoxOpen] = useState(false);
	const boxRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const location = useLocation();
	const currentPath = location.pathname.substring(1);

	const parentModule = modules.find((module) =>
		currentPath.startsWith(module.path)
	);
	const { toggleTheme } = useTheme();

	const navigate = useNavigate();

	const handleKeyDown = (event: KeyboardEvent) => {
		const inputFocus =
			document.activeElement && document.activeElement.tagName === 'INPUT';

		if (event.key === '[' && !inputFocus) {
			event.preventDefault();
			toggleSidebar();
		}

		if ((event.key === 't' || event.key === 'T') && !inputFocus) {
			event.preventDefault();
			toggleTheme();
		}

		if (event.shiftKey && event.code === 'Space') {
			event.preventDefault();
			setCommandBoxOpen((prev) => !prev);
		}

		if (event.shiftKey && event.code === 'Escape') {
			event.preventDefault();
			navigate('/');
		}

		if (event.code === 'Escape' && commandBoxOpen) {
			setCommandBoxOpen(false);
		}
	};

	useEffect(() => {
		if (commandBoxOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [commandBoxOpen]);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
				setCommandBoxOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [boxRef]);

	return (
		<div className="h-screen w-screen flex overflow-hidden">
			<aside className="max-w-60 h-full">
				<nav className="bg-card border-r border-border shadow-sm flex flex-col h-full px-3 pt-2">
					<div className="flex items-center justify-between">
						<div
							className={`overflow-hidden whitespace-nowrap transition-all ease-in-out ${
								sidebarExpanded ? 'w-32' : 'w-0'
							}`}>
							Coe Press
						</div>

						<button
							onClick={toggleSidebar}
							className="py-2 px-3 rounded-lg hover:bg-muted focus:outline-none">
							<ChevronRight
								className={`transition-all ease-in-out ${
									sidebarExpanded ? '-rotate-180' : ''
								}`}
							/>
						</button>
					</div>

					<hr className="mt-2" />

					<div className="flex-1 flex flex-col gap-2 mt-2">
						{generalModules.map((link) => (
							<SidebarItem
								key={link.label}
								label={link.label}
								path={link.path}
								icon={link.icon}
							/>
						))}

						<hr />

						{parentModule?.children?.map((link) => (
							<SidebarItem
								key={link.label}
								label={link.label}
								path={link.path}
								icon={link.icon}
							/>
						))}

						<hr />

						<SidebarItem label="Main Menu" path="/" icon={HomeIcon} />
						<SidebarItem label="Settings" path="settings" icon={SettingsIcon} />
					</div>

					<div className="border-t flex py-2">
						<div className="w-12 h-12 rounded-lg overflow-clip border shrink-0 flex items-center justify-center">
							JR
						</div>

						<div
							className={`flex justify-between items-center overflow-hidden transition-all ${
								sidebarExpanded ? 'w-32 ml-3' : 'w-0 ml-0'
							} `}>
							<div className="leading-4">
								<h4>Jacob R.</h4>

								<span className="text-xs text-gray-600">jar@cpec.com</span>
							</div>

							<MoreVertical size={20} />
						</div>
					</div>
				</nav>
			</aside>

			<main className="overflow-y-auto flex-1 flex">{children}</main>

			{commandBoxOpen && (
				<div className="w-screen h-screen absolute top-0 left-0 z-50 flex items-center justify-center pointer-events-none">
					<div
						ref={boxRef}
						className="w-full max-w-lg bg-primary-foreground h-full max-h-96 pointer-events-auto rounded-lg border overflow-clip">
						<div className="flex w-full py-2 px-4 gap-4 items-center">
							<Search size={16} />
							<input
								type="text"
								ref={inputRef}
								className="w-full bg-transparent py-1 focus:outline-none"
								placeholder="Type a command or search"
							/>
						</div>
						<hr />
					</div>
				</div>
			)}
		</div>
	);
};

export default Layout;
