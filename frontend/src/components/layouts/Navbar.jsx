import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Avatar,
  Tooltip,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PaymentIcon from "@mui/icons-material/Payment";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import HandymanIcon from "@mui/icons-material/Handyman";
import AuthService from "../services/AuthService";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = AuthService.isAuthenticated();
      setIsAuthenticated(isAuth);
      if (isAuth) {
        setCurrentUser(AuthService.getCurrentUser());
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    setCurrentUser(null);
    handleCloseUserMenu();
    navigate("/login");
  };

  const getUserInitial = () => {
    if (!currentUser?.email) return "?";
    return currentUser.email.charAt(0).toUpperCase();
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navigationItems = [
    {
      title: "Add Service",
      path: "/services",
      icon: <AddCircleOutlineIcon />,
      requiresAuth: true,
    },
    {
      title: "Manage Services",
      path: "/manage-services",
      icon: <ManageAccountsIcon />,
      requiresAuth: true,
    },
    {
      title: "Payments",
      path: "/payments",
      icon: <PaymentIcon />,
      requiresAuth: true,
    },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #e0e0e0",
        boxShadow: "none",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo/Brand - Desktop */}
          <HandymanIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              color: "#1a73e8",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "#1a73e8",
              textDecoration: "none",
            }}
          >
            ServiceHub
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: "#5f6368" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {navigationItems.map(
                (item) =>
                  (!item.requiresAuth || isAuthenticated) && (
                    <MenuItem
                      key={item.title}
                      onClick={() => {
                        handleCloseNavMenu();
                        navigate(item.path);
                      }}
                      sx={{
                        backgroundColor: isActive(item.path)
                          ? "#e8f0fe"
                          : "transparent",
                        "&:hover": { backgroundColor: "#f8f9fa" },
                      }}
                    >
                      <ListItemIcon sx={{ color: "#5f6368" }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.title} />
                    </MenuItem>
                  )
              )}
            </Menu>
          </Box>

          {/* Logo/Brand - Mobile */}
          <HandymanIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              color: "#1a73e8",
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "#1a73e8",
              textDecoration: "none",
            }}
          >
            ServiceHub
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navigationItems.map(
              (item) =>
                (!item.requiresAuth || isAuthenticated) && (
                  <Button
                    key={item.title}
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate(item.path);
                    }}
                    startIcon={item.icon}
                    sx={{
                      my: 2,
                      mx: 1,
                      color: isActive(item.path) ? "#1a73e8" : "#5f6368",
                      backgroundColor: isActive(item.path)
                        ? "#e8f0fe"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: "#f8f9fa",
                        color: "#1a73e8",
                      },
                    }}
                  >
                    {item.title}
                  </Button>
                )
            )}
          </Box>

          {/* User Menu */}
          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated ? (
              <>
                <Tooltip title="Account settings">
                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: "#1a73e8",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                      }}
                    >
                      {getUserInitial()}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  PaperProps={{
                    sx: {
                      mt: 1.5,
                      minWidth: 250,
                      boxShadow: "0 2px 10px rgba(0,0,0,.2)",
                      borderRadius: "8px",
                    },
                  }}
                >
                  <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      {currentUser?.email}
                    </Typography>
                  </Box>
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate("/profile");
                    }}
                  >
                    <ListItemIcon>
                      <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate("/settings");
                    }}
                  >
                    <ListItemIcon>
                      <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Sign out" />
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  component={RouterLink}
                  to="/login"
                  startIcon={<LoginIcon />}
                  sx={{
                    color: "#1a73e8", 
                    border: "1px solid #1a73e8",
                    padding: "8px 16px", // Optional: Adjust padding for better appearance
                    borderRadius: "8px", // Optional: Add rounded corners
                    transition: "all 0.3s ease-in-out", // Smooth hover effect
                  
                    "&:hover": { 
                      backgroundColor: "#1a73e8", 
                      color: "white",
                      fontWeight: "bold", 
                      transform: "translateY(-2px)", 
                      boxShadow: "0px 4px 10px rgba(26, 115, 232, 0.5)" // Light shadow effect
                    },
                  }}
                  
                >
                  Login
                </Button>
                <Button
                  component={RouterLink}
                  to="/signup"
                  variant="contained"
                  startIcon={<PersonAddIcon />}
                  sx={{
                    backgroundColor: "#1a73e8",
                    "&:hover": {
                      backgroundColor: "#1557b0",
                      fontWeight: "bold",
                      color: "white",
                      transform: "translateY(-2px)", // Example transformation
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Light box shadow
                    },
                  }}
                >
                  Sign up
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
