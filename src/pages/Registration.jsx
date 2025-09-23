// Registration.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Container, Grid, Link } from '@mui/material';

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('http://107.20.131.86:8082/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Registration successful:', result);
        navigate('/login'); // Redirect to login page
      } else {
        console.error('Registration failed:', response.statusText);
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Server unreachable');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Register Here!</Typography>
        <Grid container spacing={2}>
          {['firstName', 'lastName', 'username', 'email', 'password', 'confirmPassword', 'phone', 'address'].map((field) => (
            <Grid item xs={12} key={field}>
              <TextField
                fullWidth
                label={field.replace(/([A-Z])/g, ' $1')}
                name={field}
                type={field.includes('password') ? 'password' : 'text'}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>Register</Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              Already have an account? <Link href="/login">Login here</Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Registration;
