import React from 'react'

const HomePage = ({ greeting, username, date }) => {
    return (
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
          <h1 className="text-3xl font-bold">{greeting}, {username}!</h1>
          <p className="opacity-90 mt-2">Today is {date}</p>
          <p className="mt-6 font-medium">Welcome to your personalized service dashboard</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 transition-transform hover:scale-105">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-700">Active Bookings</h3>
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <FiCheck className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold mt-4 text-gray-800">3</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 transition-transform hover:scale-105">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-700">Upcoming Service</h3>
              <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                <FiClock className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xl font-bold mt-4 text-gray-800">Tomorrow, 10:00 AM</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 transition-transform hover:scale-105">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-700">Balance Due</h3>
              <div className="bg-green-100 p-3 rounded-full text-green-600">
                <FiDollarSign className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold mt-4 text-gray-800">$150.00</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 transition-transform hover:scale-105">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-700">Loyalty Points</h3>
              <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
                <FiStar className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold mt-4 text-gray-800">250</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <FiPlusCircle className="mr-2" /> New Booking
            </button>
            <button className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <FiCreditCard className="mr-2" /> Pay Now
            </button>
            <button className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <FiMessageSquare className="mr-2" /> Support
            </button>
          </div>
        </div>
      </div>
    );
  };

export default HomePage;
