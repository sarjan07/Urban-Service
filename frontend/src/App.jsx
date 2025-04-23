import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "./App.css";
import { Box } from "@mui/material";
import theme from "./theme";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
//
// Import Pages
import Home from "./components/pages/Home";
import Login from "./components/common/Login";
import Signup from "./components/common/Signup";
import Profile from "./components/pages/Profile";
import Settings from "./components/pages/Settings";

// Import Service Provider Components
import Services from "./components/service_provider/Services";
import ManageServices from "./components/service_provider/ManageServices";
import AddService from "./components/service_provider/AddService";

// Import Payment Components
import Payments from "./components/payments/Payments";
import PaymentHistory from "./components/payments/PaymentHistory";
//
// Import Layout Components
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import NotFound from "./components/pages/NotFound";

// Import Services
import AuthService from "../src/components/services/AuthService";
import emailService from "../src/components/services/emailService";
import ResetPassword from "./components/common/ResetPassword";
import Home1 from "./components/pages/Home1";
import PrivateRoute from "./components/common/PrivateRoute";
import ForgotPassword from "./components/common/ForgotPassword";

import AdminSidebar from "./components/admin/AdminSidebar";
import  EditUser  from "./components/admin/EditUser";
import Faq from "./components/pages/faq";
import Privacy from "./components/pages/Privacy";
import Contact from "./components/pages/Contact";
import About from "./components/pages/About";
import Term from "./components/pages/Term";
import { LogOut } from "./components/common/LogOut";
import ServiceProvider from "./components/service_provider/ServiceProvider";
import ViewUser  from "./components/admin/ViewUser";
import UserPage from "./components/user/UserPage";
import EasyBooking from "./components/user/EasyBooking";
import { AddUser } from "./components/admin/AddUser";
import { Category } from "@mui/icons-material";
import SubCategory from "./components/admin/SubCategory";
import BookingHistory from "./components/user/Menu/BookingHistory";
import PayHistory from "./components/user/Menu/PaymentHistory";
import ServiceBooking from "./components/user/Menu/ServiceBooking";
import AddCategory from "./components/admin/Category";
import AddSubCategory from "./components/admin/SubCategory";
import ManageCat from "./components/admin/ManageCat";
import Dashboard from "./components/admin/Dashboard";
// import AddAdmin from "./components/admin/AddAdmin";
import AddBooking from "./components/admin/AddBooking";
import AddServiceProvider from "./components/admin/AddServiceProvider";
import ManageServiceProvider from "./components/admin/ManageServiceProvider";

// Layout component to handle conditional navbar rendering
const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
  const isAdminPage = location.pathname.startsWith("/admin");
  axios.defaults.baseURL = "http://localhost:4000/api";
  
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {!isAuthPage && !isAdminPage && <Navbar />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
          ...(isAuthPage && {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          }),
          ...(isAdminPage && {
            display: "flex",
            minHeight: "100vh",
            background: "#f5f7fa",
          }),
        }}
      >
        {children}
      </Box>
      {!isAuthPage && !isAdminPage && <Footer />}
    </Box>
  );
};

function App() { 
  axios.defaults.baseURL = "http://localhost:4000/api"

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              {/* <Route path='/logout' element={<LogOut/>}></Route> */}

              {/* Protected Service Provider Routes */}
              {/* <Route path="/home" element={<Home />}> */}
                <Route path="/service-provider" element={<ServiceProvider/>}>
                  <Route path="services" element={<Services />} >
                  </Route>
                </Route>

              {/* </Route> */}
              {/* <Route path="/user" element={<Home/>}>
              </Route> */}

              {/* Protected Payment Routes */}
              <Route path="/select-services">
                <Route path="payment" element={<Payments />} />
                <Route path="history" element={<PaymentHistory />} />
              </Route>

              {/* Protected User Routes */}
              <Route path="/user" element={<Home/>}>
              <Route path="manage" element={<ManageServices />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
              <Route path="booking" element={<EasyBooking/>}/>
              <Route path="book" element={<ServiceBooking/>}/>
                <Route path="menu">
                  <Route path="history" element={<BookingHistory/>}/>
                  <Route path="payhistory" element={<PayHistory/>}/>
                  {/* <Route path="serbook" element={<ServiceBooking/>}/> */}
                </Route>
              </Route>

              {/* Protected dashboard route */}
              <Route path="/dashboard" element={<Home1 />} />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
              <Route path="/faq" element={<Faq/>}></Route>
              <Route path="/privacy" element={<Privacy/>}></Route>
              <Route path="/contact" element={<Contact/>}></Route>
              <Route path="/about" element={<About/>}></Route>
              <Route path="/terms" element={<Term/>}></Route>
             

              {/* Admin Sidebar & Navbar */}
              <Route path="/admin" element={<AdminSidebar/>}>
                <Route path="add" element={<AddService />} />
                <Route path="adduser" element={<AddUser/>}></Route>
                <Route path="edituser" element={<EditUser/>}></Route>
                <Route path="viewuser" element={<ViewUser/>}></Route>
                <Route path="profile" element={<Profile/>}></Route>
                <Route path="category" element={<AddCategory/>} />
                <Route path="subcategory" element={<AddSubCategory/>}/>
                <Route path="managecat" element={<ManageCat/>}></Route>
                <Route path="dashboard" element={<Dashboard/>}/>
                {/* <Route path="addadmin" element={<AddAdmin/>}/> */}
                <Route path="addbooking" element={<AddBooking/>}/>
                <Route path="addserviceprovider" element={<AddServiceProvider/>}/>
                <Route path="manageserviceprovider" element={<ManageServiceProvider/>}/>
              <Route path="settings"  element={<Settings />} />
              </Route>

              <Route path="/use" element={<UserPage/>}>
              
              </Route>
            </Routes>
          </Layout>
        
        <ToastContainer />
        <Snackbar autoHideDuration={6000} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
          <Alert
            sx={{ width: "100%" }}
          >
          </Alert>
        </Snackbar>
      </LocalizationProvider>
    </AuthProvider>
  </ThemeProvider>
  );
}

export default App;