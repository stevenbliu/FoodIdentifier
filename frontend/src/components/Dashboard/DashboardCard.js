import React from 'react';
import { Box, Heading, Button } from '@chakra-ui/react';

function DashboardCard({ title, children, buttonText, onButtonClick }) {
  return (
    <Box bg="whiteAlpha.900" p={6} borderRadius="2xl" boxShadow="lg" backdropFilter="blur(10px)">
      <Heading size="md" mb={4} color="black">
        {title}
      </Heading>
      {children}
      {/* Button inside the DashboardCard */}
      <Button 
        mt={4} // margin top for spacing
        colorScheme="teal" 
        onClick={onButtonClick} // function to handle button click
      >
        {title}
      </Button>
    </Box>
  );
}

export default DashboardCard;
