import React from 'react'
import OnlineReceipt from '../../components/PaymentReceipts/onlineReceipt';
import { Box } from '@chakra-ui/react';

function onlineReceiptStaff() {
  return (
    <Box backgroundColor="#F9F9F9" width="100%" height="90.5vh"  padding={{lg:'40px',base:'10px'}}>
    <OnlineReceipt
     addressNextTier="No. 123, Main Street, Nugegoda, Colombo, Sri Lanka"
     email="info@nexttier.lk"
     phone_number="+94 77 123 4567"
    ></OnlineReceipt>
    </Box>
  )
}

export default onlineReceiptStaff
