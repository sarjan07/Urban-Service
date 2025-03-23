// Since we don't have a real backend API for services yet, we'll use localStorage
// This can be replaced with actual API calls when the backend is ready

const LOCAL_STORAGE_KEY = 'urbanServices';

// Initialize with some sample data if localStorage is empty
const initializeServices = () => {
  const existingServices = localStorage.getItem(LOCAL_STORAGE_KEY);
  
  if (!existingServices) {
    const sampleServices = [
      {
        id: '1',
        title: 'Professional Street Cleaning',
        description: 'Our professional street cleaning service ensures your neighborhood streets are spotless. We use eco-friendly cleaning solutions and state-of-the-art equipment.',
        category: 'Urban Cleaning',
        price: '299',
        duration: '1 day',
        image: 'https://source.unsplash.com/random/300x200/?street-cleaning',
        location: 'Citywide',
        contactPhone: '555-123-4567',
        dateCreated: '2023-03-15T10:00:00.000Z',
        status: 'Active'
      },
      {
        id: '2',
        title: 'Garden Waste Management',
        description: 'Our garden waste management service helps you dispose of organic waste in an eco-friendly manner. We collect, process, and recycle garden waste into compost.',
        category: 'Waste Management',
        price: '149',
        duration: '3 hours',
        image: 'https://source.unsplash.com/random/300x200/?garden-waste',
        location: 'All districts',
        contactPhone: '555-987-6543',
        dateCreated: '2023-02-20T14:30:00.000Z',
        status: 'Active'
      },
      {
        id: '3',
        title: 'Park Maintenance',
        description: 'Keep your local parks beautiful with our comprehensive park maintenance service. We handle lawn mowing, tree trimming, flower bed maintenance, and more.',
        category: 'Urban Maintenance',
        price: '499',
        duration: '1 week',
        image: 'https://source.unsplash.com/random/300x200/?park-maintenance',
        location: 'Central District',
        contactPhone: '555-456-7890',
        dateCreated: '2023-01-10T09:15:00.000Z',
        status: 'Active'
      }
    ];
    
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sampleServices));
    return sampleServices;
  }
  
  return JSON.parse(existingServices);
};

// Service methods for service operations
const serviceService = {
  // Get all services
  getAllServices: async () => {
    try {
      const services = initializeServices();
      return services;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },

  // Get a service by ID
  getServiceById: async (id) => {
    try {
      const services = initializeServices();
      const service = services.find(s => s.id === id);
      
      if (!service) {
        throw new Error('Service not found');
      }
      
      return service;
    } catch (error) {
      console.error('Error fetching service:', error);
      throw error;
    }
  },

  // Add a new service
  addService: async (serviceData) => {
    try {
      const services = initializeServices();
      services.push(serviceData);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(services));
      return serviceData;
    } catch (error) {
      console.error('Error adding service:', error);
      throw error;
    }
  },

  // Update an existing service
  updateService: async (id, serviceData) => {
    try {
      const services = initializeServices();
      const index = services.findIndex(s => s.id === id);
      
      if (index === -1) {
        throw new Error('Service not found');
      }
      
      services[index] = { ...services[index], ...serviceData };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(services));
      return services[index];
    } catch (error) {
      console.error('Error updating service:', error);
      throw error;
    }
  },

  // Delete a service
  deleteService: async (id) => {
    try {
      const services = initializeServices();
      const updatedServices = services.filter(s => s.id !== id);
      
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedServices));
      return { success: true };
    } catch (error) {
      console.error('Error deleting service:', error);
      throw error;
    }
  }
};

export default serviceService; 