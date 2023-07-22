import { Box, Text, ListItem, ListIcon, OrderedList } from '@chakra-ui/react'

function McqExplaination({questionNo, question, options, correctAnswer, pickedAnswer, explain}) {
  return (
    <Box mt={6} ml={5} w='90%'>
        <Text mb={4} fontSize={24} color='#333333' fontWeight='medium'>{questionNo}</Text>

        <Text fontSize={15}>{question}</Text>
        <OrderedList mt={5}>
            {options.map((option) => (
                <ListItem fontSize={15} ml={16} >
                    
                    {option}
                </ListItem>
            ))}
        </OrderedList>
        <Text fontSize={20} color='#555555' fontWeight='semibold' mt={8} ml={3}>
            Explaination
        </Text>
        <Text fontSize={14} mt={8} ml={10} whiteSpace="pre-line" lineHeight='tall'>{explain}</Text>
    </Box>
  )
}

export default McqExplaination