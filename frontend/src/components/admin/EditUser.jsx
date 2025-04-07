import axios from 'axios';
import React, { useEffect, useState } from 'react';

const EditUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const res = await axios.get("/users");
      setUsers(res.data.data);
      console.log("Fetched users:", res.data.data); // ✅ will show data
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUserById = async () => {
    try {
      const res = await axios.get("");
    } catch (error){
      console.log("Error, Somthing went wrong!!!!", error);
    }
  }

  return (
    <div>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Edit</th>
            {/* <th>Status</th> */}
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {/* <td>{user.status}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditUser;



// import axios from "axios";
// import React, { useEffect, useState } from "react";

// export const EditUser = () => {
//   const [message, setmessage] = useState("");
//   const [users, setusers] = useState([]);

//   const getAllUser = async () => {
//     const res = await axios.get("http://localhost:4000/users");
//     setmessage(res.data.message);
//     setusers(res.data.data);
//   };
//   useEffect(() => {
//     axios
//       .get("http://localhost:4000/users")
//       .then((response) => {
//         console.log("API Response:", response.data);
//         setusers(response.data);
//       })
//       .catch((error) => console.error("Error fetching users:", error));
//   }, []);

//   return (
//     <div style={{ textAlign: "center" }}>
//       <h1>User List</h1>
//       <button onClick={getAllUser}>Get Users</button>
//       <p>{message}</p>

//       <table class="table">
//         <thead class="thead-dark">
//           <tr>
//             <th>#</th>
//             <th>user id</th>
//             <th>Name</th>
//             <th>email</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* {users?.map?.(user => (
//   <div key={user.id}>{user.name}</div>
// ))} */}
//           {users?.map?.((user) => (
//             <tr key={user.id}>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>{user.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
