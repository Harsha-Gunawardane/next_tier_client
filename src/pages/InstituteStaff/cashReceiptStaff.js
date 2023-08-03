import { Box, Text,Button } from '@chakra-ui/react'
import React from 'react'
import CashReceipt from '../../components/PaymentReceipts/cashReceipt'

function cashReceiptStaff() {
  const handlePrint = () => {
    window.print();
  };
  return (
    <Box backgroundColor="#F9F9F9" width="100%" height="90.5vh"  padding={{lg:'40px',base:'10px'}}>
      <CashReceipt
      header_title1="NextTier Education"
      address="No. 123, Main Street, Nugegoda, Colombo, Sri Lanka"
      email="info@nexttier.lk"
      phone_number="+94 77 123 4567"
      cash_receipt_number="Cash receipt number#: 125678"
      date="Date: 02/07/2023"
      name_stu="Munsira Mansoor"
      stream="Biology"
      tutor="Mr.John Doe"
      qualifications="BSc (Hons) in Information Systems,Univerity of Colombo School of Computing"
      course="Biology Theory"
      study_packID="B23"
      amount="Rs.2500"
      paid_amount="Rs.2500"
      expire_date="03/07/2023"
      >

      </CashReceipt>
      <Box display={{base:"none",lg:"Flex"}} flexDirection="column" alignItems="center">
      <Button colorScheme='blue' size="md" mt={4} onClick={handlePrint}>Print</Button>
      </Box>
       {/* CSS for hiding the header and the print button in print mode */}
       <style>
        {`
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}
      </style>
    </Box>
  )
}

export default cashReceiptStaff
