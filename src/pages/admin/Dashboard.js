import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import DashboardCards from './components/DashboardCards'
import UsersTableLayout from './components/UsersTableLayout'
import FeedbackArea from './components/FeedbackArea'

function Dashboard() {
  return (
    <Box w={'100%'}>
        <DashboardCards />
        <Flex>
            <UsersTableLayout />
            <FeedbackArea />
        </Flex>
    </Box>
  )
}

export default Dashboard