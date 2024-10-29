import React, { useState } from 'react';

const AddProduct = ({ products, setProducts }) => {
  // State variables to store product details from the form
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  // Handles the form submission when adding a new product
  const handleSubmit = (e) => {
    e.preventDefault();
    // Checks if all fields are filled
    if (!name || !description || !category || price === '' || quantity === '') {
      alert('Please fill in all fields.');
      return;
    }

    // Checks if a product with the same name already exists
    const existingProductIndex = products.findIndex(product => product.name === name);
    if (existingProductIndex >= 0) {
      // If product exists, update its quantity
      const updatedProduct = {
        ...products[existingProductIndex],
        quantity: products[existingProductIndex].quantity + parseInt(quantity)
      };
      const updatedProducts = [...products];
      updatedProducts[existingProductIndex] = updatedProduct;
      setProducts(updatedProducts);
    } else {
      // If product doesn't exist, add it to the products array
      setProducts([...products, { name, description, category, price: parseFloat(price), quantity: parseInt(quantity) }]);
    }

    // Reset form fields
    setName('');
    setDescription('');
    setCategory('');
    setPrice('');
    setQuantity('');
  };

  // Inline styling for the form container and elements
  const styles = {
    formContainer: {
      maxWidth: '500px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f9f9f9',
    },
    formHeader: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '10px',
      fontWeight: 'bold',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '20px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#45a049', // Darker green for hover effect
    }
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.formHeader}>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Product Name Field */}
        <label style={styles.label}>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} required />
        </label>

        {/* Product Description Field */}
        <label style={styles.label}>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} style={styles.input} required />
        </label>

        {/* Product Category Field */}
        <label style={styles.label}>
          Category:
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} style={styles.input} required />
        </label>

        {/* Product Price Field */}
        <label style={styles.label}>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} style={styles.input} required min="0" />
        </label>

        {/* Product Quantity Field */}
        <label style={styles.label}>
          Quantity:
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} style={styles.input} required min="0" />
        </label>

        {/* Save Button with hover effect */}
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Save Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
