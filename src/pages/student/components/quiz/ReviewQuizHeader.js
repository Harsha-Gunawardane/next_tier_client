import { Flex, Text } from '@chakra-ui/react'
import { AiOutlineRight } from 'react-icons/ai'

function ReviewQuizHeader({ subject, quizname, isExplain = true}) {

    const prevTextStyle = {
        fontSize: '15px',
        color: '#666666',
        fontWeight: 'semibold',
        fontSpacing: '0.5px'
    }
    const iconStyle={
        color: '#666666',
        marginTop: '3px',
        marginLeft: '10px',
        marginRight: '10px'
    }
    const titleStyle={
        fontSize: '15px',
        color: '#333333',
        fontWeight: 'semibold',
        fontSpacing: '0.5px'
    }
  return (
    <Flex mt={2} ml={5}>
        <Text style={prevTextStyle}>Quizzes</Text>
        <AiOutlineRight style={iconStyle} />
        <Text style={prevTextStyle}>{subject}</Text>
        <AiOutlineRight style={iconStyle} />
        <Text style={isExplain ? prevTextStyle : titleStyle}>{quizname}</Text>
        {isExplain && <AiOutlineRight style={iconStyle} />}
        <Text style={titleStyle} display={isExplain ? 'block' : 'none'}>Explaination</Text>
    </Flex>
  )
}

export default ReviewQuizHeader