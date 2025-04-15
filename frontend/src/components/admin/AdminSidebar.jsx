import React from "react";
// import { UserNavbar } from "./UserNavbar";
import { Link, Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
// import AdminLTEFullLogo from "./assets/css/AdminLTEFullLogo";

const AdminSidebar = () => {
  return (
    <>
    {/* <AdminHeader></AdminHeader> */}
    <aside
        className="app-sidebar bg-body-secondary shadow"
        data-bs-theme="dark">
          
        <div className="sidebar-brand">
          <Link to="/dashboard" className="brand-link">
            
            <img
              src="https://c8.alamy.com/comp/2H7NTHX/urban-logo-template-city-skyline-silhouette-vector-2H7NTHX.jpg"
              // alt="AdminLTE Logo" 
              height={"15px"}
              className="brand-image opacity-75 shadow"/>
            
            <span className="brand-text fw-light">Local Services</span>
          </Link>
          
        </div>

        <div className="" data-overlayscrollbars-viewport="scrollbarHidden overflowXHidden overflowYScroll" tabIndex={-1}
          style={{
            marginRight: "-16px",
            marginBottom: "-16px",
            marginLeft: 0,
            top: "-8px",
            right: "auto",
            left: "-8px",
            width: "calc(100% + 16px)",
            padding: 8,
          }}>
          <nav className="mt-2">
            
            <ul
              className="nav sidebar-menu flex-column"
              data-lte-toggle="treeview"
              role="menu"
              data-accordion="false">
              <Link to="nav-item menu-open">
                {/* <Link to="#" className="nav-link active">
                  <i className="nav-icon bi bi-speedometer" />
                  <p>
                    Dashboard
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </Link> */}
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/admin/add" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>Add Services</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin/category" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Add Category</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin/subcategory" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Add SubCategory</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin/managecat" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Manage Category</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin/adduser" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Add User</p>
                    </Link>
                  </li>
                </ul>
              </Link>
              <li className="nav-item">
                <Link to="/admin/edituser" className="nav-link">
                  <i className="nav-icon bi bi-palette" />
                  <p>Edit User</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/viewuser" className="nav-link">
                  <i className="nav-icon bi bi-box-seam-fill" />
                  <p>
                    View User
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </Link>
                
              </li>
            </ul>
            
          </nav>
        </div>
      </aside>
      <main className="app-main">
        <Outlet/>
      </main>
    </>
  );
};

export default AdminSidebar;


// import React, { useState } from "react";
// import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
// import { styled, useTheme } from "@mui/material/styles";
// import {
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   IconButton,
//   Box,
//   Typography,
//   Divider,
//   useMediaQuery,
//   Toolbar,
//   AppBar,
// } from "@mui/material";
// import {
//   Dashboard,
//   Event,
//   Business,
//   People,
//   BarChart,
//   Security,
//   Settings,
//   Menu,
//   Logout,
// } from "@mui/icons-material";
// // import { ViewMyScreen } from "../ServiceProvider/ViewMyScreen";

// const drawerWidth = 260;

// const SidebarContainer = styled(Drawer)(({ theme }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   zIndex: 1400, // Higher z-index for visibility
//   "& .MuiDrawer-paper": {
//     width: drawerWidth,
//     backgroundColor: "#1E1E1E",
//     color: "#FFFFFF",
//     borderRight: "1px solid #333",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//     zIndex: 1400, // Ensures sidebar stays on top
//   },
// }));

// const AdminSidebar = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
//   const navigate = useNavigate();
//   const location = useLocation();

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     navigate("/login");
//   };

//   const isActive = (path) => location.pathname.startsWith(path);

//   const AdminNavLinks = [
//     { path: "/admin/dashboard", icon: <Dashboard />, label: "Dashboard" },
//     { path: "/admin/manage-users", icon: <People />, label: "User Management" },
//     { path: "/admin/manage-services", icon: <Business />, label: "Service Management" },
//     { path: "/admin/bookings", icon: <Event />, label: "Bookings" },
//     { path: "/admin/revenue", icon: <Security />, label: "Revenue" },
//     { path: "/admin/reports", icon: <BarChart />, label: "Reports & Analytics" },
//     { path: "/admin/settings", icon: <Settings />, label: "Settings" },
//   ];

//   const ServiceProviderNavLinks = [
//     { path: "/servid", icon: <Dashboard />, label: "Dashboard" },

//     { path: "/admin/manage-events", icon: <Event />, label: "Booking" },
//     { path: "/admin/manage-services", icon: <Event />, label: "Manage Services" },
    
//     { path: "/admin/reports-analytics", icon: <BarChart />, label: "Reports & Analytics" },
//     { path: "/admin/content-moderation", icon: <Security />, label: "Revenue" },
//     { path: "/admin/settings", icon: <Settings />, label: "Reviews" },
//   ];

  
//   return (
//     <Box display="flex">
//       {/* Top Navbar for Mobile */}
//       {isMobile && (
//         <AppBar position="fixed" sx={{ bgcolor: "#222", zIndex: 1500 }}>
//           <Toolbar>
//             <IconButton onClick={toggleSidebar} sx={{ color: "#fff" }}>
//               <Menu />
//             </IconButton>
//             <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
//               Local Service Admin
//             </Typography>
//           </Toolbar>
//         </AppBar>
//       )}

//       {/* Sidebar */}
//       <SidebarContainer
//         variant={isMobile ? "temporary" : "permanent"}
//         open={isSidebarOpen || !isMobile}
//         onClose={toggleSidebar}
//         ModalProps={{ keepMounted: true }}
//       >
//         <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
//           <Typography variant="h6" fontWeight="bold">
//           Local Service Admin
//           </Typography>
//           {isMobile && (
//             <IconButton onClick={toggleSidebar} sx={{ color: "inherit" }}>
//               <Menu />
//             </IconButton>
//           )}
//         </Box>

//         <Divider sx={{ bgcolor: "#444" }} />

//         {/* Navigation Links */}
//         <List sx={{ flexGrow: 1 }}>
//           {ServiceProviderNavLinks.map((link) => (
//             <ListItemButton
//               key={link.path}
//               component={Link}
//               to={link.path}
//               sx={{
//                 color: isActive(link.path) ? "#fff" : "#bbb",
//                 bgcolor: isActive(link.path) ? "#1976D2" : "transparent",
//                 "&:hover": {
//                   bgcolor: "gray", // Turns blue on hover
//                   color: "#fff",
//                   boxShadow: "0px 0px 8px rgba(32, 169, 248, 0.2)",
//                 },
//                 borderRadius: 2,
//                 mb: 1,
//                 transition: "all 0.3s ease",
//               }}
//             >
//               <ListItemIcon sx={{ color: "inherit" }}>{link.icon}</ListItemIcon>
//               <ListItemText primary={link.label} />
//             </ListItemButton>
//           ))}
//         </List>

//         <Divider sx={{ bgcolor: "#444" }} />

//         {/* Logout Button Fixed at Bottom */}
//         <Box sx={{ p: 2 }}>
//           <ListItemButton
//             onClick={handleLogout}
//             sx={{
//               color: "#bbb",
//               "&:hover": { bgcolor: "#d32f2f", color: "#fff" },
//               transition: "all 0.3s ease",
//               borderRadius: 2,
//             }}
//           >
//             <ListItemIcon sx={{ color: "inherit" }}>
//               <Logout />
//             </ListItemIcon>
//             <ListItemText primary="Logout" />
//           </ListItemButton>
//         </Box>
//       </SidebarContainer>

//       {/* Main Content */}
//       <Box component="main" sx={{ flexGrow: 1, p: 3, ml: isMobile ? 0 : drawerWidth, mt: isMobile ? 8 : 0 }}>
//         <Outlet />
//       </Box>
//     </Box>
//   );
// };

// export default AdminSidebar;
