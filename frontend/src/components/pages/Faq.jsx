import React from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Faq = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Frequently Asked Questions ❓
      </Typography>
      
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">What is Urban Service?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Urban Service is an online platform providing local services, connecting users with professionals for various needs.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">How do I book a service?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can book a service by signing up, selecting a category, and choosing a service provider near you.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">What payment methods are accepted?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We accept credit/debit cards, UPI, and online payment wallets for secure transactions.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">How can I contact support?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can reach out to our support team at support@urbanservice.com or call +1-800-123-4567.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default Faq;
