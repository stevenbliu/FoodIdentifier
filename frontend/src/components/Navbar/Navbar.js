import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { Box, Button, Flex, HStack, Menu, MenuButton, MenuList, MenuItem, useDisclosure, Text } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';  // Import Chakra's icon for the dropdown
import LoginModal from '../Authentication/LoginModal'; // Import the modal component

function Navbar() {
  const { user, logout } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra's hooks for managing modal state

  return (
    <Box as="nav" bg="teal.500" color="white" px={4}>
      <Flex align="center" justify="space-between" maxW="1200px" mx="auto" py={2}>
        {/* Logo */}
        <Box>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Text fontSize="2xl" fontWeight="bold">Food Identifier</Text>
          </Link>
        </Box>

        {/* Navigation Menu */}
        <HStack spacing={6} display="flex">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/upload" className="navbar-link">Upload</Link>
          <Link to="/upload" className="navbar-link">Dashboard</Link>
          <Link to="/calendar" className="navbar-link">Calendar</Link>

          {/* Profile Dropdown */}
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="link" color="white">
              Profile
            </MenuButton>
            <MenuList>
              {user ? (
                <>
                  <MenuItem as={Link} to="/profile">My Profile</MenuItem>
                  <MenuItem as={Link} to="/settings">Settings</MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </>
              ) : (
                <MenuItem onClick={() => setIsModalOpen(true)}>Register/Login</MenuItem>
              )}
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      {/* Login/Register Modal */}
      {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}
    </Box>
  );
}

export default Navbar;
