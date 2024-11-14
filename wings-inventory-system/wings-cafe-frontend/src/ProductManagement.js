// src/components/ProductManagement.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProductManagement = ({ setProducts }) => {
  const [products, setLocalProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setLocalProducts(data);
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await fetch(`http://localhost:5000/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        });
        setEditingProduct(null);
      } else {
        await fetch('http://localhost:5000/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        });
      }
      fetchProducts();
      setNewProduct({ name: '', description: '', price: '', quantity: '' });
      setError('');
    } catch (err) {
      console.error('Error adding/updating product:', err);
      setError('Error adding/updating product');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
  };

  const handleSellProduct = async (id) => {
    const product = products.find((p) => p.id === id);
    if (product && product.quantity > 0) {
      const updatedQuantity = product.quantity - 1;
      try {
        await fetch(`http://localhost:5000/api/products/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...product, quantity: updatedQuantity }),
        });
        fetchProducts();
      } catch (err) {
        console.error('Error selling product:', err);
        setError('Error selling product');
      }
    } else {
      setError('Product is out of stock');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
      });
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Error deleting product');
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="product-management" style={{
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <header className="header" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#333', fontWeight: 'bold', fontSize: '24px' }}>Product Management</h2>
        <nav className="navigation" style={{ display: 'flex', gap: '15px' }}>
          <Link to="/dashboard" style={{ color: '#007bff', textDecoration: 'none', fontSize: '16px' }}>Dashboard</Link>
          <Link to="/users" style={{ color: '#007bff', textDecoration: 'none', fontSize: '16px' }}>User Management</Link>
          <button onClick={handleLogout} style={{
            backgroundColor: '#dc3545',
            color: 'white',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background 0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
          >Logout</button>
        </nav>
      </header>

      {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}

      <form onSubmit={handleAddProduct} className="product-form" style={{
        display: 'grid',
        gap: '10px',
        marginBottom: '20px'
      }}>
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          placeholder="Product Name"
          style={{
            padding: '12px',
            borderRadius: '6px',
            border: '1px solid #ddd',
            fontSize: '16px'
          }}
          required
        />
        <input
          type="text"
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          placeholder="Description"
          style={{
            padding: '12px',
            borderRadius: '6px',
            border: '1px solid #ddd',
            fontSize: '16px'
          }}
          required
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          placeholder="Price"
          step="0.01"
          style={{
            padding: '12px',
            borderRadius: '6px',
            border: '1px solid #ddd',
            fontSize: '16px'
          }}
          required
        />
        <input
          type="number"
          name="quantity"
          value={newProduct.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          style={{
            padding: '12px',
            borderRadius: '6px',
            border: '1px solid #ddd',
            fontSize: '16px'
          }}
          required
        />
        <button type="submit" style={{
          padding: '12px',
          borderRadius: '6px',
          backgroundColor: editingProduct ? '#ffc107' : '#28a745',
          color: 'white',
          border: 'none',
          fontSize: '16px',
          cursor: 'pointer'
        }}>
          {editingProduct ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      <h3 style={{ color: '#333', marginBottom: '10px', fontSize: '20px' }}>Product List</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th style={{ padding: '12px 8px', backgroundColor: '#007bff', color: 'white', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '12px 8px', backgroundColor: '#007bff', color: 'white', textAlign: 'left' }}>Description</th>
            <th style={{ padding: '12px 8px', backgroundColor: '#007bff', color: 'white', textAlign: 'left' }}>Price</th>
            <th style={{ padding: '12px 8px', backgroundColor: '#007bff', color: 'white', textAlign: 'left' }}>Quantity</th>
            <th style={{ padding: '12px 8px', backgroundColor: '#007bff', color: 'white', textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} style={{ backgroundColor: '#f9f9f9', borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '12px 8px', color: '#333' }}>{product.name}</td>
              <td style={{ padding: '12px 8px', color: '#555' }}>{product.description}</td>
              <td style={{ padding: '12px 8px', color: '#007bff' }}>R{parseFloat(product.price).toFixed(2)}</td>
              <td style={{ padding: '12px 8px', color: '#333', fontWeight: 'bold' }}>{product.quantity}</td>
              <td style={{ padding: '12px 8px', display: 'flex', gap: '5px', justifyContent: 'center' }}>
                <button
                  onClick={() => handleEditProduct(product)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#ffc107',
                    border: 'none',
                    borderRadius: '6px',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleSellProduct(product.id)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#28a745',
                    border: 'none',
                    borderRadius: '6px',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                >
                  Sell
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#dc3545',
                    border: 'none',
                    borderRadius: '6px',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
