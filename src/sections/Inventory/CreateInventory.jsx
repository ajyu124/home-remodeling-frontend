
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';


import { apiUrl } from '../../constants';

function CreateInventory() {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [category, setCategory] = useState('');
  const [inventoryCategoryListData, setInventoryCategoryListData] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/api/inventory_category/read_list/`)
      .then(response => response.json())
      .then(data => {
        setInventoryCategoryListData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []); // run only once

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // payload to be sent to the API
    const payload = {
      item: item,
      category: category,
      quantity: quantity,
      price_per_unit: pricePerUnit,
    };

    // Making the API call using fetch
    fetch(`${apiUrl}/api/inventory/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((apiResponse) => {
        console.log("API response:", apiResponse);
        navigate('/inventory/inventory_list');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box>
      <Box sx={{ paddingTop: 2 }}>
        <form onSubmit={handleSubmit}>

          <Box sx={{ padding: 2 }}>
            <InputLabel id="select-category-labelId">Select a category</InputLabel>
            <Select
              labelId="select-category-labelId"
              value={category}
              onChange={handleChange}
              fullWidth
            > 
              {
                inventoryCategoryListData.map(({id, description}) => (
                  <MenuItem value={id} key={`category_${id}`}>{description}</MenuItem>
                ))
              }
            </Select>
          </Box>

          <Box sx={{ padding: 2 }}>
            <TextField 
              label="Item"
              fullWidth   // Take up full width
              onChange={(e) => setItem(e.target.value)}
              value={item}
            />
          </Box>

          <Box sx={{ padding: 2 }}>
            <TextField 
              label="Quantity"
              fullWidth   // Take up full width
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
            />
          </Box>

          <Box sx={{ padding: 2 }}>
            <TextField 
              label="Price per Unit"
              fullWidth   // Take up full width
              onChange={(e) => setPricePerUnit(e.target.value)}
              value={pricePerUnit}
            />
          </Box>

          <Box sx={{ padding: 2 }}>
            <Button 
              variant="contained"
              type="submit"
              disabled = {
                item === '' 
                || category === '' 
                || quantity === '' 
                || pricePerUnit === ''
              }
            >
              Create Inventory
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default CreateInventory;
