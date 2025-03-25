import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  MenuItem,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AuthContext } from "../../App";
import serviceService from "../services/serviceService";

const serviceCategories = [
  'Home Cleaning',
  'Plumbing',
  'Electrical',
  'Carpentry',
  'Painting',
  'Gardening',
  'Appliance Repair',
  'Moving Services',
  'Pest Control',
  'Other'
];

// Sample data for states and cities (in a real app, this would come from an API)
const states = [
  { id: "1", name: "Gujarat" },
  { id: "2", name: "Rajasthan" },
  { id: "3", name: "Tamilnadu" },
  // Add more states as needed
];

const cities = {
  1: [
    { id: "1", name: "Palanpur" },
    { id: "2", name: "Surat" },
    { id: "3", name: "Ahmedabad" },
  ],
  2: [
    { id: "4", name: "Udaipur" },
    { id: "5", name: "Jaipur" },
    { id: "6", name: "Jaisalmer" },
  ],
  3: [
    { id: "7", name: "Chennai" },
    { id: "8", name: "Kanyakumari" },
    { id: "9", name: "Thiruvanthpuram" },
  ],
};

const areas = {
  1: [
    { id: "1", name: "Agola" },
    { id: "2", name: "Kozi tower" },
    { id: "3", name: "Aroma Circle" },
  ],
  2: [
    { id: "4", name: "Dindoli" },
    { id: "5", name: "Pandesara" },
    { id: "6", name: "Udhana" },
    { id: "7", name: "Althan" },
    { id: "8", name: "Bamroli" },
  ],
  3: [
    { id: "9", name: "Bapunagar" },
    { id: "10", name: "Bodakdev" },
    { id: "11", name: "Ellisbridge" },
    { id: "12", name: "Ghatlodia" },
    { id: "13", name: "" },
    { id: "14", name: "" },
    { id: "15", name: "" },
  ],
};

function AddService() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [categories, setCategories] = useState([]);
  const [ states, setStates] = useState([]);
  const [ cities, setCities] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [formData, setFormData] = useState({
    serviceName: "",
    serviceDate: null,
    address: "",
    category: "",
    subcategory: "",
    state: "",
    city: "",
    area: "",
    description: "",
    price: "",
    contactPhone: "",
  });

  useEffect(() => {
    getAllStates();
  }, []);

  const getAllStates = async () => {
    const res = await axios.get("/state/getallstates");
    setStates(res.data.data);
  };

  const getCityByStateId = async (id) => {
    const res = await axios.get("/city/getcitybystate/" + id);
    setCities(res.data.data);
  };

  const getAreaByCityId = async (id) => {
    const res = await axios.get("/area/getareabycity/" + id);
    setAreas(res.data.data);
  };

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await serviceService.getCategories();
        setCategories(response);
      } catch (error) {
        setError("Failed to fetch categories");
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch subcategories when category changes
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (formData.category) {
        try {
          const response = await serviceService.getSubcategories(
            formData.category
          );
          setSubcategories(response);
        } catch (error) {
          setError("Failed to fetch subcategories");
          console.error("Error fetching subcategories:", error);
        }
      } else {
        setSubcategories([]);
      }
    };

    fetchSubcategories();
  }, [formData.category]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      serviceDate: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validate form data
      if (!formData.serviceName) {
        throw new Error("Service name is required");
      }
      if (!formData.serviceDate) {
        throw new Error("Service date is required");
      }
      if (!formData.address) {
        throw new Error("Address is required");
      }
      if (!formData.category) {
        throw new Error("Category is required");
      }
      if (!formData.subcategory) {
        throw new Error("Subcategory is required");
      }
      if (!formData.state) {
        throw new Error("State is required");
      }
      if (!formData.city) {
        throw new Error("City is required");
      }
      if (!formData.area) {
        throw new Error("Area is required");
      }
      if (!formData.price) {
        throw new Error("Price is required");
      }
      if (!formData.contactPhone) {
        throw new Error("Contact phone is required");
      }

      // Add service
      await serviceService.addService({
        ...formData,
        userId: user.id,
        status: "Active",
        createdAt: new Date().toISOString(),
      });

      setSuccess("Service added successfully!");
      // Reset form
      setFormData({
        serviceName: "",
        serviceDate: null,
        address: "",
        category: "",
        subcategory: "",
        state: "",
        city: "",
        area: "",
        description: "",
        price: "",
        contactPhone: "",
      });
    } catch (error) {
      setError(error.message || "Failed to add service");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      serviceName: "",
      serviceDate: null,
      address: "",
      category: "",
      subcategory: "",
      state: "",
      city: "",
      area: "",
      description: "",
      price: "",
      contactPhone: "",
    });
    setError("");
    setSuccess("");
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Service
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Paper elevation={3} sx={{ p: 4 }}>
          <form onSubmit={handleSubmit(andler)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Service Name"
                  name="serviceName"
                  value={formData.serviceName}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Service Date"
                    value={formData.serviceDate}
                    onChange={handleDateChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        required
                        disabled={loading}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    label="Category"
                    disabled={loading}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Subcategory</InputLabel>
                  <Select
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleInputChange}
                    label="Subcategory"
                    disabled={loading || !formData.category}
                  >
                    {subcategories.map((subcategory) => (
                      <MenuItem key={subcategory.id} value={subcategory.id}>
                        {subcategory.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth required>
                  <InputLabel>State</InputLabel>
                  <Select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    label="State"
                    disabled={loading}
                  >
                    {states.map((state) => (
                      <MenuItem key={state.id} value={state.id}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth required>
                  <InputLabel>City</InputLabel>
                  <Select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    label="City"
                    disabled={loading || !formData.state}
                  >
                    {formData.state &&
                      cities[formData.state]?.map((city) => (
                        <MenuItem key={city.id} value={city.id}>
                          {city.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth required>
                  <InputLabel>Area</InputLabel>
                  <Select
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    label="Area"
                    disabled={loading || !formData.city}
                  >
                    {formData.city &&
                      areas[formData.city]?.map((area) => (
                        <MenuItem key={area.id} value={area.id}>
                          {area.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Contact Phone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}
                >
                  <Button
                    variant="outlined"
                    onClick={handleReset}
                    disabled={loading}
                  >
                    Reset
                  </Button>
                  <Button type="submit" variant="contained" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : "Add Service"}
                  </Button>
                </Box>
              </Grid>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleInputChange}
              />

              <label htmlFor="fileInput">
                <Button
                  variant="contained"
                  component="span"
                  sx={{
                    backgroundColor: "#1a73e8",
                    color: "white",
                    "&:hover": { backgroundColor: "#1557b0" },
                  }}
                >
                  Choose File
                </Button>
              </label>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default AddService;
