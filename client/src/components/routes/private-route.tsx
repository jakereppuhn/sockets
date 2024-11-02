import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Layout from '../layout';

const PrivateRoute = () => {
	const user = true;

	const location = useLocation();
	const currentPath = location.pathname.substring(1);

	if (!user) {
		return <Navigate to="/login" />;
	}

	return currentPath === '' ? (
		<Outlet />
	) : (
		<Layout>
			<Outlet />
		</Layout>
	);
};

export default PrivateRoute;
