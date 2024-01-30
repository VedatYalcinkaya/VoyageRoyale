import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF0000", // Use your preferred primary color
    },
  },
});

const faqs = [
  {
  question: "How to rent?",
  answer: "Renting a luxury car is easy. Simply browse our collection select your desired car, choose the rental period, and make a reservation. Our team will handle the rest."
  },
  {
  question: "What are the requirements?",
  answer: "To rent a luxury car, you need a valid driver's license, proof of insurance, and a credit card for the security deposit. Additional requirements may vary based on specific car models."
  },
  {
  question: "Can I modify my reservation?",
  answer: "Yes, you can modify your reservation. Please contact our customer support team at least 24 hours before your scheduled pick-up time to make any changes."
  },
  {
  question: "What is the cancellation policy?",
  answer: "Our cancellation policy allows for free cancellations up to 48 hours before the scheduled pick-up time. Cancellations made within 48 hours may incur a cancellation fee."
  },
  {
  question: "Is insurance included?",
  answer: "Basic insurance coverage is included in the rental price. However, additional coverage options are available for purchase to provide extra peace of mind."
  },
  {
  question: "Do you offer roadside assistance?",
  answer: "Yes, we provide 24/7 roadside assistance to ensure your safety and peace of mind during your rental period."
  }
]

const Faq = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          p: 6,
          pt: 11,
          pb: 11,
          marginTop:10,
        
        }}
      >
        <Box
          sx={{
            flexDirection: "column",
            alignItems: "center",
            display:"flex "              
          }}
        >
          <Typography variant="h3" sx={{ mb: 3,color:"#0f4037"}}>
            FAQs
          </Typography>
          <Typography sx={{color:"#0f4037"}}>
            Have some questions about our luxury car rental services? Find the answers below.
          </Typography>
        </Box>
        <Box sx={{ mt: 2, textAlign:"left"}}>
          {faqs.map((faq, index)=>(
          <Accordion key={faq.question} sx={{mt:1, borderColor:"#0f4037",backgroundColor: "#fdfdfd", "&:hover":{backgroundColor: "#f9f9f9"}}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{fontSize:16, color:"#0f4037"}}>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{fontSize:14, color:"#0f4037"}}>
              {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
            
          }}
        >
          <Typography variant="h5" sx={{ mb: 1, color:"#0f4037" }}>
            Still have questions?
          </Typography>
          <Typography sx={{color:"#0f4037"}}>
            Contact our support team for further assistance.
          </Typography>
          <Button variant="contained" sx={{
                    mt: 2,
                    mb: 2,
                    backgroundColor: "#0F4037",
                    "&:hover": {
                      backgroundColor: "#B58B5D",
                    },
                  }}>
            Contact
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Faq;
