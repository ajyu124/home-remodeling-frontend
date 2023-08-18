
import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


import { apiUrl } from '../../constants';

function CreateEmail({ data }) {
  const { email_address } = useParams();

  const [recipient, setRecipient] = useState(email_address);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // URL of API endpoint
    const createApiUrl = `${apiUrl}/api/my_emails/create/`;

    // payload to be sent to the API
    const payload = {
      recipient: recipient,
      subject: subject,
      body: body,
    };

    // Making the API call using fetch
    fetch(createApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((apiResponse) => {
        console.log("API response:", apiResponse);
        navigate('/my_email_list');
      })
      .catch((error) => {
        console.log(error);
        navigate('/my_email_list');
      });
  };

  return (
    <Box>
      <Box sx={{ paddingTop: 2 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ padding: 2 }}>
            <TextField 
              label="Recipient"
              fullWidth   // Take up full width
              onChange={(e) => setRecipient(e.target.value)}
              value={recipient}
            />
          </Box>

          <Box sx={{ padding: 2 }}>
            <TextField 
              label="Subject"
              fullWidth   // Take up full width
              onChange={(e) => setSubject(e.target.value)}
              value={subject}
            />
          </Box>

          <Box sx={{ padding: 2 }}>
            <TextField 
              multiline   // Enable multi-line
              rows={10}    // Specify the initial number of rows
              fullWidth   // Take up full width
              label="Body"
              variant="outlined"
              onChange={(e) => setBody(e.target.value)}
              value={body}
            />
          </Box>

          <Box sx={{ padding: 2 }}>
            <Button 
              variant="contained"
              type="submit"
              disabled = {
                recipient === '' 
                || subject === '' 
                || body === '' 
              }
            >
              Send Email
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default CreateEmail;
