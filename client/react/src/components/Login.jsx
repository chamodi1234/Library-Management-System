
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth1/login', { email, password });

     
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userEmail', response.data.email); 
      localStorage.setItem('name', response.data.name);

     
      if (response.data.role === 'admin') {
        navigate('/admin');
      } else if (response.data.role === 'user') {
        navigate('/user');
      } else {
        setError('Invalid role!');
      }
    } catch (err) {
      setError('Invalid credentials!');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center position-relative"
      style={{
        height: '100vh',
        background: 'url(/assets/loginbg.jpeg) no-repeat center center/cover',
        backgroundSize: 'cover',
      }}
    >
    
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          filter: 'blur(8px)',
          zIndex: -1,
        }}
      />
      <div className="bg-white p-4 rounded shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Library Management System</h2>
        <h2 className="text-center mb-4">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;