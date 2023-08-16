import {
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Flex,
    Text,
    Center,
    ModalCloseButton,
    IconButton,
    Button,
    Box,
    ModalHeader,
    ModalFooter,



} from '@chakra-ui/react';

import React, { useState, useEffect } from 'react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { LoadingOverlay } from '@mantine/core';
import { pdfjs, Document, Page } from "react-pdf";
import axios from '../../../api/axios';

//icons
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { HiOutlineDownload } from 'react-icons/hi';

//bundle worker from react-pdf

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     '/pdf.worker.min.js',
//     import.meta.url,
// ).toString();
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;


const PdfModal = ({ pdfUrl, isOpen, onClose }) => {
    const [pdfData, setPdfData] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        console.log("came here");
        console.log(pdfUrl);
        if (isOpen) {
            fetchPdf();
        }

    }, [isOpen, pdfUrl]);

    const fetchPdf = async () => {
        console.log("came here");
        console.log(pdfUrl);

        try {
            const res = await axios.get(pdfUrl, {
                responseType: 'blob'
            });
            console.log(res);

            const blob = new Blob([res.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            setPdfData(url);
        } catch (err) {
            console.log(err);
        }
    }

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const handlePageChange = newPage => {
        if (newPage >= 1 && newPage <= numPages) {
            setCurrentPage(newPage);
        }
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = pdfData;
        link.setAttribute('download', 'file.pdf');
        document.body.appendChild(link);
        link.click();
    };


    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={"3xl"}
            scrollBehavior={"inside"}
            height="90%"
            isCentered
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader
                    fontSize={"md"}
                    fontWeight={"bold"}
                    borderBottom={"1px solid"}
                    borderColor={"gray.100"}

                >
                    <Center>
                        PDF Viewer
                    </Center>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex className="pdf-viewer" direction={"column"} align={"center"} justify={"center"} w={"100%"} h={"100%"} justifyContent={"center"} alignItems={"center"} >
                        {pdfData ? (
                            <Flex direction={"column"} align={"center"} justify={"center"} w={"100%"} h={"100%"} justifyContent={"center"} alignItems={"center"} >
                                <Document
                                    file={pdfData}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    renderMode='canvas'
                                    height={"100%"}
                                    width={"100%"}
                                >
                                    <Page pageNumber={currentPage} renderMode="canvas" />
                                </Document>
                            </Flex>
                        )
                            : (
                                <LoadingOverlay visible={true} overlayBlur={2} />
                            )
                        }
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Flex justifyContent={"space-between"} w={"100%"} alignItems={"center"}>
                        <Box> </Box>
                        <Flex gap="10px">
                            <IconButton
                                icon={<RiArrowLeftSLine />}
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                colorScheme='blue'
                                variant={"solid"}
                                size={"sm"}
                            >
                                Previous Page
                            </IconButton>
                            <Text size={"xs"}>
                                Page {currentPage} of {numPages}
                            </Text>
                            <IconButton
                                icon={<RiArrowRightSLine />}
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === numPages}
                                colorScheme='blue'
                                variant={"outline"}
                                size={"sm"}
                            >
                                Next Page
                            </IconButton>
                        </Flex>
                        <IconButton
                            onClick={handleDownload}
                            icon={<HiOutlineDownload />}
                            colorScheme={"blue"}
                            variant={"outline"}
                            size={"sm"}
                        >
                        </IconButton>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};


export default PdfModal;