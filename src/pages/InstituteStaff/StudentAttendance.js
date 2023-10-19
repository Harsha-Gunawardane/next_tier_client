import { Box, Card } from '@chakra-ui/react';
import QrCode from 'qrcode'
import { useState, useEffect } from 'react'

export default function StudentAttedance(){

  //Here studentId should be equal to the particular student's id
  const [studentId, setStudentId] = useState(
    "8dca2ee8-6c7f-4200-ba16-7b4ee0194cb7"
  );
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    const generateQrCode = async () => {
      try {
        const response = await QrCode.toDataURL(studentId,{width: 800, height: 800, margin: 2});
        setQrCode(response);
      } catch (error) {
        console.log(error);
      }
    };
    generateQrCode();
  }, []);

  return (
    <Box width="100%">
      <Card variant="outline" maxWidth="250px" margin="20px">
        {qrCode && (
          <>
            <img src={qrCode} alt="qr code" width="250px" height="250px" />
          </>
        )}
      </Card>
      {/* <a href="qrCode" download="QRcode.png">
        <Button margin="20px">Download</Button>
      </a> */}
    </Box>
  );
}