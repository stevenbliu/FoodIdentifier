import React, { useState } from 'react';
import { useUser } from '../../context/UserContext'; // Import user context
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../utils/authUtils'; // Import loginUser function
import { Box, Button, FormControl, FormLabel, Input, Text, Alert, AlertIcon } from '@chakra-ui/react'; // Chakra UI components

const Login = () => {
  const { login } = useUser(); // Access login function from context
  const navigate = useNavigate(); // Use navigate from react-router
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [error, setError] = useState(''); // State for errors

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }

    try {
      console.log('Logging in...');
      // Assuming loginUser returns the user object after a successful login
      const user = await loginUser(email, password, login);

      // If login is successful, call the context's login function
      login(user); // Store user in context

      // After login, redirect to the dashboard
      navigate('/dashboard');
    } catch (err) {
      // Handle errors during the login process
      setError(`Failed to login. ${err.message || 'An unexpected error occurred'}`);
    }
  };

  return (
    <Box
      maxW="sm"
      mx="auto"
      p={6}
      bg="white"
      borderRadius="lg"
      boxShadow="lg"
      mt="20"
    >
      <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
        Login
      </Text>

      {/* Display error message if any */}
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      <form onSubmit={handleLogin}>
        <FormControl id="email" mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>

        <FormControl id="password" mb={6}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="teal"
          width="full"
          size="lg"
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
