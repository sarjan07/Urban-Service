import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AddUser = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user1", data);
      alert("User added successfully!");
      navigate("/viewuser");
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
      alert("Failed to add user");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <h2 className="text-center mb-4">Add New User</h2>

        <form onSubmit={handleSubmit(submitHandler)}>

          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className={`form-control ${errors.Name ? "is-invalid" : ""}`}
              {...register("Name", { required: "Name is required" })}
              placeholder="Enter name"
            />
            {errors.Name && (
              <div className="invalid-feedback">{errors.Name.message}</div>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email", { required: "Email is required" })}
              placeholder="Enter email"
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              {...register("password", { required: "Password is required" })}
              placeholder="Enter password"
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          {/* Status Dropdown */}
          <div className="mb-3">
            <label className="form-label">Status: </label>
            <select
              className={`form-select ${errors.status ? "is-invalid" : ""}`}
              {...register("status", { required: "Status is required" })}
            >
              <option value="">Select Status</option>
              <option value="True">True</option>
              <option value="False">False</option>
            </select>
            {errors.status && (
              <div className="invalid-feedback">{errors.status.message}</div>
            )}
          </div>

          {/* Role Dropdown */}
          <div className="mb-3">
            <label className="form-label">Role: </label>
            <select
              className={`form-select ${errors.role ? "is-invalid" : ""}`}
              {...register("role", { required: "Role is required" })}
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Service Provider">Service Provider</option>
            </select>
            {errors.role && (
              <div className="invalid-feedback">{errors.role.message}</div>
            )}
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-between mt-4">
            <button type="submit" className="btn btn-dark w-50 me-2">
              Add User
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary w-50 ms-2"
              onClick={() => reset()}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};



// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export const AddUser = () => {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const [users, setUsers] = useState([]);
//   const [categories, setCategories] = useState([]);

//   const submitHandler = async (data) => {
//     try {
//       await axios.post("/user1");
//       alert("User added successfully!");
//       navigate("/viewuser");
//     } catch (error) {
//       alert("Failed to add user");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Add New User</h2>

//       <form onSubmit={handleSubmit(submitHandler)}>
//         {[
//           { name: "Name", type: "text", label: "Name", required: true },
//           //   { name: "status", type: "text", label: "Status", required: true },
//           { name: "role", type: "text", label: "Role", required: true },
//           { name: "email", type: "email", label: "Email", required: true },
//           {
//             name: "password",
//             type: "password",
//             label: "Password",
//             required: true,
//           },
//         ].map(({ name, type, label, required }) => (
//           <div className="mb-3" key={name}>
//             <label className="form-label">{label}</label>
//             <input
//               type={type}
//               className={`form-control ${errors[name] ? "is-invalid" : ""}`}
//               {...register(
//                 name,
//                 required ? { required: `${label} is required` } : {}
//               )}
//               placeholder={`Enter ${label.toLowerCase()}`}
//             />
//             {errors[name] && (
//               <div className="invalid-feedback">{errors[name].message}</div>
//             )}
//           </div>
//         ))}

//         {/* Status Dropdown */}
//         <div className="mb-3">
//           <label className="form-label">Status</label>
//           <select
//             className={`form-select ${errors.status ? "is-invalid" : ""}`}
//             {...register("status", { required: "Status is required" })}
//           >
//             <option value="">Select Status:</option>
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>
//           {errors.status && (
//             <div className="invalid-feedback">{errors.status.message}</div>
//           )}
//         </div>

//         {/* Role Dropdown */}
//         <div className="mb-3">
//           <label className="form-label">Role</label>
//           <select
//             className={`form-select ${errors.role ? "is-invalid" : ""}`}
//             {...register("role", { required: "Role is required" })}
//           >
//             <option value="">Select Role:</option>
//             <option value="Admin">Admin</option>
//             <option value="User">User</option>
//             <option value="Service Provider">Service Provider</option>
//           </select>
//           {errors.role && (
//             <div className="invalid-feedback">{errors.role.message}</div>
//           )}
//         </div>

//         {/* Buttons */}
//         <div className="d-flex justify-content-between mt-4">
//           <button type="submit" className="btn btn-dark w-50 me-2">
//             Add User
//           </button>
//           <button type="reset" className="btn btn-outline-primary w-50 ms-2">
//             Reset
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

