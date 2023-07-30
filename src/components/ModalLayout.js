import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalContent,
} from "@chakra-ui/react";

const ModalLayout = ({isOpen, title, body, footer, handleCloseModal, isCloseable=true}) => {
  

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} size="lg" closeOnOverlayClick={isCloseable}>
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
