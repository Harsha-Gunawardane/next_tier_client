import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import {
  TbCircleArrowRightFilled,
  TbCircleArrowLeftFilled,
} from "react-icons/tb";
import { useParams } from "react-router-dom";
import pako from "pako";

import "../../../../assests/css/pdfView.css";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { Loader } from "@mantine/core";

const PDF_URL = "/stu/pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFView = () => {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();

  const [pdfData, setPdfData] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pdfName, setPDFName] = useState("");

  useEffect(() => {
    const fetchPdf = async () => {
      setPdfData(null);
      setNumPages(null);
      setPageNumber(1);
      setLoading(true);
      setPDFName("");
      const queryString = new URLSearchParams({ id: id }).toString();

      try {
        const response = await axiosPrivate.get(`${PDF_URL}?${queryString}`);

        console.log(response?.data?.response);
        const fileBufferData = response?.data?.response?.file?.data;
        setPDFName(response?.data?.response?.name);

        const decompressedData = pako.inflate(fileBufferData);

        setPdfData(decompressedData);
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

        setLoading(true);

        const doc = await pdfjs.getDocument(new Uint8Array(decompressedData))
          .promise;
        setNumPages(doc.numPages);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPdf();
  }, [id]);

  const handlePrevPage = () => {
    setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPageNumber((prevPage) => Math.min(prevPage + 1, numPages));
  };

  return (
    <Box>
      <Flex>
        <Text>{pdfName} </Text>
      </Flex>
      {loading ? (
        <Flex
          w={"calc(100vw - 400px)"}
          h={"calc(100vh - 40px)"}
          justifyContent={"center"}
        >
          <Loader size="xl" variant="dots" />
        </Flex>
      ) : (
        pdfData &&
        !loading && (
          <Document
            file={{
              data: new Uint8Array(pdfData),
              httpHeaders: { "Content-Type": "application/pdf" },
            }}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            <Page
              pageNumber={pageNumber}
              scale={1.5}
              width={600}
              renderTextLayer={false}
            />
          </Document>
        )
      )}
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
    </Box>
  );
};

export default PDFView;
