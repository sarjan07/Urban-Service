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
    <div className="MuiBox-root css-17yk2a7">
  <div className="MuiBox-root css-0">
    <a href="/">
      <img
        src="/assets/grownited1-BnziXBb3.png"
        alt="Logo"
        style={{ width: 150 }}
      />
    </a>
  </div>
  <div className="MuiBox-root css-j0ozid">
    <div className="MuiBox-root css-0">
      <button
        className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-p4u075"
        tabIndex={0}
        type="button"
      >
        <p className="MuiTypography-root MuiTypography-body1 css-fyswvn">
          Internship
        </p>{" "}
        <svg
          className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-q7mezt"
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
          data-testid="ArrowDropDownIcon"
        >
          <path d="m7 10 5 5 5-5z" />
        </svg>
      </button>
    </div>
    <div className="MuiBox-root css-0">
      <button
        className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-p4u075"
        tabIndex={0}
        type="button"
      >
        <p className="MuiTypography-root MuiTypography-body1 css-fyswvn">
          Attendance
        </p>{" "}
        <svg
          className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-q7mezt"
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
          data-testid="ArrowDropDownIcon"
        >
          <path d="m7 10 5 5 5-5z" />
        </svg>
        <span className="MuiTouchRipple-root css-4mb1j7" />
      </button>
    </div>
    <div className="MuiBox-root css-0">
      <button
        className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-p4u075"
        tabIndex={0}
        type="button"
      >
        <p className="MuiTypography-root MuiTypography-body1 css-fyswvn">
          Intern-Group
        </p>{" "}
        <svg
          className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-q7mezt"
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
          data-testid="ArrowDropDownIcon"
        >
          <path d="m7 10 5 5 5-5z" />
        </svg>
        <span className="MuiTouchRipple-root css-4mb1j7" />
      </button>
    </div>
    <button
      className="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-colorPrimary css-1ns5vv1"
      tabIndex={0}
      type="button"
    >
      Logout
      <span className="MuiTouchRipple-root css-4mb1j7" />
    </button>
    <button
      className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-i8egul"
      tabIndex={0}
      type="button"
    >
      <div className="MuiAvatar-root MuiAvatar-circular css-1kzfwof">
        <img
          alt="profile-pic"
          src="https://res.cloudinary.com/dpjoxqisl/image/upload/v1738767009/internship-student-profile/IMG_20250205_201943_gmmb8c.jpg"
          className="MuiAvatar-img css-45do71"
        />
      </div>
      <svg
        className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-5347m2"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="CheckCircleIcon"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z" />
      </svg>
      <span className="MuiTouchRipple-root css-4mb1j7" />
    </button>
    <button
      className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary css-zubpde"
      tabIndex={0}
      type="button"
    >
      <img
        src="/assets/Android_robot-DFX-z3Hl.png"
        style={{ height: 40, width: 40 }}
      />
      <span className="MuiTouchRipple-root css-4mb1j7" />
    </button>
    </div>
</div>

    // <AppBar
    //   position="fixed"
    //   sx={{
    //     backgroundColor: isDarkMode ? "#333" : "#fff",
    //     color: isDarkMode ? "#fff" : "#333",
    //     boxShadow: 2,
    //     zIndex: 1201,
    //   }}
    // >
    //   <Toolbar sx={{ justifyContent: "flex-end" }}>
    //     {/* Theme Toggle Button */}
    //     <Tooltip title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}>
    //       <IconButton onClick={toggleTheme} sx={{ color: isDarkMode ? "#ffb300" : "#1976d2" }}>
    //         {isDarkMode ? <Sun /> : <Moon />}
    //       </IconButton>
    //     </Tooltip>

    //     {/* Notification Icon */}
    //     <Tooltip title="Notifications">
    //       <IconButton sx={{ color: isDarkMode ? "#ddd" : "#333" }}>
    //         <Badge badgeContent={3} color="error">
    //           <Bell />
    //         </Badge>
    //       </IconButton>
    //     </Tooltip>

    //     {/* Settings Icon */}
    //     <Tooltip title="Settings">
    //       <IconButton component={Link} to="/admin/settings" sx={{ color: isDarkMode ? "#ddd" : "#333" }}>
    //         <Settings />
    //       </IconButton>
    //     </Tooltip>

    //     {/* Profile and Dropdown */}
    //     <Box sx={{ display: "flex", alignItems: "center" }}>
    //       <IconButton onClick={handleMenuOpen} sx={{ ml: 1 }}>
    //         <Avatar
    //           src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    //           alt="Profile"
    //         />
    //         <ChevronDown style={{ color: isDarkMode ? "#ddd" : "#333" }} />
    //       </IconButton>
    //       <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
    //         <MenuItem component={Link} to="/admin/profile" onClick={handleMenuClose}>
    //           Profile
    //         </MenuItem>
    //         <MenuItem component={Link} to="/admin/settings" onClick={handleMenuClose}>
    //           Settings
    //         </MenuItem>
    //         <MenuItem onClick={handleLogout}>Logout</MenuItem> {/* Add logout functionality */}
    //       </Menu>
    //     </Box>
    //   </Toolbar>
    // </AppBar>
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
