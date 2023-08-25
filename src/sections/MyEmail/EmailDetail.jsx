


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { apiUrl } from '../../constants';
import ConfirmationDialog from '../../components/dialogs/ConfirmationDialog';

function EmailDetail() {
  const { email_id } = useParams();
  const [emailData, setEmailData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiUrl}/api/my_email/read/${email_id}/`)
      .then(response => response.json())
      .then(data => {
        setEmailData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [email_id]);


  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const handleConfirm = () => {
    fetch(`${apiUrl}/api/my_email/delete/${email_id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        navigate('/email/email_list');
        setConfirmationOpen(false);
      });
  };
  const handleClose = () => {
    setConfirmationOpen(false);
  };
  

  return (
    <Box>
      <Box sx={{mt: 2, mb: 3}}>
        <Typography variant="h6" gutterBottom>
          Email Detail
        </Typography>
      </Box>

      <Box sx={{mt: 2}}>
        <Typography>
          <strong>Recipient: </strong>
          {emailData.recipient}
        </Typography>
      </Box>

      <Box sx={{mt: 2}}>
        <Typography>
          <strong>Subject: </strong>
          {emailData.subject}
        </Typography>
      </Box>

      <Box sx={{mt: 2}}>
        <Typography>
          <strong>Body: </strong> 
          {emailData.body}
        </Typography>
      </Box>

      <Box sx={{mt: 2}}>
        <Typography>
          <strong>Sent at: </strong> 
          {new Date(emailData.sent_at).toLocaleString()}
        </Typography>
      </Box>

      <Box sx={{mt: 5, display: 'flex', flexDirection: 'row'}}>
        <Box>
          <Button 
            variant="outlined"
            onClick={()=>{
              setConfirmationOpen(true);
            }}
          >
            Delete
          </Button>

          <ConfirmationDialog
            open={isConfirmationOpen}
            onClose={handleClose}
            onConfirm={handleConfirm}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default EmailDetail;
