import React from 'react'

const ServiceBooking = () => {
    return (
      <div className="bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Book a Service</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Select a service</option>
              <option>Regular Maintenance</option>
              <option>Deep Cleaning</option>
              <option>Repair Service</option>
              <option>Consultation</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
            <input type="date" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
            <input type="time" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
            <textarea 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
              placeholder="Any special instructions..."
            ></textarea>
          </div>
        </div>
        
        <div className="mt-8">
          <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            Book Appointment
          </button>
        </div>
      </div>
    );
  };

export default ServiceBooking;