import { useState } from "react";
import DOMPurify from "dompurify";

const NewItem = ({ groceries, addNewItem }) => {
  const [newItem, setNewItem] = useState("");

  const [newCategory, setNewCategory] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");

  const resetDropdown = () => {
    setSelectedCategory(""); // Resetting to initial state
  };
  const handleAddNewItem = () => {
    if (!newItem.trim() || (!newCategory.trim() && !selectedCategory.trim())) {
      alert("Please fill in all fields");
      return;
    }
    // Simple regex to allow only letters, numbers, and spaces
    const validInputRegex = /^[a-zA-Z0-9\s]+$/;

    if (
      !validInputRegex.test(newItem) ||
      (!validInputRegex.test(newCategory) && newCategory)
    ) {
      alert("Only alphanumeric characters and spaces are allowed");
      return;
    }

    const sanitizedItem = DOMPurify.sanitize(newItem);
    const sanitizedCategory = DOMPurify.sanitize(newCategory);

    addNewItem(sanitizedItem, sanitizedCategory, selectedCategory);
  };

  return (
    <article className="new-item">
      <h2>Add New Item</h2>
      <h3>Pick Existing Category</h3>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Pick a category</option>
        {Object.keys(groceries).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
        {newCategory && !groceries[newCategory] && (
          <option value={newCategory}>{newCategory}</option>
        )}
      </select>
      <button onClick={resetDropdown}>Reset Category</button>
      <h3>Add New Category</h3>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="Enter new category"
      />
      <h3>Add New Item</h3>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add new item"
      />
      <button onClick={handleAddNewItem}>Add Item</button>
    </article>
  );
};

export default NewItem;
