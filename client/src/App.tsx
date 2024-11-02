import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainMenu from "./pages/main-menu";
import ProductionOverview from "./pages/production/production-overview";
import ITDeviceManager from "./pages/information-technology/device-manager";
import Calendar from "./pages/general/calendar";
import Notes from "./pages/general/notes";
import PrivateRoute from "./components/routes/private-route";
import InventoryDashboard from "./pages/inventory/inventory-dashboard";
import Settings from "./pages/general/settings";
import Sandbox from "./pages/information-technology/sandbox";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Private Routes */}
				<Route element={<PrivateRoute />}>
					{/* General */}
					<Route path="/" element={<MainMenu />} />
					<Route path="/calendar" element={<Calendar />} />
					<Route path="/notes" element={<Notes />} />
					<Route path="/settings" element={<Settings />} />

					{/* Inventory */}
					<Route path="/inventory">
						<Route path="" element={<InventoryDashboard />} />
					</Route>

					{/* Production */}
					<Route path="/production">
						<Route path="" element={<ProductionOverview />} />
					</Route>

					{/* Information Technology */}
					<Route path="/information-technology">
						<Route path="" element={<ITDeviceManager />} />
						<Route path="sandbox" element={<Sandbox />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
