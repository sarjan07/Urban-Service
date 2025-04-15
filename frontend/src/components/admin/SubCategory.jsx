import React from 'react';

const AddSubCategory = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add your form handling logic here (e.g. API call)
    const categoryName = e.target.categoryName.value;
    const categoryDescription = e.target.categoryDescription.value;

    console.log("Category:", categoryName);
    console.log("Description:", categoryDescription);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Add New SubCategory
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="categoryName">
            Sub-Category Name
          </label>
          <input
            type="text"
            id="categoryName"
            name="categoryName"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. Plumbing, Electrical"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="categoryDescription">
            Description (optional)
          </label>
          <textarea
            id="categoryDescription"
            name="categoryDescription"
            rows="3"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write a short description..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Add Sub-Category
        </button>
      </form>
    </div>
  );
};

export default AddSubCategory;
