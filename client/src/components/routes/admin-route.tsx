import { Navigate, Outlet } from 'react-router-dom';
import Layout from '../layout';

const AdminRoute = () => {
	const user = { role: 'user' };

	if (user && user.role !== 'admin') {
		return <Navigate to="/" />;
	} else if (!user) {
		return <Navigate to="/login" />;
	} else {
		return (
			<Layout>
				<Outlet />
			</Layout>
		);
	}
};

export default AdminRoute;
