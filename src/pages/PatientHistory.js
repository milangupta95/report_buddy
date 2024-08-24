import React, { useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Viewer } from '@react-pdf-viewer/core';

const PatientHistory = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [modalType, setModalType] = useState('summary');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const data = [
    {
      serialNo: 1,
      reportType: 'Annual Report',
      summary: 'This is the summary of the Annual Report.',
      pdfUrl: 'https://arxiv.org/pdf/2201.02177.pdf',
    },
    {
      serialNo: 2,
      reportType: 'Financial Report',
      summary: 'This is the summary of the Financial Report.',
      pdfUrl: 'https://arxiv.org/pdf/2201.02177.pdf',
    },
    {
      serialNo: 3,
      reportType: 'Market Analysis',
      summary: 'This is the summary of the Market Analysis.',
      pdfUrl: 'https://arxiv.org/pdf/2201.02177.pdf',
    },
    {
      serialNo: 4,
      reportType: 'Technical Report',
      summary: 'This is the summary of the Technical Report.',
      pdfUrl: 'https://arxiv.org/pdf/2201.02177.pdf',
    },
    {
      serialNo: 5,
      reportType: 'Research Report',
      summary: 'This is the summary of the Research Report.',
      pdfUrl: 'https://arxiv.org/pdf/2201.02177.pdf',
    },
  ];

  const handleSummaryClick = (report) => {
    setSelectedReport(report);
    setModalType('summary');
    onOpen();
  };

  const handlePdfClick = (report) => {
    setSelectedReport(report);
    setModalType('pdf');
    onOpen();
  };

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      <Table variant="simple" bg="white" boxShadow="md" borderRadius="lg">
        <Thead bg="gray.100">
          <Tr>
            <Th>Serial No</Th>
            <Th>Report Type</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((report) => (
            <Tr key={report.serialNo}>
              <Td>{report.serialNo}</Td>
              <Td>{report.reportType}</Td>
              <Td>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => handleSummaryClick(report)}
                >
                  Show Summary
                </Button>
                <Button colorScheme="teal" onClick={() => handlePdfClick(report)}>
                  View PDF
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalType === 'summary'
              ? 'Report Summary'
              : `PDF: ${selectedReport?.reportType}`}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {modalType === 'summary' ? (
              <Box p={4}>
                <p>{selectedReport?.summary}</p>
              </Box>
            ) : (
              <Box h="500px">
                <Viewer fileUrl={selectedReport?.pdfUrl} />
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PatientHistory;
