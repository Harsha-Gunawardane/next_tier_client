import { AlertDescription, Card, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

function StudentAttendanceProfile({ studentID }) {
  //Here we have to check if the studentID is correct id or not
  // console.log(studentID);

  const axiosPrivate = useAxiosPrivate();

  const [student, setStudent] = useState({});
  const payment = true;

  useEffect(() => {
    const getStudent = async () => {
      try {
        const response = await axiosPrivate.get(`/stu/students/${studentID}`);
        setStudent(response.data);
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
  }, [studentID]);

  
  return (
    <Card variant="outline" padding="15px" margin="16px" maxWidth="400px">
      {payment ? (
        <>
          <Alert
            status="success"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="158px"
            bg="white"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Marked Present!
            </AlertTitle>
            <AlertDescription>
              {`${student.first_name} ${student.last_name}`}
            </AlertDescription>
          </Alert>
        </>
      ) : (
        <>
          {" "}
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="158px"
            bg="white"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Marked Present!
            </AlertTitle>
            <AlertDescription>
              {`${student.first_name} ${student.last_name}`}
            </AlertDescription>
            <AlertDescription>Payment not done</AlertDescription>
          </Alert>
        </>
      )}
    </Card>
  );
}

export default StudentAttendanceProfile;
