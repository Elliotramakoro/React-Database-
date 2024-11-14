// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupAndLogin from './SignupAndLogin';
import Dashboard from './Dashboard';
import ProductManagement from './ProductManagement';
import UserManagement from './UserManagement';
import './Style.css';
import { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]); // Lifted product state

  // Fetch products on initial load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error('Error fetching products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupAndLogin isLogin={false} />} />
        <Route path="/signup" element={<SignupAndLogin isLogin={false} />} />
        <Route path="/login" element={<SignupAndLogin isLogin={true} />} />
        <Route path="/dashboard" element={<Dashboard products={products} />} />
        <Route path="/products" element={<ProductManagement setProducts={setProducts} />} />
        <Route path="/users" element={<UserManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
