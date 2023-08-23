
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';


import { apiUrl } from '../../constants';

function EditInventory() {
  const { inventory_id } = useParams();

  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [category, setCategory] = useState('');
  const [inventoryCategoryListData, setInventoryCategoryListData] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/api/inventory/read/${inventory_id}`)
      .then(response => response.json())
      .then(data => {
        setCategory(data.category);
        setItem(data.item);
        setQuantity(data.quantity);
        setPricePerUnit(data.price_per_unit);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    fetch(`${apiUrl}/api/inventory_category/read_list/`)
      .then(response => response.json())
      .then(data => {
        setInventoryCategoryListData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [inventory_id]);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // payload to be sent to the API
    const payload = {
      item: item,
      quantity: quantity,
      price_per_unit: pricePerUnit,
      category: category,
    };

    // Making the API call using fetch
    fetch(`${apiUrl}/api/inventory/update/${inventory_id}/`, {
      method: "PUT",
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
                category === '' 
                || item === '' 
                || quantity === '' 
                || pricePerUnit === ''
              }
            >
              Update Inventory
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default EditInventory;
