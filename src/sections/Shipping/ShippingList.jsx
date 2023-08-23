import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { map } from 'lodash';
import Box from '@mui/material/Box';
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

function ShippingList() {
  const [ shippingListData, setShippingListData ] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiUrl}/api/shipping/read_list/?search=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        setShippingListData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [searchTerm]);

  const handleItemClick = (shipping_id) => {
    navigate(`/shipping/shipping-detail/${shipping_id}`);
  };

  return (
    <Box>

      <Box sx={{ padding: 2, display: 'flex', flexDirection: 'row' }}>
        <Box>
          <Button 
            variant="outlined"
            onClick={()=>{
              navigate('/shipping/create_shipping');
            }}
            >
            Create Shipping
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
              <TableCell><b>Product</b></TableCell>
              <TableCell><b>Street Address</b></TableCell>
              <TableCell><b>City</b></TableCell>
              <TableCell><b>State</b></TableCell>
              <TableCell><b>Zip Code</b></TableCell>
              <TableCell><b>Customer Name</b></TableCell>
              <TableCell><b>Customer Email</b></TableCell>
              <TableCell><b>Created at</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {map(shippingListData, (row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={() => handleItemClick(row.id)}
              >
                <TableCell>{row.product_detail_name}</TableCell>
                <TableCell>{row.street_address}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>{row.zipcode}</TableCell>
                <TableCell>{row.customer_name}</TableCell>
                <TableCell
                  sx={{ textDecoration: 'underline', color: 'blue' }}
                  onClick={(event) => {
                    event.stopPropagation(); //stop bubbling up to parent element who also has onClick()
                    navigate(`/email/create_email/${row.customer_email}`);
                  }}
                >
                  {row.customer_email}
                </TableCell>
                <TableCell>{new Date(row.created_at).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );




}

export default ShippingList;
