
import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { apiUrl } from '../../constants';

function CreateEmail({ data }) {
  const { email_address } = useParams();

  const [recipient, setRecipient] = useState(email_address);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      recipient: recipient,
      subject: subject,
      body: body,
    };

    fetch(`${apiUrl}/api/my_email/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((apiResponse) => {
        console.log("API response:", apiResponse);
        navigate('/email/email_list');
      })
      .catch((error) => {
        console.log(error);
        navigate('/email/email_list');
      });
  };

  return (
    <Box sx={{ pr: 5, pl: 2 }}>
      <Box sx={{ mt: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Create Email
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Box sx={{ pb: 3 }}>
          <TextField 
            label="Recipient"
            fullWidth
            onChange={(e) => setRecipient(e.target.value)}
            value={recipient}
            size="small"
          />
        </Box>

        <Box sx={{ pb: 3 }}>
          <TextField 
            label="Subject"
            fullWidth
            onChange={(e) => setSubject(e.target.value)}
            value={subject}
            size="small"
          />
        </Box>

        <Box sx={{ pb: 3 }}>
          <TextField 
            multiline
            rows={12}
            fullWidth
            label="Body"
            variant="outlined"
            onChange={(e) => setBody(e.target.value)}
            value={body}
            size="small"
          />
        </Box>

        <Box sx={{ pt: 2 }}>
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
  );
}

export default CreateEmail;
