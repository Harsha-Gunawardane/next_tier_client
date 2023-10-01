import { useCallback, useState, useEffect } from "react";
import { Box, Card, Grid, GridItem } from "@chakra-ui/react";
import StudentAttendanceTable from "../../components/tutor/StudentAttendanceTable";
import { StudentAttendanceStatsGroup } from "../../components/tutor/StudentAttendanceStatsGroup";
import StudentAttendanceProfile from "../../components/tutor/StudentAttendanceProfile";
import AttendanceHeaderBar from "../../components/tutor/AttendanceHeaderBar";

import { Html5QrcodeScanner } from "html5-qrcode";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

// import QrReader from "react-qr-scanner";

export default function StudentAttendanceMarking() {

  const axiosPrivate = useAxiosPrivate();
  const [students, setStudents] = useState([]);
  const [updatedStudents, setUpdatedStudents] = useState([]);


  //scanResult is the decoded message from the QR code (Student ID)
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const getAllStudentsAttendance = async () => {
      try {
        const response = await axiosPrivate.get(`/stu/students/attendance`);
        setStudents(response.data);
      } catch (error) {
        if (error.response && error.response.data) {
          console.log(error.response.data);
        } else {
          console.log("An error occurred:", error.message);
        }
      }
    };

    getAllStudentsAttendance();
  }, [updatedStudents]);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 200,
        height: 200,
      },
      fps: 5,
    });

    scanner.render(onScanSuccess, onScanFailure);
  }, []);

  const onScanSuccess = (qrCodeMessage) => {
    setScanResult(qrCodeMessage);

  };

  
  const onScanFailure = (error) => {
    // console.log(error);
  };

  // const handleScan = useCallback((data) => {
  //   if (data) {
  //     setScanResult(data.text);
  //   }
  // }, []);

  // const handleError = useCallback((err) => {
  //   console.error(err);
  // }, []);

  useEffect(() => {
    const getStudent = async () => {
      try {
        if (scanResult === null) return;

        const response = await axiosPrivate.post(
          `/stu/students/attendance/${scanResult}`,
          {
            date: new Date(),
            is_present: true,
          }
        );
        setUpdatedStudents(response.data);
        // console.log(response.data);
      } catch (error) {
        if (error.response && error.response.data) {
          console.log(error.response.data);
        } else {
          console.log("An error occurred:", error.message);
        }
      }
    };

    getStudent();
  }, [scanResult]);

   
  

  return (
    <Box width="100%" height="100%">
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        maxWidth="1260px"
        maxHeight="650px"
        gap={4}
      >
        <GridItem colSpan={4} rowSpan={2}>
          <StudentAttendanceStatsGroup />
          {/* {Search doesn't work} */}
          <AttendanceHeaderBar />
          <StudentAttendanceTable students={students} />
        </GridItem>
        <GridItem colSpan={1} rowSpan={2}>
          <Card
            variant="outline"
            margin="16px"
            width="400px"
            height="400px"
            id="reader"
          ></Card>
          {/* <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "400px", height: "400px" }}
          /> */}

          {scanResult ? (
            <StudentAttendanceProfile studentID={scanResult} />
          ) : (
            <></>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
}
