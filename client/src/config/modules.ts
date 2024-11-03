import {
	// BarChartIcon,
	CalendarIcon,
	// ChartLineIcon,
	// CheckCircleIcon,
	// CheckSquareIcon,
	// ClipboardIcon,
	ComputerIcon,
	// DollarSignIcon,
	// FileTextIcon,
	// HammerIcon,
	// LayersIcon,
	LayoutDashboardIcon,
	// LightbulbIcon,
	// MapIcon,
	NotebookIcon,
	// PackageIcon,
	SandwichIcon,
	// TruckIcon,
	// UsersIcon,
	// WrenchIcon,
} from "lucide-react";
import { FC } from "react";

interface ChildModule {
	label: string;
	path: string;
	icon: FC;
}

interface Module {
	label: string;
	path: string;
	icon: FC;
	children?: ChildModule[];
}

const modules: Module[] = [
	// {
	// 	label: "Inventory",
	// 	path: "inventory",
	// 	icon: PackageIcon,
	// 	children: [
	// 		{
	// 			label: "Dashboard",
	// 			path: "inventory",
	// 			icon: PackageIcon,
	// 		},
	// 	],
	// },
	// {
	// 	label: "Production",
	// 	path: "production",
	// 	icon: HammerIcon,
	// 	children: [
	// 		{
	// 			label: "Dashboard",
	// 			path: "production",
	// 			icon: LayoutDashboardIcon,
	// 		},
	// 		{
	// 			label: "Planning",
	// 			path: "production/planning",
	// 			icon: ClipboardIcon,
	// 		},
	// 		{
	// 			label: "Work Orders",
	// 			path: "work-orders",
	// 			icon: FileTextIcon,
	// 		},
	// 		{
	// 			label: "BOMs",
	// 			path: "bill-of-materials",
	// 			icon: LayersIcon,
	// 		},
	// 		{
	// 			label: "Inventory",
	// 			path: "inventory",
	// 			icon: PackageIcon,
	// 		},
	// 		{
	// 			label: "Tracking",
	// 			path: "tracking",
	// 			icon: MapIcon,
	// 		},
	// 		{
	// 			label: "Quality",
	// 			path: "quality",
	// 			icon: CheckSquareIcon,
	// 		},
	// 		{
	// 			label: "Labor",
	// 			path: "labor",
	// 			icon: UsersIcon,
	// 		},
	// 		{
	// 			label: "Maintenance",
	// 			path: "maintenance",
	// 			icon: WrenchIcon,
	// 		},
	// 		{
	// 			label: "Reports",
	// 			path: "reports",
	// 			icon: BarChartIcon,
	// 		},
	// 	],
	// },
	// {
	// 	label: "Quality",
	// 	path: "quality",
	// 	icon: CheckCircleIcon,
	// },
	// {
	// 	label: "Supply",
	// 	path: "supply",
	// 	icon: TruckIcon,
	// },
	// {
	// 	label: "Sales",
	// 	path: "sales",
	// 	icon: DollarSignIcon,
	// },
	// {
	// 	label: "Finance",
	// 	path: "finance",
	// 	icon: BarChartIcon,
	// },
	// {
	// 	label: "HR",
	// 	path: "human-resources",
	// 	icon: UsersIcon,
	// },
	// {
	// 	label: "Maintenance",
	// 	path: "maintenance",
	// 	icon: WrenchIcon,
	// },
	// {
	// 	label: "Project",
	// 	path: "project",
	// 	icon: LightbulbIcon,
	// },
	// {
	// 	label: "Reports",
	// 	path: "reports",
	// 	icon: ChartLineIcon,
	// },
	{
		label: "IT",
		path: "information-technology",
		icon: ComputerIcon,
		children: [
			{
				label: "Dashboard",
				path: "information-technology",
				icon: LayoutDashboardIcon,
			},
			{
				label: "Sandbox",
				path: "information-technology/sandbox",
				icon: SandwichIcon,
			},
		],
	},
];

export const generalModules: Module[] = [
	{
		label: "Calendar",
		path: "/calendar",
		icon: CalendarIcon,
	},
	{
		label: "Notes",
		path: "/notes",
		icon: NotebookIcon,
	},
];
export default modules;
