import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
// import { getallServices } from "../../../../backend/src/controllers/FormController";
// import axios from "axios";

const AddService = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    getAllCategory();
    getAllState();
  }, []);

  const getAllCategory = async () => {
    const res = await axios.get("/allcategory");
    console.log(res.data.data);
    setCategories(res.data.data);
  };

  const getAllState = async () => {
    const res = await axios.get("/states");
    console.log(res.data.data);
    setStates(res.data.data);
  }

  const getCitybyStateId = async(stateId)=>{
    const res = await axios.get(`/getcitybystate/${stateId}`);
    setCities(res.data.data);
  }

  const getAreabyCityId = async(cityId)=>{
    const res = await axios.get(`/getareabycity/${cityId}`);
    setAreas(res.data.data);
  }

  const submitHandler = async (data) => {
    console.log(data);
    try {
      await axios.post("/addform", {
        ...data,
        userId: user.id,
        status: "Active",
      });
      alert("Service added successfully!");
      navigate("/services");
    } catch (error) {
      alert("Failed to add service");
    }
  };

  const formRowStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "16px",
  };

  const labelStyle = {
    width: "160px", // consistent label width
    marginRight: "12px",
    fontWeight: "500",
    color: "#374151", // Tailwind text-gray-700
    textAlign: "right",
  };

  const inputStyle = {
    flex: 1,
    padding: "10px",
    border: "1px solid #D1D5DB",
    borderRadius: "8px",
    outline: "none",
  };

  const errorStyle = {
    color: "#EF4444",
    fontSize: "0.875rem",
    marginTop: "4px",
    marginLeft: "172px", // aligns with input start
    marginBottom: "-10px",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#F3F4F6",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          padding: "32px",
          borderRadius: "12px",
          boxShadow: "0 10px 15px rgba(201, 115, 115, 0.1)",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#111827",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          Add New Service
        </h2>

        <form onSubmit={handleSubmit(submitHandler)}>
          {/* Reusable form field generator */}
          {[
            {
              name: "serviceName",
              type: "text",
              label: "Service Name",
              required: true,
            },
            {
              name: "serviceDate",
              type: "date",
              label: "Service Date",
              required: true,
            },
            { name: "address", type: "text", label: "Address", required: true },
            { name: "price", type: "number", label: "Price", required: true },
            {
              name: "phoneNumber",
              type: "tel",
              label: "Phone Number",
              required: true,
            },
          ].map(({ name, type, label, required }) => (
            <div key={name}>
              <div style={formRowStyle}>
                <label style={labelStyle}>{label}:</label>
                <input
                  type={type}
                  {...register(
                    name,
                    required ? { required: `${label} is required` } : {}
                  )}
                  style={inputStyle}
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              </div>
              {errors[name] && <p style={errorStyle}>{errors[name].message}</p>}
            </div>
          ))}

          {/* Select fields */}
          {/* {[
            { name: "category", label: "Category", options: categories },
            { name: "subcategory", label: "Subcategory", options: subcategories },
            { name: "state", label: "State", options: states },
            { name: "city", label: "City", options: cities },
            { name: "area", label: "Area", options: areas },
          ].map(({ name, label, options }) => (
            <div key={name} style={formRowStyle}>
              <label style={labelStyle}>{label}:</label>
              <select {...register(name)} style={inputStyle}>
                <option value="">Select {label}</option>
                {options.map((opt) => (
                  <option key={opt.id} value={opt.id}>{opt.name}</option>
                ))}
              </select>
            </div>
          ))} */}

          {/* Category */}
          <div style={formRowStyle}>
            <label style={labelStyle}>Category</label>
            <select
              {...register("category")}
              style={inputStyle}
              onChange={(event) => getAllCategory(event.target.value)}
            >
              <option value="">Select Category</option>
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

              {/* Subcategory */}
          {/* <div style={formRowStyle}>
            <label style={labelStyle}>Category</label>
            <select
              {...register("category")}
              style={inputStyle}
              onChange={(event) => getAllCategory(event.target.value)}
            >
              <option value="">Select Category</option>
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div> */}

            {/* State */}
            <div style={formRowStyle}>
            <label style={labelStyle}>State</label>
            <select
              {...register("state")}
              style={inputStyle}
              onChange={(event) => getCitybyStateId(event.target.value)}
            >
              <option value="">Select State</option>
              {states?.map((state) => (
                <option key={state._id} value={state._id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div style={formRowStyle}>
            <label style={labelStyle}>City</label>
            <select
              {...register("city")}
              style={inputStyle}
              onChange={(event) => getAreabyCityId(event.target.value)}
              
            >
              <option value="">Select City</option>
              {cities?.map((city) => (
                <option key={city._id} value={city._id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

              {/* Area */}
          <div style={formRowStyle}>
            <label style={labelStyle}>Area</label>
            <select
              {...register("area")}
              style={inputStyle}
              
            >
              <option value="">Select Area</option>
              {areas?.map((area) => (
                <option key={area._id} value={area._id}>
                  {area.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Description */}
          <div style={formRowStyle}>
            <label style={labelStyle}>Description:</label>
            <textarea
              {...register("description")}
              style={{ ...inputStyle, height: "60px" }}
              placeholder="Enter description"
            />
          </div>

          {/* File Upload */}
          <div style={formRowStyle}>
            <label style={labelStyle}>Upload File:</label>
            <input type="file" {...register("file")} style={inputStyle} />
          </div>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "24px",
            }}
          >
            <button
              type="submit"
              style={{
                flex: 1,
                backgroundColor: "black",
                color: "white",
                padding: "12px",
                borderRadius: "8px",
                marginRight: "10px",
                cursor: "pointer",
              }}
            >
              Add Service
            </button>
            <button
              type="reset"
              style={{
                flex: 1,
                backgroundColor: "#DBEAFE", // Tailwind blue-100
                color: "#1E3A8A", // Tailwind blue-900
                padding: "12px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddService;

// import { useState, useEffect, useContext } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../App";
// import axios from "axios";

// const AddService = () => {
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [areas, setAreas] = useState([]);

//   useEffect(() => {
//     axios.get("/allcategory").then((res) => setCategories(res.data.data));
//     axios.get("/allsubcategory").then((res) => setSubcategories(res.data.data));
//     axios.get("/states").then((res) => setStates(res.data.data));
//     axios.get("/allcity").then((res) => setCities(res.data.data));
//     axios.get("/allareas").then((res) => setAreas(res.data.data));
//   }, []);

//   const submitHandler = async (data) => {
//     try {
//       await axios.post("/addService", {
//         ...data,
//         userId: user.id,
//         status: "Active",
//       });
//       alert("Service added successfully!");
//       navigate("/services");
//     } catch (error) {
//       alert("Failed to add service");
//     }
//   };

//   const labelStyle = {
//     display: "block",
//     marginBottom: "4px",
//     color: "#4B5563", // Tailwind's text-gray-600
//     fontWeight: "500",
//   };

//   const inputStyle = {
//     width: "100%",
//     padding: "10px",
//     border: "1px solid #D1D5DB", // Tailwind border-gray-300
//     borderRadius: "8px",
//     outline: "none",
//     marginBottom: "8px",
//   };

//   const errorStyle = {
//     color: "#EF4444", // Tailwind text-red-500
//     fontSize: "0.875rem",
//     marginTop: "-6px",
//     marginBottom: "8px",
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "100vh",
//         backgroundColor: "#F3F4F6", // Tailwind bg-gray-100
//         padding: "20px",
//         textAlign: "center",
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: "#FFFFFF",
//           padding: "24px",
//           borderRadius: "12px",
//           boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
//           width: "100%",
//           maxWidth: "768px",
//         }}
//       >
//         <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#374151", marginBottom: "20px" }}>
//           Add New Service
//         </h2>

//         <form onSubmit={handleSubmit(submitHandler)}>

//           {/* Service Name */}
//           <label style={labelStyle}>Service Name</label>
//           <input
//             {...register("serviceName", { required: "Service name is required" })}
//             style={inputStyle}
//             placeholder="Enter service name"
//           />
//           {errors.serviceName && <p style={errorStyle}>{errors.serviceName.message}</p>}

//           {/* Service Date */}
//           <label style={labelStyle}>Service Date</label>
//           <input
//             type="date"
//             {...register("serviceDate", { required: "Service date is required" })}
//             style={inputStyle}
//           />
//           {errors.serviceDate && <p style={errorStyle}>{errors.serviceDate.message}</p>}

//           {/* Address */}
//           <label style={labelStyle}>Address</label>
//           <input
//             {...register("address", { required: "Address is required" })}
//             style={inputStyle}
//             placeholder="Enter address"
//           />
//           {errors.address && <p style={errorStyle}>{errors.address.message}</p>}

//           {/* Category */}
//           <label style={labelStyle}>Category</label>
//           <select {...register("category")} style={inputStyle}>
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id}>{cat.name}</option>
//             ))}
//           </select>

//           {/* Subcategory */}
//           <label style={labelStyle}>Subcategory</label>
//           <select {...register("subcategory")} style={inputStyle}>
//             <option value="">Select Subcategory</option>
//             {subcategories.map((sub) => (
//               <option key={sub.id} value={sub.id}>{sub.name}</option>
//             ))}
//           </select>

//           {/* State */}
//           <label style={labelStyle}>State</label>
//           <select {...register("state")} style={inputStyle}>
//             <option value="">Select State</option>
//             {states.map((state) => (
//               <option key={state.id} value={state.id}>{state.name}</option>
//             ))}
//           </select>

//           {/* City */}
//           <label style={labelStyle}>City</label>
//           <select {...register("city")} style={inputStyle}>
//             <option value="">Select City</option>
//             {cities.map((city) => (
//               <option key={city.id} value={city.id}>{city.name}</option>
//             ))}
//           </select>

//           {/* Area */}
//           <label style={labelStyle}>Area</label>
//           <select {...register("area")} style={inputStyle}>
//             <option value="">Select Area</option>
//             {areas.map((area) => (
//               <option key={area.id} value={area.id}>{area.name}</option>
//             ))}
//           </select>

//           {/* Description */}
//           <label style={labelStyle}>Description</label>
//           <textarea
//             {...register("description")}
//             style={{ ...inputStyle, height: "80px" }}
//             placeholder="Enter description"
//           />

//           {/* Price */}
//           <label style={labelStyle}>Price</label>
//           <input
//             type="number"
//             {...register("price", { required: "Price is required" })}
//             style={inputStyle}
//             placeholder="Enter price"
//           />
//           {errors.price && <p style={errorStyle}>{errors.price.message}</p>}

//           {/* Phone Number */}
//           <label style={labelStyle}>Phone Number</label>
//           <input
//             type="tel"
//             {...register("phoneNumber", { required: "Phone number is required" })}
//             style={inputStyle}
//             placeholder="Enter phone number"
//           />
//           {errors.phoneNumber && <p style={errorStyle}>{errors.phoneNumber.message}</p>}

//           {/* File Upload */}
//           <label style={labelStyle}>Upload File</label>
//           <input type="file" {...register("file")} style={inputStyle} />

//           {/* Buttons */}
//           <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
//             <button
//               type="submit"
//               style={{
//                 flex: 1,
//                 backgroundColor: "black",
//                 color: "white",
//                 padding: "10px",
//                 borderRadius: "8px",
//                 cursor: "pointer",
//               }}
//             >
//               Add Service
//             </button>

//             <button
//               type="reset"
//               style={{
//                 flex: 1,
//                 backgroundColor: "lightblue",
//                 color: "black",
//                 padding: "10px",
//                 borderRadius: "8px",
//                 cursor: "pointer",
//               }}
//             >
//               Reset
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddService;
