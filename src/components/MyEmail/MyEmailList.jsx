import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { map } from 'lodash';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { apiUrl } from '../../constants';
import { Box } from '@mui/material';

function MyEmailList() {
  const [ myEmailListData, setMyEmailListData ] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiUrl}/api/my_emails/`)
      .then(response => response.json())
      .then(data => {
        setMyEmailListData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []); // run only once

  return (
    <Box>
      <Box sx={{ padding: 2 }}>
        <Button 
          variant="outlined"
          onClick={()=>{
            navigate('/create_email');
          }}
          >
          Create New Email
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Recipient</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Body</TableCell>
              <TableCell>Sent at</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {map(myEmailListData, (row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.recipient}</TableCell>
                <TableCell>{row.subject}</TableCell>
                <TableCell>{row.body}</TableCell>
                <TableCell>{new Date(row.sent_at).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default MyEmailList;
