import * as React from 'react'

// 1. import `ChakraProvider` component
import { ChakraProvider,SimpleGrid,Box,Heading ,HStack,Center,Flex,Text,Image,Avatar

} from '@chakra-ui/react'
import Contentmain from "../../components/student/Contentmain";
import course from "../../assets/data/course.js";
import Content from "../../components/student/content";




  const Setting= () => {
  // 2. Wrap ChakraProvider at the root of your app
  return (
 
  <Box overflow='scroll'>
<SimpleGrid spacing={20} minChildWidth='250px'>

<Box bg='white' w='100%' height={{base:250,lg:50,xl:400}} p={10} color='black' >
<Image
      src="https://www.ufs.ac.za/images/librariesprovider22/default-album/shutterstock_1140894395.jpg?sfvrsn=554a8521_0"
      alt='Green double couch with wooden legs'
      borderRadius='lg'
      
    />
  
</Box>
<Contentmain></Contentmain>

</SimpleGrid>


<SimpleGrid minChildWidth='250px' spacing='40px' p={5}>
    
    {course?.map((item) => (
      <Content item={item} key={item.id} />
    ))}

</SimpleGrid>

</Box>
  
 
  )
}
export default Setting;