//Login.jsx

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Link, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const generateCaptcha = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 6 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
};

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    captchaInput: '',
  });
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.captchaInput !== captcha) {
      setCaptcha(generateCaptcha());
      setFormData({ ...formData, captchaInput: '' });
      return;
    }

    setLoading(true);

    axios.post('http://localhost:8082/adminlogin', {
      username: formData.username,
      password: formData.password
    })
    .then((response) => {
      if (response.data && response.data.username) {
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("isAdmin", "true"); // <<< Store Admin Identity
        navigate("/admin");
      } else {
        localStorage.setItem("isAdmin", "false"); // Failed login → Not Admin
        setFormData({ ...formData, username: "" }); // clear username on login fail
        alert("Invalid username or password");
        console.log("Invalid username or password");
      }})
      .catch((error) => {
        console.error("Login error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
    };

  const handleCaptchaClick = () => {
    setCaptcha(generateCaptcha());
    setFormData({ ...formData, captchaInput: '' });
  };

  return (
    <div
    style={{
       backgroundImage: 'url(https://png.pngtree.com/background/20210711/original/pngtree-light-color-antique-simple-food-miso-noodles-e-commerce-banner-picture-image_1118205.jpg)',
       backgroundSize: 'cover', 
       backgroundPosition: 'center',
       width: '100vw',
       height: '130vh', 
       backgroundRepeat: 'no-repeat',
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',}}
       >
    <Container maxWidth="xs">
      <Box
        sx={{
          textAlign: 'center',
          my: 4,
          p: 4,
          border: '1px solid #ccc',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Admin Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            margin="normal"
          />
          {/* CAPTCHA */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2 }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 'bold',
                backgroundColor: '#0f0f0',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                userSelect: 'none',
                mr: 2,
              }}
              onClick={handleCaptchaClick}
            >
              {captcha}
            </Typography>
            <TextField
              label="Enter CAPTCHA"
              name="captchaInput"
              value={formData.captchaInput}
              onChange={handleChange}
              required
              margin="normal"
            />
          </Box>

          {/* Login Button */}
          <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
            Admin Login
          </Button>

          {/* Loading Indicator */}
          {loading && (
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <CircularProgress />
            </Box>
          )}

         
        </form>
      </Box>

      {/* Toast container */}
      <ToastContainer />
    </Container>
    </div>
  );
};

export default AdminLogin;