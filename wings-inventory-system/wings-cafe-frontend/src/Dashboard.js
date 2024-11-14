import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the products data from the backend API
    fetch('http://localhost:5000/api/products') // Adjust the URL if needed
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []); // Empty dependency array to run once on component mount

  const formatPrice = (price) => {
    const numericPrice = parseFloat(price);
    return isNaN(numericPrice) ? 'N/A' : numericPrice.toFixed(2);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  const chartData = {
    labels: products.map(product => product.name),
    datasets: [
      {
        label: 'Product Quantity',
        data: products.map(product => product.quantity),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div style={{
      padding: '40px',
      backgroundColor: '#f3f4f6',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
    }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
      }}>
        <h2 style={{ color: '#007bff', fontWeight: 'bold', fontSize: '24px' }}>Dashboard</h2>
        <nav style={{ display: 'flex', gap: '15px' }}>
          <Link to="/products" style={{ color: '#007bff', textDecoration: 'none', fontSize: '16px' }}>Product Management</Link>
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

      <div style={{ display: 'flex', gap: '30px' }}>
        <section style={{
          width: '60%',
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}>
          <h3 style={{
            color: '#333',
            borderBottom: '2px solid #eee',
            paddingBottom: '10px',
            marginBottom: '20px',
            fontSize: '20px',
          }}>Current Products</h3>
          {products.length === 0 ? (
            <p style={{ color: '#888', fontSize: '16px' }}>No products have been added yet.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
              <thead>
                <tr>
                  <th style={{
                    padding: '12px 8px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'left',
                    borderRadius: '8px 0 0 8px',
                  }}>Name</th>
                  <th style={{
                    padding: '12px 8px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'left',
                  }}>Description</th>
                  <th style={{
                    padding: '12px 8px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'left',
                  }}>Price</th>
                  <th style={{
                    padding: '12px 8px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'left',
                    borderRadius: '0 8px 8px 0',
                  }}>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} style={{
                    backgroundColor: '#f9f9f9',
                    transition: 'background 0.2s',
                    cursor: 'pointer',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e6f7ff'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                  >
                    <td style={{ padding: '12px 8px', borderBottom: '1px solid #ddd' }}>{product.name}</td>
                    <td style={{ padding: '12px 8px', borderBottom: '1px solid #ddd' }}>{product.description}</td>
                    <td style={{ padding: '12px 8px', borderBottom: '1px solid #ddd' }}>R{formatPrice(product.price)}</td>
                    <td style={{ padding: '12px 8px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>{product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <div style={{
          width: '35%',
          height: '400px',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}>
          <h3 style={{
            color: '#333',
            marginBottom: '15px',
            fontSize: '18px',
          }}>Product Quantities</h3>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
