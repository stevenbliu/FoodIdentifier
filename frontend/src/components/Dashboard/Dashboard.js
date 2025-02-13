import React, { useState } from 'react';
import { Box, Button, Heading, Text, VStack, Image, Container, Grid } from '@chakra-ui/react';
import UploadImage from '../FileUpload';
import TestButtons from '../TestButtons';
import FetchPhoto from '../FetchPhoto';
import { useUser } from '../../context/UserContext';
import SubscribeNotifications from '../SubscribeNotification';
import DashboardCard from './DashboardCard'; // New component for sections

function Dashboard() {
  const { user, logout } = useUser();
  const [imageUrl, setImageUrl] = useState('');
  const [foodInfo, setFoodInfo] = useState(null);

  return (
    <Box minH="100vh" bgGradient="linear(to-r, blue.500, teal.500, cyan.500)">
      <Container maxW="7xl" py={10}>
        
        {/* Header Section */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={12} color="white">
          <VStack align="start">
            <Heading size="xl" textDecoration="underline">
              Hello, {user.username}
            </Heading>
            <Text fontSize="lg">Welcome to your dashboard</Text>
          </VStack>
          <Button colorScheme="gray" size="lg" onClick={logout}>
            Logout
          </Button>
        </Box>

        {/* Main Dashboard Grid */}
        <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" }} gap={8}>
          
          <DashboardCard title="Upload Your Image">
            <UploadImage setImageUrl={setImageUrl} setFoodInfo={setFoodInfo} />
          </DashboardCard>

          <DashboardCard title="Subscribe to Notifications">
            <SubscribeNotifications />
          </DashboardCard>

          <DashboardCard title="Test Functions">
            <TestButtons />
          </DashboardCard>

          <DashboardCard title="Fetch Food Info">
            <FetchPhoto setFoodInfo={setFoodInfo} />
          </DashboardCard>

        </Grid>

        {/* Uploaded Image Display */}
        {imageUrl && (
          <DashboardCard title="Uploaded Image">
            <Image src={imageUrl} alt="Uploaded preview" borderRadius="lg" boxShadow="md" />
          </DashboardCard>
        )}

        {/* Food Information Display */}
        {foodInfo && (
          <DashboardCard title="Food Information">
            <Text><strong>Name:</strong> {foodInfo.name}</Text>
            <Text><strong>Description:</strong> {foodInfo.description}</Text>
          </DashboardCard>
        )}

      </Container>
    </Box>
  );
}

export default Dashboard;
