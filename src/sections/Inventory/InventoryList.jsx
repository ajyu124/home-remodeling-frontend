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

function InventoryList() {
  const [ inventoryListData, setInventoryListData ] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiUrl}/api/inventory/read_list/?search=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        setInventoryListData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [searchTerm]);

  const handleItemClick = (id) => {
    navigate(`/inventory/inventory-detail/${id}`);
  };

  return (
    <Box>

      <Box sx={{ padding: 2, display: 'flex', flexDirection: 'row' }}>
        <Box>
          <Button 
            variant="outlined"
            onClick={()=>{
              navigate('/inventory/create_inventory');
            }}
            >
            Create Inventory
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
              <TableCell><b>Category</b></TableCell>
              <TableCell><b>Item</b></TableCell>
              <TableCell><b>Quantity</b></TableCell>
              <TableCell><b>Price per Unit ($)</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {map(inventoryListData, (row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={() => handleItemClick(row.id)}
              >
                <TableCell>{row.category_description}</TableCell>
                <TableCell>{row.item}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.price_per_unit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>

  );




}

export default InventoryList;
