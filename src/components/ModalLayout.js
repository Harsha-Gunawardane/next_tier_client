import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalContent,
} from "@chakra-ui/react";

const ModalLayout = ({isOpen, title, body, footer, handleCloseModal}) => {
  

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          {body}
        </ModalBody>

        <ModalFooter>
          {footer}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalLayout;
