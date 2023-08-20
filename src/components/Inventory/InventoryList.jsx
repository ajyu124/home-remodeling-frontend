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



//import InventoryIcon from '@mui/icons-material/Inventory';

//import FormWithApiCall from './FormWithApiCall';


function InventoryList() {

  const [ inventoryListData, setInventoryListData ] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiUrl}/api/inventory/`)
      .then(response => response.json())
      .then(data => {
        setInventoryListData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []); // run only once

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {map(inventoryListData, (row) => (
            <TableRow
                key={row.id}
            >
              <TableCell>{row.item}</TableCell>
              <TableCell>{row.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );




}

export default InventoryList;
