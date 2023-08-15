import React from "react";
import OnlineReceipt from "../../components/PaymentReceipts/onlineReceipt";
import { Box, Button, Link, Flex } from "@chakra-ui/react";

function OnlineReceiptStaff() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Box
      backgroundColor="#F9F9F9"
      width="100%"
      height="90.5vh"
      padding={{ lg: "15px", base: "10px" }}
    >
      <OnlineReceipt
        addressNextTier="No. 123, Main Street, Nugegoda, Colombo, Sri Lanka"
        email="info@nexttier.lk"
        phone_number="+94 77 123 4567"
        ref_num="0000012"
        date="02/07/2023"
        time="08:00:12"
        stu_name="Munsira Mansoor"
        contact_num="+94 7750 97556"
        trans_ID="12"
        course="Biology Theory"
        stdpck_ID="B23"
        price=" 2500"
        stream="Biology"
        total_payment=" 2500"
        exp_date="03/07/2023"
      ></OnlineReceipt>
      <Box
        display={{ base: "none", lg: "Flex" }}
        flexDirection="column"
        alignItems="center"
      >
        <Button colorScheme="blue" size="md" mt={4} onClick={handlePrint}>
          Print
        </Button>
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
  );
}

export default OnlineReceiptStaff;
