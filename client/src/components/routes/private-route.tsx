import { Navigate, Outlet, useLocation } from "react-router-dom";
import Layout from "../layout";

const PrivateRoute = () => {
	const user = true;

	const location = useLocation();
	const currentPath = location.pathname.substring(1);

	if (!user) {
		return <Navigate to="/login" />;
	}

	let noLayout;

	noLayout = false;

	if (currentPath === "" || currentPath === "settings") {
		noLayout = true;
	}

	return noLayout ? <Outlet /> : (
		<Layout>
			<Outlet />
		</Layout>
	);
};

export default PrivateRoute;
