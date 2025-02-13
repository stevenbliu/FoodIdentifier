import React, { useState } from 'react';
import { Box, Button, Text, Flex, useToast } from '@chakra-ui/react';
import Register from './Register';
import Login from './Login';

const AuthContainer = () => {
  const [isSignUp, setIsSignUp] = useState(false);  // Manage toggle between Login and Register
  const [messages, setMessages] = useState([]);
  const toast = useToast();  // Chakra UI toast for displaying messages

  // Helper function to add a message (using toast)
  const addMessage = (message, status) => {
    toast({
      title: message,
      status: status, // 'success', 'error', 'info', 'warning'
      duration: 5000,
      isClosable: true,
    });
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);  // Toggle between Login and Register
  };

  return (
    <Box
      maxW="lg"
      mx="auto"
      p={6}
      bg="blue.100"
      borderRadius="lg"
      boxShadow="lg"
      mt="20"
    >
      <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center" bg='red'>
        Authentication
      </Text>

      {/* Display messages using Chakra UI Toast */}
      {messages.map((msg) => (
        <Box
          key={msg.id}
          p={3}
          mb={2}
          borderRadius="md"
          bg={msg.type === 'error' ? 'red.100' : 'green.100'}
        >
          <Text>{msg.message}</Text>
        </Box>
      ))}

      <Flex direction="column" align="center">
        {/* Conditionally render Register or Login block */}
        {isSignUp ? (
          <Box className="auth-block register" width="100%">
            <Register addMessage={addMessage} />
            <Text mt={4} textAlign="center">
              <Button variant="link" colorScheme="teal" onClick={toggleForm}>
                Already have an account? Login here.
              </Button>
            </Text>
          </Box>
        ) : (
          <Box className="auth-block login" width="100%">
            <Login addMessage={addMessage} />
            <Text mt={4} textAlign="center">
              <Button variant="link" colorScheme="teal" onClick={toggleForm}>
                No account? Sign up, click here.
              </Button>
            </Text>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default AuthContainer;
