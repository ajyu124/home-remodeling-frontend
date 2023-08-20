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

import { apiUrl } from '../../constants';



import InventoryIcon from '@mui/icons-material/Inventory';

//import FormWithApiCall from './FormWithApiCall';


function ShippingList() {
  const [ shippingListData, setShippingListData ] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiUrl}/api/shippings/`)
      .then(response => response.json())
      .then(data => {
        setShippingListData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []); // run only once

  const handleItemClick = (shipping_id) => {
    navigate(`/shipping-detail/${shipping_id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Street Address</TableCell>
            <TableCell>City</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Zipcode</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Customer Email</TableCell>
            <TableCell>Created at</TableCell>
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
                onClick={() => {
                  navigate(`/create_email/${row.customer_email}`);
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
  );




}

export default ShippingList;
