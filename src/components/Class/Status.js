import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useBreakpointValue, Stack } from '@chakra-ui/react';

function Status({ isOpen, onClose, teacher, onApprove, actionType }) {
  const modalSize = useBreakpointValue({ base: 'xs', sm: 'md', md: 'lg' });

    // Determine the colorScheme based on tableType
    const colorScheme = actionType === 'approve' ? 'green' : 'red';

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
        {actionType === 'approve' ? `Confirm Approval` : `Confirm Rejection` }
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        {actionType === 'approve' && `Are you sure you want to approve ${teacher && teacher.fullName}'s request?`}
        {actionType === 'reject' && `Are you sure you want to reject ${teacher && teacher.fullName}'s request?`}
        </ModalBody>
        <ModalFooter>
          <Stack direction={['row', 'row']} spacing="2">
            <Button colorScheme={colorScheme} flex="1" onClick={onApprove}>
            {actionType === 'approve' ? 'Approve' : 'Reject'}
            </Button>
            <Button flex="1" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default Status;
