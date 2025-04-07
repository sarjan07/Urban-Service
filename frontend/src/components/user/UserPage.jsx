import React, { useState, useEffect } from "react";
import {
  FiHome,
  FiCalendar,
  FiClock,
  FiFileText,
  FiCreditCard,
  FiMenu,
  FiChevronDown,
  FiCheck,
  FiDollarSign,
  FiStar,
  FiMessageSquare,
  FiPlusCircle,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// import ServiceBooking from './Menu/ServiceBooking';
// import HomePage from './Menu/HomePage';

const UserPage = () => {
//   const [currentTime, setCurrentTime] = useState(new Date());
  const [activeMenu, setActiveMenu] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  function LiveClockWithGreeting() {
    const [time, setTime] = useState(new Date());
    const [greeting, setGreeting] = useState('');
  
    useEffect(() => {
      const updateClock = () => {
        const now = new Date();
        setTime(now);
        const hour = now.getHours();
  
        if (hour >= 5 && hour < 12) {
          setGreeting('Good Morning');
        } else if (hour >= 12 && hour < 17) {
          setGreeting('Good Afternoon');
        } else if (hour >= 17 && hour < 21) {
          setGreeting('Good Evening');
        } else {
          setGreeting('Good Night');
        }
      };
  
      updateClock(); // Run immediately
      const timer = setInterval(updateClock, 1000); // Update every second
  
      return () => clearInterval(timer); // Cleanup
    }, []);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 60000); // Update every minute

//     return () => clearInterval(timer);
//   }, []);

//   const getGreeting = () => {
//     const hours = currentTime.getHours();
//     if (hours < 12) return "Good Morning";
//     if (hours < 18) return "Good Afternoon";
//     return "Good Evening";
//   };

//   const formatDate = () => {
//     const options = {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     };
//     return currentTime.toLocaleDateString(undefined, options);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "home":
        return (
          <HomePage
            greeting={getGreeting()}
            username="John"
            date={formatDate()}
          />
        );
      case "booking":
        return <ServiceBooking />;
      case "history":
        return <BookingHistory />;
      case "payment-history":
        return <PaymentHistory />;
      case "payment":
        return <Payment />;
      default:
        return (
          <HomePage
            greeting={getGreeting()}
            username="John"
            date={formatDate()}
          />
        );
    }
  };

  const menuItems = [
    { id: "home", label: "Home", icon: <FiHome /> },
    { id: "booking", label: "Service Booking", icon: <FiCalendar /> },
    { id: "history", label: "Booking History", icon: <FiClock /> },
    { id: "payment-history", label: "Payment History", icon: <FiFileText /> },
    { id: "payment", label: "Make Payment", icon: <FiCreditCard /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Modern Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <FiMenu className="text-gray-700 w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Service Dashboard
          </h1>
        </div>

        <div className="flex items-center space-x-6">
          <div className="hidden md:block text-gray-600">
            {/* {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} */}
            <div>
              <h6>{greeting} 👋</h6>
              <p>{time.toLocaleTimeString()}</p>
            </div>
          </div>

          <div className="relative group">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white h-9 w-9 rounded-full flex items-center justify-center font-medium">
                JD
              </div>
              <div className="hidden md:flex items-center text-gray-700">
                John Doe
                <FiChevronDown className="ml-1 w-4 h-4" />
              </div>
            </div>

            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link
                to="/user/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                My Profile
              </Link>
              <Link
                to="/user/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </Link>
              <Link
                to="/login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar with animation */}
        <motion.aside
          initial={false}
          animate={{ width: sidebarOpen ? 240 : 80 }}
          className="bg-white shadow-md z-10 h-full"
        >
          <div className="py-6 h-full">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveMenu(item.id)}
                    className={`w-full flex items-center px-4 py-3 transition-colors ${
                      activeMenu === item.id
                        ? "text-blue-600 bg-blue-50 border-r-4 border-blue-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {sidebarOpen && (
                      <span className="ml-3 truncate">{item.label}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
};

// Home Page Component
const HomePage = ({ greeting, username, date }) => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
        <h1 className="text-3xl font-bold">
          {greeting}, {username}!
        </h1>
        <p className="opacity-90 mt-2">Today is {date}</p>
        <p className="mt-6 font-medium">
          Welcome to your personalized service dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 transition-transform hover:scale-105">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-700">
              Active Bookings
            </h3>
            <div className="bg-blue-100 p-3 rounded-full text-blue-600">
              <FiCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold mt-4 text-gray-800">3</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 transition-transform hover:scale-105">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-700">
              Upcoming Service
            </h3>
            <div className="bg-purple-100 p-3 rounded-full text-purple-600">
              <FiClock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xl font-bold mt-4 text-gray-800">
            Tomorrow, 10:00 AM
          </p>
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
            <h3 className="text-lg font-medium text-gray-700">
              Loyalty Points
            </h3>
            <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
              <FiStar className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold mt-4 text-gray-800">250</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Quick Actions
        </h2>
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
// {/* <HomePage/> */}

// Service Booking Component
const ServiceBooking = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Book a Service
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Type
          </label>
          <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option>Select a service</option>
            <option>Regular Maintenance</option>
            <option>Deep Cleaning</option>
            <option>Repair Service</option>
            <option>Consultation</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Date
          </label>
          <input
            type="date"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Time
          </label>
          <input
            type="time"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes
          </label>
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
{
  /* <ServiceBooking/> */
}

// Booking History Component
const BookingHistory = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Booking History
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Booking ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                #BK12345
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                Regular Maintenance
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                15 Mar 2025
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                10:00 AM
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Completed
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                  View
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                #BK12346
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                Deep Cleaning
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                28 Mar 2025
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                02:00 PM
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  Upcoming
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                  View
                </button>
                <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200">
                  Cancel
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                #BK12347
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                Repair Service
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                05 Apr 2025
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                11:30 AM
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  Upcoming
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                  View
                </button>
                <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200">
                  Cancel
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Payment History Component
const PaymentHistory = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Payment History
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                #TX78901
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                Regular Maintenance
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                15 Mar 2025
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                $75.00
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Paid
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                  Receipt
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                #TX78902
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                Consultation
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                10 Mar 2025
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                $40.00
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Paid
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                  Receipt
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                #TX78903
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                Deep Cleaning
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                28 Feb 2025
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                $120.00
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Pending
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <button className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200">
                  Pay Now
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Payment Component
const Payment = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Outstanding Invoices
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">Invoice #INV-2345</h3>
              <p className="text-sm text-gray-600">
                Deep Cleaning Service - 28 Feb 2025
              </p>
            </div>
            <div className="px-4 font-medium text-gray-900">$120.00</div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="inv1"
                checked
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="inv1" className="ml-2 text-sm text-gray-700">
                Select
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">Invoice #INV-2346</h3>
              <p className="text-sm text-gray-600">
                Repair Service - Scheduled for 05 Apr 2025
              </p>
            </div>
            <div className="px-4 font-medium text-gray-900">$150.00</div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="inv2"
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="inv2" className="ml-2 text-sm text-gray-700">
                Select
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end items-center text-lg">
          <div className="font-medium text-gray-700 mr-4">Total Selected:</div>
          <div className="font-bold text-gray-900">$120.00</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Payment Method
        </h2>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center px-6 py-4 border-2 border-blue-500 rounded-lg bg-blue-50 text-blue-700 font-medium">
            <FiCreditCard className="mr-2" />
            <span>Credit Card</span>
          </div>
          <div className="flex items-center px-6 py-4 border border-gray-300 rounded-lg text-gray-700 hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="#0070BA">
              <path d="M20.067 8H3.933C3.418 8 3 8.418 3 8.933v10.134C3 19.582 3.418 20 3.933 20h16.134c.515 0 .933-.418.933-.933V8.933c0-.515-.418-.933-.933-.933z" />
              <path
                d="M18.5 8V5.5c0-2.485-2.015-4.5-4.5-4.5S9.5 3.015 9.5 5.5V8"
                stroke="#0070BA"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            <span>PayPal</span>
          </div>
          <div className="flex items-center px-6 py-4 border border-gray-300 rounded-lg text-gray-700 hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <FiCreditCard className="mr-2" />
            <span>Bank Transfer</span>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Number
            </label>
            <input
              type="text"
              placeholder="XXXX XXXX XXXX XXXX"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVV
              </label>
              <input
                type="text"
                placeholder="XXX"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              placeholder="Name as appears on card"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="pt-4">
            <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors shadow-lg">
              Pay Now $120.00
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
