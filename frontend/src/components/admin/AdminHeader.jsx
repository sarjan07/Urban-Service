import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { IconButton, Menu, MenuItem, Avatar, Badge, Tooltip, Box, AppBar, Toolbar } from "@mui/material";
import { ChevronDown, Sun, Moon, Bell, Settings } from "lucide-react";

const AdminHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    // Perform logout actions here (e.g., clear user session, tokens, etc.)
    console.log("User logged out");
    
    // Navigate to the login or signup page
    navigate("/login"); // Replace "/login" with your desired route
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: isDarkMode ? "#333" : "#fff",
        color: isDarkMode ? "#fff" : "#333",
        boxShadow: 2,
        zIndex: 1201,
      }}
    >
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        {/* Theme Toggle Button */}
        <Tooltip title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}>
          <IconButton onClick={toggleTheme} sx={{ color: isDarkMode ? "#ffb300" : "#1976d2" }}>
            {isDarkMode ? <Sun /> : <Moon />}
          </IconButton>
        </Tooltip>

        {/* Notification Icon */}
        <Tooltip title="Notifications">
          <IconButton sx={{ color: isDarkMode ? "#ddd" : "#333" }}>
            <Badge badgeContent={3} color="error">
              <Bell />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* Settings Icon */}
        <Tooltip title="Settings">
          <IconButton component={Link} to="/admin/settings" sx={{ color: isDarkMode ? "#ddd" : "#333" }}>
            <Settings />
          </IconButton>
        </Tooltip>

        {/* Profile and Dropdown */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleMenuOpen} sx={{ ml: 1 }}>
            <Avatar
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt="Profile"
            />
            <ChevronDown style={{ color: isDarkMode ? "#ddd" : "#333" }} />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem component={Link} to="/admin/profile" onClick={handleMenuClose}>
              Profile
            </MenuItem>
            <MenuItem component={Link} to="/admin/settings" onClick={handleMenuClose}>
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem> {/* Add logout functionality */}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;







// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { IconButton, Menu, MenuItem, Avatar, Badge, Tooltip, Box, AppBar, Toolbar } from "@mui/material";
// import { ChevronDown, Sun, Moon, Bell, Settings } from "lucide-react";

// const AdminHeader = () => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         backgroundColor: isDarkMode ? "#333" : "#fff",
//         color: isDarkMode ? "#fff" : "#333",
//         boxShadow: 2,
//         zIndex: 1201,
//       }}
//     >
//       <Toolbar sx={{ justifyContent: "flex-end" }}>
//         {/* Theme Toggle Button */}
//         <Tooltip title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}>
//           <IconButton onClick={toggleTheme} sx={{ color: isDarkMode ? "#ffb300" : "#1976d2" }}>
//             {isDarkMode ? <Sun /> : <Moon />}
//           </IconButton>
//         </Tooltip>

//         {/* Notification Icon */}
//         <Tooltip title="Notifications">
//           <IconButton sx={{ color: isDarkMode ? "#ddd" : "#333" }}>
//             <Badge badgeContent={3} color="error">
//               <Bell />
//             </Badge>
//           </IconButton>
//         </Tooltip>

//         {/* Settings Icon */}
//         <Tooltip title="Settings">
//           <IconButton component={Link} to="/admin/settings" sx={{ color: isDarkMode ? "#ddd" : "#333" }}>
//             <Settings />
//           </IconButton>
//         </Tooltip>

//         {/* Profile and Dropdown */}
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <IconButton onClick={handleMenuOpen} sx={{ ml: 1 }}>
//             <Avatar
//               src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
//               alt="Profile"
//             />
//             <ChevronDown style={{ color: isDarkMode ? "#ddd" : "#333" }} />
//           </IconButton>
//           <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//             <MenuItem component={Link} to="/admin/profile" onClick={handleMenuClose}>
//               Profile
//             </MenuItem>
//             <MenuItem component={Link} to="/admin/settings" onClick={handleMenuClose}>
//               Settings
//             </MenuItem>
//             <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
//           </Menu>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default AdminHeader;
