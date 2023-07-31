import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Box
      height="100vh" // Set the height to the full viewport height
      padding={{ base: '6', md: '12' }}
      boxShadow='lg'
      bg='white'
      display="flex"
      justifyContent="center"
      flexDirection="column"
    >
      <SkeletonText
        mt='4'
        noOfLines={10}
        spacing='4'
        skeletonHeight='2'
        w={{ base: '80%', md: '100%' }}
      />
    </Box>
  );
};

export default Loading;
