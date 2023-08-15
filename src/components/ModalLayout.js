import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalContent,
} from "@chakra-ui/react";

const ModalLayout = ({
  isOpen,
  title,
  body,
  footer,
  handleCloseModal,
  isCloseable = true,
  size = "lg"
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      size={size}
      closeOnOverlayClick={isCloseable}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{body}</ModalBody>

        <ModalFooter>{footer}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalLayout;
