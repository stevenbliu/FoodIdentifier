import React, { useState } from "react";
import { Box, Button, Text, Flex, useToast } from "@chakra-ui/react";
import Register from "./Register";
import Login from "./Login";

const AuthContainer = () => {
  const [isSignUp, setIsSignUp] = useState(false); // Manage toggle between Login and Register
  const toast = useToast(); // Chakra UI toast for displaying messages

  // Helper function to show toast messages
  const addMessage = (message, status) => {
    toast({
      title: message,
      status: status, // 'success', 'error', 'info', 'warning'
      duration: 5000,
      isClosable: true,
    });
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp); // Toggle between Login and Register
  };

  return (
    <Flex
      w="100%"
      maxW="800px"
      mx="auto"
      bg="blue.100"
      borderRadius="lg"
      boxShadow="lg"
      overflow="hidden"
      minH="400px"
    >
      {/* Welcome Section */}
      <Flex
        flex="1"
        bg="blue.200"
        p={6}
        backgroundImage="url(https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0zMDktYWV3LTAxM18xXzEuanBn.jpg)"
        backgroundSize="cover"
        backgroundPosition="center"
        justify="center"
        align="center"
        minH="400px"
      >
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="white">
          Welcome
        </Text>
      </Flex>

      {/* Authentication Form Section */}
      <Flex flex="1" direction="column" justify="center" align="center" p={6} bg="white">
        <Box width="100%">
          {isSignUp ? (
            <>
              <Register addMessage={addMessage} />
              <Text mt={4} textAlign="center">
                <Button variant="link" colorScheme="teal" onClick={toggleForm}>
                  Already have an account? Login here.
                </Button>
              </Text>
            </>
          ) : (
            <>
              <Login addMessage={addMessage} />
              <Text mt={4} textAlign="center">
                <Button variant="link" colorScheme="teal" onClick={toggleForm}>
                  No account? Sign up, click here.
                </Button>
              </Text>
            </>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default AuthContainer;
