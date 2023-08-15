import {
    Box,
    SimpleGrid,
  
    CardHeader,
    Flex,
    HStack,Text,Button

   
  } from "@chakra-ui/react";
  import { Card, Image, Badge, Group } from '@mantine/core';
  // import {  Image, Text, Badge, Button, Group } from '@mantine/core';
  import { TimeIcon, CalendarIcon,ArrowForwardIcon } from "@chakra-ui/icons";
  
  function Coursecard() {
   
  
    return (

  <Box>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src="https://th.bing.com/th/id/R.63c6ff86b42346482cab5281aad8eb13?rik=LTwVcuzk9175YA&riu=http%3a%2f%2fbuzz2fone.com%2fwp-content%2fuploads%2fphysics.jpg&ehk=zNyEIEd3lFQo1pJNa6U0KxXtk0CYBmtIb9ZIOP%2bw9sY%3d&risl=&pid=ImgRaw&r=0"
            height={180}
            alt="Norway"
          />
        </Card.Section>
  
        <Group position="apart" mt="md" mb="xs">
          <Text weight={600} fontSize='15px'>Physics 2024 A/L Thory</Text>
          <Badge color="blue" variant="light">
            On Going
          </Badge>
        </Group>
       
  
  
        <HStack spacing="24px" mt="20px">
                <Box w="50%" h="30px" bg="white">
               
                    <Text color="grey" fontSize="10px" mt="-0px">
                      <TimeIcon mr='5px' />8.00 a.m. - 12.00 p.m. 
                    </Text>
          
                    <Text color="black" fontSize="12px" mt="-0px"></Text>
               
         
                </Box>
  
  
                <Box w="50%" h="30px" bg="white">
               
               <Text color="grey" fontSize="10px" mt="-0px">
                 <TimeIcon mr='5px' />Hall 07 Ground Floar 
               </Text>
     
               <Text color="black" fontSize="12px" mt="-0px"></Text>
          
    
           </Box>
  
            
            
              
              </HStack>
  
  
        <Button variant="light" colorScheme="blue" bg='#2b8ecc' fontSize='12px' radius="md" mt='10px' color='white'>
          Access Course <ArrowForwardIcon></ArrowForwardIcon>
        </Button>
      </Card>

      </Box>
  
  
     
    );
  }
  
  export default Coursecard;
  