import { useState, useEffect } from "react";
import React from "react";
import OnlineReceipt from "../../components/PaymentReceipts/onlineReceipt";
import { Box, Button, Link, Flex } from "@chakra-ui/react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";

function OnlineReceiptStaff() {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  // const staffData = data.staffs.find((staff) => staff.id.toString() === id);
  // console.log('Staff Data:', staffData);
  const [onlineReceiptDetails, setOnlineReceiptDetails] = useState(null);
  useEffect(() => {
    const fetchReceiptDetails = async () => {
      try {
        const response = await axiosPrivate.get(`/staff/online-payment-receipt/${id}`);
        setOnlineReceiptDetails(response.data);
      } catch (error) {
        console.error("Error fetching payment receipt profile:", error);
      }
    };

    fetchReceiptDetails();
  }, [axiosPrivate, id]);

  if (!onlineReceiptDetails) {
    return <div>Loading...</div>;
  }
  const handlePrint = () => {
    window.print();
  };
  console.log("Phone Number:", onlineReceiptDetails.student.phone_number);


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
        transaction_id={onlineReceiptDetails.id}
        date={
          onlineReceiptDetails.purchased_at
            ? new Date(onlineReceiptDetails.purchased_at).toLocaleDateString()
            : ""
        }
        time={
          onlineReceiptDetails.purchased_at
            ? new Date(onlineReceiptDetails.purchased_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit',second:'2-digit' })
            : ""
        }
        
        stu_name={`${onlineReceiptDetails.student.first_name} ${onlineReceiptDetails.student.last_name}`}
        contact_num= {onlineReceiptDetails.student.phone_number}
        course={onlineReceiptDetails.pack.course.title}
        stdpck_ID={onlineReceiptDetails.pack.title}
        price= {onlineReceiptDetails.pack.price}
        stream= {onlineReceiptDetails.student.students[0].stream}
        total_payment= {onlineReceiptDetails.ammount}
        exp_date={
          onlineReceiptDetails.pack.expire_date
            ? new Date(onlineReceiptDetails.pack.expire_date).toLocaleDateString()
            : ""
        }
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
