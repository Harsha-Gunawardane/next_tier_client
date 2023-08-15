// import React from "react";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalCloseButton,
//   Text,
//   VStack,
//   Tabs,
//   TabList,
//   TabPanels,
//   Tab,
//   TabPanel,
//   Avatar,
// } from "@chakra-ui/react";

// function ClassDetails({ isOpen, onClose, classItem }) {
//   if (!classItem) {
//     // Return some fallback UI when classItem is null
//     return (
//       <Modal isOpen={isOpen} onClose={onClose} size="md">
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Class Details</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <Text fontSize="lg" textAlign="center" color="gray.600">
//               No class selected.
//             </Text>
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     );
//   }

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} size="md">
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>Class Details</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           <Tabs>
//             <TabList style={{ border: "none" }}>
//               <Tab fontWeight="bold">Personal Details</Tab>
//               <Tab fontWeight="bold">Course Details</Tab>
//             </TabList>
//             <TabPanels>
//               <TabPanel>
//                 <VStack spacing={4} alignItems="flex-start">
//                 {/* <Avatar
//                 name={classItem.name}
//                 src={classItem.profileImage}
//                 mb="2"
//                 size="xl"
//               /> */}
//                 <Text fontSize={["8px", "11px", "13px"]}>
//                     <strong>Teacher:</strong> {classItem.teacher}
//                   </Text>
//                   <Text fontSize={["8px", "11px", "13px"]}>
//                     <strong>Email:</strong> {classItem.email}
//                   </Text>
//                   <Text fontSize={["8px", "11px", "13px"]}>
//                     <strong>Teaching Medium:</strong> {classItem.medium}
//                   </Text>
                  
//                 </VStack>
//               </TabPanel>
//               <TabPanel>
//                 <VStack spacing={4} alignItems="flex-start">
//                   <Text fontSize={["8px", "11px", "13px"]}>
//                     <strong>Subject:</strong> {classItem.subject}
//                   </Text>
//                   <Text fontSize={["8px", "11px", "13px"]}>
//                     <strong>Class:</strong> {classItem.class}
//                   </Text>
//                   <Text fontSize={["8px", "11px", "13px"]}>
//                     <strong>Time:</strong> {classItem.startTime} - {classItem.endTime}
//                   </Text>
//                   <Text fontSize={["8px", "11px", "13px"]}>
//                     <strong>Description:</strong> {classItem.details}
//                   </Text>
//                 </VStack>
//               </TabPanel>
//             </TabPanels>
//           </Tabs>
//         </ModalBody>
//       </ModalContent>
//     </Modal>
//   );
// }

// export default ClassDetails;
import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Text, VStack, Avatar } from "@chakra-ui/react";

function ClassDetails({ isOpen, onClose, classItem }) {
  if (!classItem) {
    // Return some fallback UI when classItem is null
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Class Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>No class selected.</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Class Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <VStack spacing={4} alignItems="flex-start">
                  <Avatar
                 name={classItem.name}
                 src={classItem.profileImage}
                mb="2"
                size="xl"
             />
        <Text fontSize={["8px", "11px", "14px"]} mt={2}>
                   <strong>Teacher:</strong> {classItem.teacher}
                  </Text>
                  <Text fontSize={["8px", "11px", "14px"]} mt={2}>
                    <strong>Email:</strong> {classItem.email}
                  </Text>
                  <Text fontSize={["8px", "11px", "14px"]} mt={2}>
                    <strong>Teaching Medium:</strong> {classItem.medium}
                  </Text>
<Text fontSize={["8px", "11px", "14px"]} mt={2}>
                    <strong>Subject:</strong> {classItem.subject}
                  </Text>
                   <Text fontSize={["8px", "11px", "14px"]}mt={2} >
                     <strong>Class:</strong> {classItem.class}
                   </Text>
                   <Text fontSize={["8px", "11px", "14px"]} mt={2}>
                     <strong>Time:</strong> {classItem.startTime} - {classItem.endTime}
                  </Text>
                   <Text fontSize={["8px", "11px", "14px"]}mt={2} mb={5}>
                    <strong>Description:</strong> {classItem.details}
                  </Text>
                  </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ClassDetails;
