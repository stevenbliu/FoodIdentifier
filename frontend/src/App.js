import React, { useEffect } from 'react';
import { ChakraProvider, Box, Container, Heading, Flex } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { useUser } from './context/UserContext';
import Dashboard from './components/Dashboard/Dashboard';
import AuthContainer from './components/Authentication/AuthContainer';
import Login from './pages/Login';
import Calendar from './pages/Calendar';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

import './index.css';

const App = () => {
  const { user, login } = useUser();

  let skipLogin = process.env.REACT_APP_SKIP_LOGIN === 'true';
  skipLogin = true;

  useEffect(() => {
    if (skipLogin && !user) {
      const devUser = { username: 'devUser', email: 'dev@user.com', id: 1 };
      const devToken = 'dev-token-1234';
      login(devUser, devToken);
    }
  }, [skipLogin, user, login]);

  return ( 
    <ChakraProvider> 
      <Router>
        <Box height="20vh" bgGradient="linear(to-r, indigo.500, purple.500, pink.500)">
          
          {/* Debugging Tailwind */}
          <Box backgroundImage="url(https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg)"
          backgroundSize="cover" backgroundPosition="center" height='100%'>
            If this text has a blue background, Tailwind is working!
          </Box>

          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <Container maxW="7xl" py={0} bg="green.100">
            <Flex justify="center" align="center" direction="column" textAlign="center" mb={10}>
              <Heading as="h1" size="xl" color="purple.500">
                Food Identifier Main Content
              </Heading>
            </Flex>

            {/* Routing */}
            <Routes>
              <Route
                path="/"
                element={skipLogin || user ? <Navigate to="/dashboard" /> : <AuthContainer />}
              />
              <Route path="/login" element={<AuthContainer />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/calendar" element={user ? <Calendar /> : <Navigate to="/login" />} />
              <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
              <Route path="/settings" element={user ? <Settings /> : <Navigate to="/login" />} />
            </Routes>
          </Container>
          
          {/* Footer */}
          <Footer />
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;
