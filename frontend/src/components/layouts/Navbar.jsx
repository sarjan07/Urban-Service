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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.getToken() ? true : false);
  const [currentUser, setCurrentUser] = useState(null);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  // Re-check authentication state when navigating
  useEffect(() => {
    const checkAuth = async () => {
      const token = AuthService.getToken();
      setIsAuthenticated(!!token);
      
      if (token) {
        try {
          const user = await AuthService.getCurrentUser();
          setCurrentUser(user);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, [location.pathname]);

  const handleLogout = () => {
    setOpenLogoutDialog(true);
  };

  const confirmLogout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    setCurrentUser(null);
    setOpenLogoutDialog(false);
    navigate("/login");
  };

  const getUserInitial = () => {
    if (currentUser?.email) {
      return currentUser.email.charAt(0).toUpperCase();
    } else if (currentUser?.name) {
      return currentUser.name.charAt(0).toUpperCase();
    }
    return "?";
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: "#fff", borderBottom: "1px solid #e0e0e0", boxShadow: "none" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo */}
            <HandymanIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "#1a73e8" }} />
            <Typography
              variant="h6"
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
              LocalService
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton onClick={(e) => setAnchorElNav(e.currentTarget)} sx={{ color: "#5f6368" }}>
                <MenuIcon />
              </IconButton>
              <Menu anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={() => setAnchorElNav(null)}>
                {isAuthenticated && (
                  <>
                    <MenuItem component={RouterLink} to="/services">
                      <AddCircleOutlineIcon sx={{ mr: 1 }} /> Add Service
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/manage-services">
                      <ManageAccountsIcon sx={{ mr: 1 }} /> Manage Services
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/payments">
                      <PaymentIcon sx={{ mr: 1 }} /> Payments
                    </MenuItem>
                  </>
                )}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {isAuthenticated && (
                <>
                  <Button component={RouterLink} to="/services" sx={{ color: "#5f6368" }}>
                    <AddCircleOutlineIcon sx={{ mr: 1 }} /> Add Service
                  </Button>
                  <Button component={RouterLink} to="/manage-services" sx={{ color: "#5f6368" }}>
                    <ManageAccountsIcon sx={{ mr: 1 }} /> Manage Services
                  </Button>
                  <Button component={RouterLink} to="/payments" sx={{ color: "#5f6368" }}>
                    <PaymentIcon sx={{ mr: 1 }} /> Payments
                  </Button>
                </>
              )}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {isAuthenticated ? (
                <>
                  <Tooltip title="Account settings">
                    <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)}>
                      <Avatar sx={{ bgcolor: "#1a73e8" }}>{getUserInitial()}</Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={() => setAnchorElUser(null)}>
                    <MenuItem component={RouterLink} to="/profile">
                      <AccountCircleIcon sx={{ mr: 1 }} /> Profile
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/settings">
                      <SettingsIcon sx={{ mr: 1 }} /> Settings
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                      <LogoutIcon sx={{ mr: 1 }} /> Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button component={RouterLink} to="/login" startIcon={<LoginIcon />} sx={{ color: "#1a73e8" }}>
                    Login
                  </Button>
                  <Button component={RouterLink} to="/signup" variant="contained" startIcon={<PersonAddIcon />}>
                    Sign up
                  </Button>
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Logout Confirmation Dialog */}
      <Dialog open={openLogoutDialog} onClose={() => setOpenLogoutDialog(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to log out?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLogoutDialog(false)}>Cancel</Button>
          <Button onClick={confirmLogout} color="primary">Logout</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Navbar;
