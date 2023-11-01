import { useCallback, useState, useEffect } from "react";
import { Box, Card, Grid, GridItem } from "@chakra-ui/react";
import StudentAttendanceTable from "../../components/tutor/StudentAttendanceTable";
import { StudentAttendanceStatsGroup } from "../../components/tutor/StudentAttendanceStatsGroup";
import StudentAttendanceProfile from "../../components/tutor/StudentAttendanceProfile";
import AttendanceHeaderBar from "../../components/tutor/attendance/AttendanceHeaderBar";

import { Html5QrcodeScanner } from "html5-qrcode";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";

// import QrReader from "react-qr-scanner";

export default function StudentAttendanceMarking() {

  const { courseId } = useParams();

  const axiosPrivate = useAxiosPrivate();
  const [students, setStudents] = useState([]);
  const [updatedStudents, setUpdatedStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(null);
  const [filteredStudents, setFilteredStudents] = useState([]);

  const [No_of_PresentStudents, setNo_of_PresentStudents] = useState(0);
  const [No_of_AbsentStudents, setNo_of_AbsentStudents] = useState(0);

  //scanResult is the decoded message from the QR code (Student ID)
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const getAllStudentsAttendance = async () => {
      try {
        const response = await axiosPrivate.get(`/stu/students/attendance/${courseId}`);
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
    if(students){
      //For stats
    setNo_of_PresentStudents(
      (students.filter((student) => student.status[0] === true)).length
    );

    setNo_of_AbsentStudents(
      (students.filter((student) => student.status.length === 0)).length
    );

    console.log(No_of_PresentStudents);
    console.log(No_of_AbsentStudents);
    }
  }, [students, updatedStudents]);


  useEffect(() => {
    if (filter !== null) {
      if (filter === "All Students") {
        setFilteredStudents(students);
      }else if (filter === "Present") {
        setFilteredStudents(
          students.filter((student) => student.status[0] === true)
        );
      } else if (filter === "Absent") {
        setFilteredStudents(
          students.filter((student) => student.status.length === 0)
        );
      }
    }
  }, [students, filter]);

  


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
          `/stu/students/attendance/${courseId}/${scanResult}`,
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
          <StudentAttendanceStatsGroup No_of_PresentStudents={No_of_PresentStudents} No_of_AbsentStudents={No_of_AbsentStudents}
          />

          <AttendanceHeaderBar
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
          />

          {students.length > 0 ? (
            filteredStudents.length > 0 && filter !== "All Students" ? (
              <StudentAttendanceTable
                students={filteredStudents.filter((student) =>
                  student.first_name
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )}
              />
            ) : (
              <StudentAttendanceTable
                students={students.filter((student) =>
                  student.first_name
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )}
              />
            )
          ) : (
            <></>
          )}
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
