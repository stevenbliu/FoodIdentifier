import React, { useState } from 'react';
import { registerUser } from '../../utils/authUtils'; // Assuming you have the registerUser function
import { Box, Button, FormControl, FormLabel, Input, Text, Alert, AlertIcon } from '@chakra-ui/react'; // Chakra UI components

const Register = ({ addMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      setError(''); // Clear any previous error messages
      setSuccessMessage(''); // Clear any previous success messages
      setIsLoading(true);

      const response = await registerUser(email, password); // Assuming this returns a response
      // Handle the response (e.g., save tokens, redirect user, etc.)
      addMessage('Registration successful!', 'success');
      console.log('Registration successful:', response);

      setSuccessMessage('Registration successful!');
    } catch (error) {
      let errorMessage = 'An error occurred during registration. Please try again.';

      if (error.message.includes('User already exists')) {
        errorMessage = 'The email address is already in use. Please try another one.';
      } else if (error.message.includes('Invalid email format')) {
        errorMessage = 'The email address you entered is invalid. Please check it.';
      } else if (error.message.includes('Password too short')) {
        errorMessage = 'Your password is too short. Please choose a longer one.';
      }

      addMessage(`${errorMessage}`, 'error');
      console.error('Registration error:', error);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
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
        Register
      </Text>

      {/* Display error message if any */}
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      {/* Display success message if registration was successful */}
      {successMessage && (
        <Alert status="success" mb={4}>
          <AlertIcon />
          {successMessage}
        </Alert>
      )}

      <form onSubmit={handleRegister}>
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
          isLoading={isLoading}
        >
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;
