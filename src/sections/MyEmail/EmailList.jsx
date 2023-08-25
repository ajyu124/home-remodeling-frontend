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

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import { apiUrl } from '../../constants';
import { Box } from '@mui/material';

function EmailList() {
  const [ emailListData, setEmailListData ] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiUrl}/api/my_email/read_list/?search=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        setEmailListData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [searchTerm]);

  const handleItemClick = (id) => {
    navigate(`/email/email-detail/${id}`);
  };

  return (
    <Box>
      <Box sx={{ padding: 2, display: 'flex', flexDirection: 'row' }}>
        <Box>
          <Button 
            variant="outlined"
            onClick={()=>{
              navigate('/email/create_email');
            }}
            >
            Create Email
          </Button>
        </Box>
        <Box sx={{ ml: 5 }}>
          <TextField
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            size="small"
          />
          <IconButton aria-label="search">
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><b>Recipient</b></TableCell>
              <TableCell><b>Subject</b></TableCell>
              <TableCell><b>Body</b></TableCell>
              <TableCell><b>Sent at</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {map(emailListData, (row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={() => handleItemClick(row.id)}
                >
                <TableCell>{row.recipient}</TableCell>
                <TableCell>{row.subject}</TableCell>
                <TableCell>{row.body}</TableCell>
                <TableCell>{new Date(row.sent_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default EmailList;
