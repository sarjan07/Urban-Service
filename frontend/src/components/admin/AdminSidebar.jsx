import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Collapse,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Category as CategoryIcon,
  SubdirectoryArrowRight as SubCategoryIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  AdminPanelSettings as AdminIcon,
  PersonAdd as PersonAddIcon,
  Group as GroupIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    background: `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
    borderRight: `1px solid ${theme.palette.divider}`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down('md')]: {
      width: 0,
      borderRight: 'none',
    },
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  margin: '4px 8px',
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.Mui-selected': {
    backgroundColor: `${theme.palette.primary.main}15`,
    '&:hover': {
      backgroundColor: `${theme.palette.primary.main}25`,
    },
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main,
    },
    '& .MuiListItemText-primary': {
      color: theme.palette.primary.main,
      fontWeight: 600,
    },
  },
}));

const AdminSidebar = () => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCategoryClick = () => {
    setCategoryOpen(!categoryOpen);
  };

  const handleUserClick = () => {
    setUserOpen(!userOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/admin/dashboard',
    },
    {
      text: 'Categories',
      icon: <CategoryIcon />,
      children: [
        {
          text: 'Add Category',
          icon: <AddIcon />,
          path: '/admin/category',
        },
        {
          text: 'Add SubCategories',
          icon: <CategoryIcon />,
          path: '/admin/subcategory',
        },
      ],
    },
    {
      text: 'Users',
      icon: <PeopleIcon />,
      children: [
        {
          text: 'Add User',
          icon: <PersonAddIcon />,
          path: '/admin/adduser',
        },
        {
          text: 'Manage Users',
          icon: <GroupIcon />,
          path: '/admin/edituser',
        },
      ],
    },
    {
      text: 'Add Service Provider',
      icon: <AdminIcon />,
      path: '/admin/addserviceprovider',
    },
    {
      text: 'Settings',
      icon: <SettingsIcon />,
      path: '/admin/settings',
    },
  ];

  const renderMenuItem = (item) => {
    const isSelected = location.pathname === item.path;
    const hasChildren = item.children && item.children.length > 0;
    const isParentSelected = hasChildren && item.children.some(child => location.pathname === child.path);

    if (hasChildren) {
      return (
        <React.Fragment key={item.text}>
          <ListItem disablePadding>
            <StyledListItemButton
              onClick={item.text === 'Categories' ? handleCategoryClick : handleUserClick}
              selected={isParentSelected}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
              {item.text === 'Categories' ? (
                categoryOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />
              ) : (
                userOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />
              )}
            </StyledListItemButton>
          </ListItem>
          <Collapse in={item.text === 'Categories' ? categoryOpen : userOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map((child) => (
                <ListItem key={child.text} disablePadding>
                  <StyledListItemButton
                    component={Link}
                    to={child.path}
                    selected={location.pathname === child.path}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {child.icon}
                    </ListItemIcon>
                    <ListItemText primary={child.text} />
                  </StyledListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      );
    }

    return (
      <ListItem key={item.text} disablePadding>
        <StyledListItemButton
          component={Link}
          to={item.path}
          selected={isSelected}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} />
        </StyledListItemButton>
      </ListItem>
    );
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Avatar
          sx={{
            bgcolor: theme.palette.primary.main,
            width: 40,
            height: 40,
          }}
        >
          <AdminIcon />
        </Avatar>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Admin Panel
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, overflow: 'auto', py: 2 }}>
        <List>
          {menuItems.map(renderMenuItem)}
        </List>
      </Box>

      <Divider />
      
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" color="text.secondary" align="center" display="block">
          © 2024 Admin Panel
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          transition: 'width 225ms, margin 225ms',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <IconButton
            color="inherit"
            onClick={handleLogout}
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.error.main + '20',
              },
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { md: 0 },
        }}
      >
        <StyledDrawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </StyledDrawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminSidebar;
