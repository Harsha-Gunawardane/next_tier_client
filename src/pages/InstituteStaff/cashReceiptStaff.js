import { useState, useEffect } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import React from "react";
import CashReceipt from "../../components/PaymentReceipts/cashReceipt";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";

function CashReceiptStaff() {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  // const staffData = data.staffs.find((staff) => staff.id.toString() === id);
  // console.log('Staff Data:', staffData);
  const [cashReceiptDetails, setCashReceiptDetails] = useState(null);
  useEffect(() => {
    const fetchReceiptDetails = async () => {
      try {
        const response = await axiosPrivate.get(`/staff/physical-payment-receipt/${id}`);
        setCashReceiptDetails(response.data);
      } catch (error) {
        console.error("Error fetching staff profile:", error);
      }
    };

    fetchReceiptDetails();
  }, [axiosPrivate, id]);

  if (!cashReceiptDetails) {
    return <div>Loading...</div>;
  }

  const handlePrint = () => {
    window.print();
  };
  return (
    <Box
      backgroundColor="#F9F9F9"
      width="100%"
      height="90.5vh"
      padding={{ lg: "40px", base: "10px" }}
    >
      <CashReceipt
        header_title1="NextTier Education"
        address="No. 123, Main Street, Nugegoda, Colombo, Sri Lanka"
        email="info@nexttier.lk"
        phone_number="+94 77 123 4567"
        cash_receipt_number={`Cash receipt number: ${cashReceiptDetails.id}`}

        date ={
          cashReceiptDetails.purchased_at
            ? new Date(cashReceiptDetails.purchased_at).toLocaleDateString()
            : ""
        }
        name_stu={`${cashReceiptDetails.student.first_name} ${cashReceiptDetails.student.last_name}`}
        stream={cashReceiptDetails.student.students[0].stream}
        tutor={`${cashReceiptDetails.pack.tutor.user.first_name} ${cashReceiptDetails.pack.tutor.user.last_name}`}
        qualifications={`${cashReceiptDetails.pack.tutor.qualifications.join(', ')}`}
        course={cashReceiptDetails.pack.course.title}
        study_pack_title={cashReceiptDetails.pack.title}
        amount={`Rs. ${cashReceiptDetails.pack.price}`}
        paid_amount={`Rs. ${cashReceiptDetails.ammount}`}
        expire_date={
          cashReceiptDetails.pack.expire_date
            ? new Date(cashReceiptDetails.pack.expire_date).toLocaleDateString()
            : ""
        }
      ></CashReceipt>
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

export default CashReceiptStaff;
