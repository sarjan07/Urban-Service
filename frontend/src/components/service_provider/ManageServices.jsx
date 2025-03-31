import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Chip,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import authService from "../services/AuthService";

const serviceCategories = [
  "Home Cleaning",
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Painting",
  "Gardening",
  "Appliance Repair",
  "Moving Services",
  "Pest Control",
  "Other",
];

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [editFormData, setEditFormData] = useState({
    serviceName: "",
    categoryId: "",
    basicDetails: "",
    price: "",
    location: "",
    availability: "",
    contactNumber: "",
  });

  // ✅ FIXED API RESPONSE HANDLING
  const fetchUserServices = async () => {
    try {
      const response = await axios.get("http://localhost:4000/allservices");
      console.log("Response Data:", response.data); // Debugging log

      if (Array.isArray(response.data)) {
        setServices(response.data);
      } else if (Array.isArray(response.data.data)) {
        setServices(response.data.data);
      } else {
        console.error("Error: Response is not an array!", response.data);
        setServices([]); // Prevents crash
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load services. Please try again later.");
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ HANDLE EDIT BUTTON CLICK
  const handleEditClick = (service) => {
    setSelectedService(service);
    setEditFormData({
      serviceName: service.serviceName,
      categoryId: service.categoryId,
      basicDetails: service.basicDetails,
      price: service.price || "",
      location: service.location || "",
      availability: service.availability || "",
      contactNumber: service.contactNumber || "",
    });
    setEditDialogOpen(true);
  };

  // ✅ UPDATE SERVICE
  const handleEditSubmit = async () => {
    if (!selectedService) return;

    try {
      const response = await axios.put(
        `http://localhost:4000/allservices/${selectedService._id}`,
        editFormData
      );

      setServices(
        services.map((service) =>
          service._id === selectedService._id ? response.data : service
        )
      );

      setEditDialogOpen(false);
      setSelectedService(null);
    } catch (err) {
      console.error("Edit error:", err);
      setError("Failed to update service. Please try again.");
    }
  };

  // ✅ DELETE SERVICE
  const handleDeleteService = async (serviceId) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      await axios.delete(`http://localhost:4000/allservices/${serviceId}`);

      setServices(services.filter((service) => service._id !== serviceId));
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete service. Please try again.");
    }
  };

  useEffect(() => {
    fetchUserServices();
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: "#1a73e8" }}>
        Manage Your Services
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      {services.length === 0 ? (
        <Card sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h6" color="text.secondary">
            You haven't submitted any services yet.
          </Typography>
          <Button variant="contained" href="/services" sx={{ mt: 2, backgroundColor: "#1a73e8" }}>
            Submit a Service
          </Button>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {services.map((service) => (
            <Grid item xs={12} md={6} key={service._id}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                    <Typography variant="h6">{service.serviceName}</Typography>
                    <Box>
                      <IconButton onClick={() => handleEditClick(service)} sx={{ color: "#1a73e8" }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteService(service._id)} sx={{ color: "#d32f2f" }}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  <Chip label={service.categoryId} size="small" sx={{ mb: 2, backgroundColor: "#e8f0fe", color: "#1a73e8" }} />

                  <Typography variant="body2" color="text.secondary" paragraph>
                    {service.basicDetails}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Service</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="Service Name" name="serviceName" value={editFormData.serviceName} onChange={handleEditChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth select label="Category" name="categoryId" value={editFormData.categoryId} onChange={handleEditChange}>
                  {serviceCategories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth multiline rows={4} label="Description" name="basicDetails" value={editFormData.basicDetails} onChange={handleEditChange} />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained" sx={{ backgroundColor: "#1a73e8" }}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageServices;
