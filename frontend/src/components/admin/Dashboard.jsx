import { useState, useEffect } from 'react';
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Users, UserCheck, UserMinus, Activity } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Dashboard component that displays real-time user data
const Dashboard = () => {
  const [userData, setUserData] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    historyData: [],
    error: null,
    loading: true,
    lastUpdate: new Date()
  });

  // Fetch user data from backend
  const getAllUserData = async () => {
    try {
      const response = await axios.get('/users');
      const users = response.data.data;
      
      const totalUsers = users.length;

      // Create history data point
      const today = new Date();
      const dateStr = `Apr ${today.getDate()}`;
      const newHistoryPoint = {
        date: dateStr,
        users: totalUsers
      };

      // Update state with real data
      setUserData(prevData => ({
        totalUsers,
        activeUsers,
        inactiveUsers,
        historyData: [...prevData.historyData, newHistoryPoint].slice(-7), // Keep last 7 days
        error: null,
        loading: false,
        lastUpdate: new Date()
      }));
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserData(prevData => ({
        ...prevData,
        error: 'Failed to fetch user data',
        loading: false
      }));
      toast.error('Failed to fetch user data');
    }
  };

  // Initial data fetch
  useEffect(() => {
    getAllUserData();
  }, []);

  // Refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(getAllUserData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Pie chart data
  const pieData = [
    { name: 'Active Users', value: userData.activeUsers, color: '#4ade80' },
    { name: 'Inactive Users', value: userData.inactiveUsers, color: '#f87171' },
  ];

  if (userData.loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">User Analytics Dashboard</h1>
      
      {userData.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          {/* <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {userData.error}</span> */}
        </div>
      )}
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Users size={24} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Total Users</h3>
            <p className="text-2xl font-bold">{userData.totalUsers.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <UserCheck size={24} className="text-green-600" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Active Users</h3>
            <p className="text-2xl font-bold">{userData.activeUsers.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <div className="bg-red-100 p-3 rounded-full mr-4">
            <UserMinus size={24} className="text-red-600" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Inactive Users</h3>
            <p className="text-2xl font-bold">{userData.inactiveUsers.toLocaleString()}</p>
          </div>
        </div>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Activity size={20} className="mr-2 text-purple-600" />
            User Growth Trends
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userData.historyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#6366f1" name="Total Users" />
                <Line type="monotone" dataKey="active" stroke="#4ade80" name="Active Users" />
                <Line type="monotone" dataKey="inactive" stroke="#f87171" name="Inactive Users" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Users size={20} className="mr-2 text-blue-600" />
            User Distribution
          </h2>
          <div className="h-64 flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={3}
                  dataKey="value"
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => value.toLocaleString()} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Last updated: {userData.lastUpdate.toLocaleTimeString()}</p>
        <p className="text-xs mt-1">Data refreshes every 30 seconds</p>
      </div>
    </div>
  );
}

export default Dashboard;