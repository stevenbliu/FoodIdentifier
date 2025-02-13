import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

function DashboardCard({ title, children }) {
  return (
    <Box bg="whiteAlpha.300" p={6} borderRadius="2xl" boxShadow="lg" backdropFilter="blur(10px)">
      <Heading size="md" mb={4} color="black">
        {title}
      </Heading>
      {children}
    </Box>
  );
}

export default DashboardCard;
