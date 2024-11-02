// import { useState } from 'react';

const DeviceManager = () => {
	// const [searchTerm, setSearchTerm] = useState('');
	// const [filterStatus, setFilterStatus] = useState('');

	// const devices = [
	// 	{
	// 		id: 1,
	// 		name: 'Office Printer',
	// 		type: 'Printer',
	// 		ip: '192.168.1.10',
	// 		status: 'online',
	// 	},
	// 	{
	// 		id: 2,
	// 		name: 'Conference Room TV',
	// 		type: 'Display',
	// 		ip: '192.168.1.11',
	// 		status: 'offline',
	// 	},
	// 	{
	// 		id: 3,
	// 		name: 'Network Switch',
	// 		type: 'Switch',
	// 		ip: '192.168.1.12',
	// 		status: 'online',
	// 	},
	// 	{
	// 		id: 4,
	// 		name: 'Security Camera',
	// 		type: 'Camera',
	// 		ip: '192.168.1.13',
	// 		status: 'online',
	// 	},
	// 	{
	// 		id: 5,
	// 		name: 'Router',
	// 		type: 'Router',
	// 		ip: '192.168.1.1',
	// 		status: 'online',
	// 	},
	// 	{
	// 		id: 6,
	// 		name: 'Laptop 1',
	// 		type: 'Computer',
	// 		ip: '192.168.1.20',
	// 		status: 'offline',
	// 	},
	// 	{
	// 		id: 7,
	// 		name: 'Laptop 2',
	// 		type: 'Computer',
	// 		ip: '192.168.1.21',
	// 		status: 'online',
	// 	},
	// 	{
	// 		id: 8,
	// 		name: 'Smartphone 1',
	// 		type: 'Mobile',
	// 		ip: '192.168.1.30',
	// 		status: 'online',
	// 	},
	// 	{
	// 		id: 9,
	// 		name: 'Smartphone 2',
	// 		type: 'Mobile',
	// 		ip: '192.168.1.31',
	// 		status: 'offline',
	// 	},
	// ];

	// const filteredDevices = devices.filter((device) => {
	// 	const matchesSearch = device.name
	// 		.toLowerCase()
	// 		.includes(searchTerm.toLowerCase());
	// 	const matchesStatus = filterStatus ? device.status === filterStatus : true;
	// 	return matchesSearch && matchesStatus;
	// });

	return (
		<div className="flex-1 p-4">
			<h1 className="text-4xl font-bold mb-6">Device Manager</h1>
			{/* <div className="flex mb-4">
				<input
					type="text"
					placeholder="Search by device name..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="border border-gray-300 rounded-lg p-2 mr-2 w-full"
				/>
				<select
					value={filterStatus}
					onChange={(e) => setFilterStatus(e.target.value)}
					className="border border-gray-300 rounded-lg p-2">
					<option value="">All Status</option>
					<option value="online">Online</option>
					<option value="offline">Offline</option>
				</select>
			</div>
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white shadow-lg rounded-lg">
					<thead className="bg-gray-200">
						<tr>
							<th className="py-2 px-4 text-left text-gray-600">Device Name</th>
							<th className="py-2 px-4 text-left text-gray-600">Device Type</th>
							<th className="py-2 px-4 text-left text-gray-600">IP Address</th>
							<th className="py-2 px-4 text-left text-gray-600">Status</th>
						</tr>
					</thead>
					<tbody>
						{filteredDevices.map((device) => (
							<tr key={device.id} className="border-b hover:bg-gray-100">
								<td className="py-2 px-4">{device.name}</td>
								<td className="py-2 px-4">{device.type}</td>
								<td className="py-2 px-4">{device.ip}</td>
								<td
									className={`py-2 px-4 ${
										device.status === 'online'
											? 'text-green-500'
											: 'text-red-500'
									}`}>
									{device.status}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div> */}
		</div>
	);
};

export default DeviceManager;
