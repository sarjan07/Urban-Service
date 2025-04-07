import React from 'react'

const BookingHistory = () => {
    return (
      <div className="bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Booking History</h1>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">#BK12345</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Regular Maintenance</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">15 Mar 2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">10:00 AM</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">View</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">#BK12346</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Deep Cleaning</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">28 Mar 2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">02:00 PM</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Upcoming</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">View</button>
                  <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200">Cancel</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">#BK12347</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Repair Service</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">05 Apr 2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">11:30 AM</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Upcoming</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">View</button>
                  <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200">Cancel</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

export default BookingHistory;