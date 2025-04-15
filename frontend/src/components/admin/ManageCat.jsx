import React, { useState, useEffect } from "react";
import { Flip, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ManageCat = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Inline CSS styles
  const styles = {
    container: {
      padding: "20px",
      maxWidth: "1000px",
      margin: "0 auto",
      fontFamily: "Arial, sans-serif",
    },
    header: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "20px",
      textAlign: "center",
    },
    errorMessage: {
      backgroundColor: "#ffebee",
      color: "#d32f2f",
      padding: "10px",
      borderRadius: "4px",
      marginBottom: "20px",
      textAlign: "center",
    },
    editForm: {
      backgroundColor: "#f8f9fa",
      padding: "20px",
      borderRadius: "8px",
      marginBottom: "30px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    formTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "15px",
      color: "#444",
    },
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "500",
      color: "#555",
    },
    input: {
      width: "100%",
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      fontSize: "14px",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      minHeight: "100px",
      fontSize: "14px",
      resize: "vertical",
    },
    buttonGroup: {
      display: "flex",
      gap: "10px",
      marginTop: "15px",
    },
    button: {
      padding: "8px 15px",
      borderRadius: "4px",
      border: "none",
      cursor: "pointer",
      fontWeight: "500",
      fontSize: "14px",
    },
    primaryButton: {
      backgroundColor: "#4caf50",
      color: "white",
    },
    secondaryButton: {
      backgroundColor: "#f2f2f2",
      color: "#333",
    },
    disabledButton: {
      opacity: 0.6,
      cursor: "not-allowed",
    },
    tableContainer: {
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "20px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      overflowX: "auto",
    },
    tableTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "15px",
      color: "#444",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    tableHeader: {
      backgroundColor: "#f5f5f5",
      color: "#444",
      padding: "12px 15px",
      textAlign: "left",
      borderBottom: "2px solid #ddd",
      fontWeight: "600",
    },
    tableCell: {
      padding: "12px 15px",
      borderBottom: "1px solid #eee",
    },
    tableRow: {
      transition: "background-color 0.2s",
    },
    tableRowHover: {
      backgroundColor: "#f9f9f9",
    },
    actionButtons: {
      display: "flex",
      gap: "8px",
    },
    editButton: {
      backgroundColor: "#2196f3",
      color: "white",
      padding: "6px 12px",
      borderRadius: "4px",
      border: "none",
      cursor: "pointer",
    },
    deleteButton: {
      backgroundColor: "#f44336",
      color: "white",
      padding: "6px 12px",
      borderRadius: "4px",
      border: "none",
      cursor: "pointer",
    },
    loadingText: {
      textAlign: "center",
      padding: "20px",
      color: "#666",
    },
    noDataText: {
      textAlign: "center",
      padding: "30px",
      color: "#666",
      backgroundColor: "#f5f5f5",
      borderRadius: "4px",
    },
  };

  // Get categories on component mount
  useEffect(() => {
    getCategories();
    handleDeleteCategory();
    startEditing();
  }, []);

  const getCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Using your API endpoint 'allcategory'
      const response = await axios.get("/allcategory");
      setCategories(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to get categories");
      console.error("Error fetching categories:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateCategory = async () => {
    e.preventDefault();
    if (!editingCategory) return;

    setIsLoading(true);
    setError(null);
    try {
      // Update category using your API endpoint
      await axios.put(`/allcategory/${editingCategory.id}`, editingCategory);

      toast.success("Category updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
      });

      // Refresh categories list
      await getCategories();
      // Exit edit mode
      setEditingCategory(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update category");
      console.error("Error updating category:", err);
      
      toast.error("Failed to update category", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    // if (!window.confirm("Are you sure you want to delete this category?")) {
    //   return;
    // }

    setIsLoading(true);
    setError(null);
    try {
      // Delete category using your API endpoint
      const res = await axios.delete(`/delcat/${categoryId}`);
      console.log(res.data);

      toast.success("Category deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
      });

      // Refresh categories list
      await getCategories();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete category");
      console.error("Error deleting category:", err);
      
      toast.error("Failed to delete category", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
      });
    }};

  const startEditing = (category) => {
    setEditingCategory({ ...category });
  };

  const cancelEditing = () => {
    setEditingCategory(null);
  };

  // Create row hover effect
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Manage Categories</h2>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Flip}
      />

      {error && <div style={styles.errorMessage}>{error}</div>}

      {/* Edit Category Form - Only shown when editing */}
      {/* {editingCategory && (
        <div style={styles.editForm}>
          <h3 style={styles.formTitle}>Edit Category</h3>
          <form onSubmit={handleUpdateCategory}>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="edit-category-name">Name:</label>
              <input
                style={styles.input}
                type="text"
                id="edit-category-name"
                value={editingCategory.name}
                onChange={(e) =>
                  setEditingCategory({
                    ...editingCategory,
                    name: e.target.value,
                  })
                }
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="edit-category-description">Description:</label>
              <textarea
                style={styles.textarea}
                id="edit-category-description"
                value={editingCategory.description}
                onChange={(e) =>
                  setEditingCategory({
                    ...editingCategory,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div style={styles.buttonGroup}>
              <button 
                type="submit" 
                style={{
                  ...styles.button,
                  ...styles.primaryButton,
                  ...(isLoading ? styles.disabledButton : {})
                }}
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Category"}
              </button>
              <button
                type="button"
                style={{
                  ...styles.button, 
                  ...styles.secondaryButton,
                  ...(isLoading ? styles.disabledButton : {})
                }}
                onClick={cancelEditing}
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )} */}

      {/* Categories List */}
      <div style={styles.tableContainer}>
        {/* <h3 style={styles.tableTitle}>ManageCategories</h3> */}
        {isLoading && !editingCategory ? (
          <p style={styles.loadingText}>Loading categories...</p>
        ) : categories.length === 0 ? (
          <p style={styles.noDataText}>No categories found.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Description</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr 
                  key={category.id}
                  style={{
                    ...styles.tableRow,
                    ...(hoveredRow === category.id ? styles.tableRowHover : {})
                  }}
                  onMouseEnter={() => setHoveredRow(category.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td style={styles.tableCell}>{category.name}</td>
                  <td style={styles.tableCell}>{category.description}</td>
                  <td style={styles.tableCell}>
                    <div style={styles.actionButtons}>
                      <button
                        style={{
                          ...styles.editButton,
                          ...(isLoading || editingCategory !== null ? styles.disabledButton : {})
                        }}
                        onClick={() => startEditing(category)}
                        disabled={isLoading || editingCategory !== null}
                      >
                        Edit
                      </button>
                      <button
                        style={{
                          ...styles.deleteButton,
                          ...(isLoading || editingCategory !== null ? styles.disabledButton : {})
                        }}
                        onClick={() => handleDeleteCategory(category.id)}
                        disabled={isLoading || editingCategory !== null}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageCat;


// import React, { useState, useEffect } from "react";
// import { Flip, toast, ToastContainer } from "react-toastify";

// const ManageCat = () => {
//   const [categories, setCategories] = useState([]);
//   const [newCategory, setNewCategory] = useState({ name: "", description: "" });
//   const [editingCategory, setEditingCategory] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Get categories on component mount
//   useEffect(() => {
//     getCategories();
//   }, []);

//   const getCategories = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       // Replace with your actual API endpoint
//       const response = await get("/allcategory");
//       if (!response.ok) {
//         throw new Error("Failed to get categories");
//       }
//       const data = await response.json();
//       setCategories(data);
//     } catch (err) {
//       setError(err.message);
//       console.error("Error fetching categories:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleAddCategory = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);
//     try {
//       // Replace with your actual API endpoint
//       const response = await get("/allcategory");

//       if (!response.ok) {
//         throw new Error("Failed to add category");
//       }

//       // Refresh categories list
//       await getCategories();
//       // Clear the form
//       setNewCategory({ name: "", description: "" });
//     } catch (err) {
//       setError(err.message);
//       console.error("Error adding category:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleUpdateCategory = async (e) => {
//     e.preventDefault();
//     if (!editingCategory) return;

//     setIsLoading(true);
//     setError(null);
//     try {
//       // Replace with your actual API endpoint
//       const response = await axios.get(`/allcategory`);

//       if (!response.ok) {
//         throw new Error("Failed to update category");
//       }

//       // Refresh categories list
//       await getCategories();
//       // Exit edit mode
//       setEditingCategory(null);
//     } catch (err) {
//       setError(err.message);
//       console.error("Error updating category:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDeleteCategory = async (categoryId) => {
//     // if (!window.confirm("Are you sure you want to delete this category?")) {
//     //   return;
//     // }

//     setIsLoading(true);
//     setError(null);
//     try {
//       // Replace with your actual API endpoint
//       const response = await axios.delete("/delcat");

//       // toaster
//       toast.success(" Delete Category Successfully!", {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         transition: Flip,
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete category");
//       }

//       // Refresh categories list
//       await getCategories();
//     } catch (err) {
//       setError(err.message);
//       console.error("Error deleting category:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const startEditing = (category) => {
//     setEditingCategory({ ...category });
//   };

//   const cancelEditing = () => {
//     setEditingCategory(null);
//   };

//   return (
//     <div className="category-management">
//       <h2>Category Management</h2>
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick={false}
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//         transition={Flip}
//       />

//       {error && <div className="error-message">{error}</div>}

//       {/* Add New Category Form */}
//       <div className="add-category-form">
//         <h3>Add New Category</h3>
//         <form onSubmit={handleAddCategory}>
//           <div className="form-group">
//             <label htmlFor="category-name">Name:</label>
//             <input
//               type="text"
//               id="category-name"
//               value={newCategory.name}
//               onChange={(e) =>
//                 setNewCategory({ ...newCategory, name: e.target.value })
//               }
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="category-description">Description:</label>
//             <textarea
//               id="category-description"
//               value={newCategory.description}
//               onChange={(e) =>
//                 setNewCategory({ ...newCategory, description: e.target.value })
//               }
//             />
//           </div>
//           <button type="submit" disabled={isLoading}>
//             {isLoading ? "Adding..." : "Add Category"}
//           </button>
//         </form>
//       </div>

//       {/* Edit Category Form */}
//       {editingCategory && (
//         <div className="edit-category-form">
//           <h3>Edit Category</h3>
//           <form onSubmit={handleUpdateCategory}>
//             <div className="form-group">
//               <label htmlFor="edit-category-name">Name:</label>
//               <input
//                 type="text"
//                 id="edit-category-name"
//                 value={editingCategory.name}
//                 onChange={(e) =>
//                   setEditingCategory({
//                     ...editingCategory,
//                     name: e.target.value,
//                   })
//                 }
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="edit-category-description">Description:</label>
//               <textarea
//                 id="edit-category-description"
//                 value={editingCategory.description}
//                 onChange={(e) =>
//                   setEditingCategory({
//                     ...editingCategory,
//                     description: e.target.value,
//                   })
//                 }
//               />
//             </div>
//             <div className="form-actions">
//               <button type="submit" disabled={isLoading}>
//                 {isLoading ? "Updating..." : "Update Category"}
//               </button>
//               <button
//                 type="button"
//                 onClick={cancelEditing}
//                 disabled={isLoading}
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Categories List */}
//       <div className="categories-list">
//         <h3>Categories</h3>
//         {isLoading && !editingCategory ? (
//           <p>Loading categories...</p>
//         ) : categories.length === 0 ? (
//           <p>No categories found. Add a category above.</p>
//         ) : (
//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Description</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {categories.map((category) => (
//                 <tr key={category.id}>
//                   <td>{category.name}</td>
//                   <td>{category.description}</td>
//                   <td>
//                     <button
//                       onClick={() => startEditing(category)}
//                       disabled={isLoading || editingCategory !== null}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDeleteCategory(category.id)}
//                       disabled={isLoading || editingCategory !== null}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ManageCat;
