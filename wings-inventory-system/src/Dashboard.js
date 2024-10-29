import React, { useState } from 'react';

const Dashboard = ({ products, setProducts }) => {
  const [isEditing, setIsEditing] = useState(null); // Tracks which product is being edited
  const [editData, setEditData] = useState({}); // Stores data for the product currently being edited

  // Deletes a product from the list
  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  // Initiates editing mode for a specific product
  const startEdit = (index) => {
    setIsEditing(index);
    setEditData(products[index]);
  };

  // Saves edited data for a product
  const saveEdit = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index] = editData;
    setProducts(updatedProducts);
    setIsEditing(null);
    setEditData({});
  };

  // Handles input changes in the editing fields
  const handleInputChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: field === 'price' || field === 'quantity' ? (value ? parseFloat(value) : '') : value,
    }));
  };

  // Adds stock to a product's quantity
  const handleAddStock = (index) => {
    const quantity = parseFloat(prompt("Enter quantity to add:"));
    if (!isNaN(quantity) && quantity > 0) {
      const updatedProducts = [...products];
      updatedProducts[index].quantity += quantity;
      setProducts(updatedProducts);
    } else {
      alert("Please enter a valid positive quantity.");
    }
  };

  // Deducts stock from a product's quantity
  const handleDeductStock = (index) => {
    const quantity = parseFloat(prompt("Enter quantity to deduct:"));
    if (!isNaN(quantity) && quantity > 0) {
      const updatedProducts = [...products];
      if (updatedProducts[index].quantity >= quantity) {
        updatedProducts[index].quantity -= quantity;
        setProducts(updatedProducts);
      } else {
        alert("Insufficient stock to deduct this amount.");
      }
    } else {
      alert("Please enter a valid positive quantity.");
    }
  };

  return (
    <div className="section">
      <h2>Dashboard</h2>
      <h3>Stock Overview</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              {isEditing === index ? (
                // If editing, show input fields to edit product details
                <>
                  <td>
                    <input
                      value={editData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      value={editData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      value={editData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editData.price !== null ? editData.price : ''}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editData.quantity !== null ? editData.quantity : ''}
                      onChange={(e) => handleInputChange('quantity', e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={() => saveEdit(index)}>Save</button>
                    <button onClick={() => setIsEditing(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                // If not editing, display product details
                <>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.category}</td>
                  <td>{product.price != null ? `R${product.price.toFixed(2)}` : 'N/A'}</td>
                  <td className={product.quantity <= 5 ? 'low-stock' : ''}>
                    {product.quantity != null ? product.quantity : 'N/A'}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <div className="action-group">
                        <button onClick={() => startEdit(index)}>Edit</button>
                        <button onClick={() => handleDelete(index)}>Delete</button>
                      </div>
                      <div className="action-group">
                        <button onClick={() => handleAddStock(index)}>Add Stock</button>
                        <button onClick={() => handleDeductStock(index)}>Deduct Stock</button>
                      </div>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
