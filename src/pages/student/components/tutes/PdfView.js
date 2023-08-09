import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Box, Flex, Button, Text } from "@chakra-ui/react";
import {
  TbCircleArrowRightFilled,
  TbCircleArrowLeftFilled,
} from "react-icons/tb";

// import pdfData from "./tutorial_07_20000669.pdf";
// import pdfData from "https://storage.cloud.google.com/next_tier_file_bucket/2023-08-08T10%3A09%3A04.656Z-e1e4b4bc-85b7-4473-be50-5bb4566aacaf-Introduction_to_Power.pdf"
import "../../../../assets/css/pdfView.css";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";

const PDF_URL = "/stu/pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFView = () => {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();

  const [pdfData, setPdfData] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const fetchPdf = async () => {
      const queryString = new URLSearchParams({ id: id }).toString();

      try {
        const response = await axiosPrivate.get(`${PDF_URL}?${queryString}`);

        const fileBufferData = response?.data?.response?.file?.data;
        // const pdfBlob = new Blob([fileBufferData], { type: 'application/pdf' })
        // setPdfData(pdfBlob)
        setPdfData(fileBufferData);
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
        const doc = await pdfjs.getDocument(new Uint8Array(fileBufferData))
          .promise;
        setNumPages(doc.numPages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPdf();
  }, [id]);

  // useEffect(() => {
  //   const fetchNumPages = async () => {
  //     try {
  //       const doc = await pdfjs.getDocument(pdfData).promise;
  //       setNumPages(doc.numPages);
  //     } catch (error) {
  //       console.error("Error fetching PDF document:", error);
  //     }
  //   };
  //   fetchNumPages();
  // }, []);

  const handlePrevPage = () => {
    setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPageNumber((prevPage) => Math.min(prevPage + 1, numPages));
  };

  return (
    <Box>
      {/* <Flex w={"calc(100vw - 400px)"} justifyContent={"center"} mb={12} mt={-5}>
        <Document file={pdfData} onLoadSuccess={() => {}}>
          <Page pageNumber={pageNumber} scale={1.5} renderTextLayer={false} />
          <Flex justifyContent={"space-around"}>
            <Text>
              {pageNumber} of {numPages}
            </Text>
            <Flex gap={2.5}>
              <TbCircleArrowLeftFilled
                p={2}
                fontSize={28}
                cursor={"pointer"}
                fontWeight={"bold"}
                color={"#383838"}
                onClick={handlePrevPage}
                disabled={pageNumber === 1}
              />
              <TbCircleArrowRightFilled
                p={2}
                fontSize={28}
                cursor={"pointer"}
                fontWeight={"bold"}
                color={"#383838"}
                onClick={handleNextPage}
                disabled={pageNumber === numPages}
              />
            </Flex>
          </Flex>
        </Document>
      </Flex> */}

      {pdfData && (
        <Document
          file={{
            data: new Uint8Array(pdfData),
            httpHeaders: { "Content-Type": "application/pdf" },
          }}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          {/* {Array.from(new Array(numPages), (el, index) => ( */}
          <Page
            pageNumber={pageNumber}
            scale={1.5}
            // key={index + 1}
            // pageNumber={index + 1}
            width={600}
            renderTextLayer={false}
          />
          <Flex justifyContent={"space-around"}>
            <Text>
              {pageNumber} of {numPages}
            </Text>
            <Flex gap={2.5}>
              <TbCircleArrowLeftFilled
                p={2}
                fontSize={28}
                cursor={"pointer"}
                fontWeight={"bold"}
                color={"#383838"}
                onClick={handlePrevPage}
                disabled={pageNumber === 1}
              />
              <TbCircleArrowRightFilled
                p={2}
                fontSize={28}
                cursor={"pointer"}
                fontWeight={"bold"}
                color={"#383838"}
                onClick={handleNextPage}
                disabled={pageNumber === numPages}
              />
            </Flex>
          </Flex>
          {/* ))} */}
        </Document>
      )}
    </Box>
  );
};

export default PDFView;
