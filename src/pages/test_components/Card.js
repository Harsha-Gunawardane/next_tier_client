import React from 'react'
import { Box, Text, Flex } from '@chakra-ui/react'

function Card({ title, value, color, icon}) {
  return (
    <Box>
        <Flex>
            <Text>Average Mark</Text>
        </Flex>
        <Flex>
            <Text>52</Text>
        </Flex>
    </Box>
  )
}

export default Card