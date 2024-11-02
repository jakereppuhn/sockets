import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
	const user = true;

	return user ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
