import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const ViewUser = () => {
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

  return (
    <div>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
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
