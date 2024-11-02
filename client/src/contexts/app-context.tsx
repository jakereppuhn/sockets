import React, { createContext, useEffect, useState } from 'react';

interface AppContextType {
	sidebarExpanded: boolean;
	toggleSidebar: () => void;
	notesSidebarViewable: boolean;
	toggleNotesSidebar: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(() => {
		const savedState = localStorage.getItem('sidebarExpanded');
		return savedState ? JSON.parse(savedState) : false;
	});

	const [notesSidebarViewable, setNotesSidebarViewable] = useState<boolean>(() => {
		const savedState = localStorage.getItem('notesSidebarViewable');
		return savedState ? JSON.parse(savedState) : true;
	});

	const toggleSidebar = () => {
		setSidebarExpanded((prev) => {
			const newState = !prev;
			localStorage.setItem('sidebarExpanded', JSON.stringify(newState));
			return newState;
		});
	};
	const toggleNotesSidebar = () => {
		setNotesSidebarViewable((prev) => {
			const newState = !prev;
			localStorage.setItem('notesSidebarViewable', JSON.stringify(newState));
			return newState;
		});
	};

	useEffect(() => {
		localStorage.setItem('sidebarExpanded', JSON.stringify(sidebarExpanded));
		localStorage.setItem('notesSidebarViewable', JSON.stringify(notesSidebarViewable));
	}, [sidebarExpanded, notesSidebarViewable]);

	return (
		<AppContext.Provider value={{ sidebarExpanded, toggleSidebar, notesSidebarViewable, toggleNotesSidebar }}>
			{children}
		</AppContext.Provider>
	);
};
