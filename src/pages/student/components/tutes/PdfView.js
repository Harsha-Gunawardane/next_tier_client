import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { Box, Text } from "@chakra-ui/react";

const PDFView = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <Box>
      <Document
        file="https://storage.cloud.google.com/next_tier_file_bucket/2023-08-08T10%3A09%3A04.656Z-e1e4b4bc-85b7-4473-be50-5bb4566aacaf-Introduction_to_Power.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <Text>
        Page {pageNumber} of {numPages}
      </Text>
    </Box>
  );
};

export default PDFView;
