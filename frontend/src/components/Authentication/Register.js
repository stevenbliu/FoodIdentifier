import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Text, Alert, AlertIcon } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";

const Register = ({ addMessage }) => {
  const { registerNewUser, error, isLoading, successMessage } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box maxW="sm" mx="auto" p={6} bg="white" borderRadius="lg" boxShadow="lg" mt="20">
      <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">Register</Text>

      {error && <Alert status="error" mb={4}><AlertIcon />{error}</Alert>}
      {successMessage && <Alert status="success" mb={4}><AlertIcon />{successMessage}</Alert>}

      <form onSubmit={(e) => { e.preventDefault(); registerNewUser(email, password, addMessage); }}>
        <FormControl id="email" mb={4}>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </FormControl>

        <FormControl id="password" mb={6}>
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </FormControl>

        <Button type="submit" colorScheme="teal" width="full" size="lg" isLoading={isLoading}>Register</Button>
      </form>
    </Box>
  );
};

export default Register;
