
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { apiUrl } from '../../constants';

function CreateShipping() {
  const [productListData, setProductListData] = useState([]);

  const [productDetail, setProductDetail] = useState('')
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [addressState, setAddressState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    fetch(`${apiUrl}/api/product/read_list/`)
        .then(response => response.json())
        .then(data => {
          setProductListData(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
  }, []); // run only once

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      product_detail: productDetail,
      street_address: streetAddress,
      city: city,
      state: addressState,
      zipcode: zipcode,
      customer_name: customerName,
      customer_email: customerEmail,
    };

    fetch(`${apiUrl}/api/shipping/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((apiResponse) => {
        console.log("API response:", apiResponse);
        navigate('/shipping/shipping_list');
      })
      .catch((error) => {
        console.log(error);
        navigate('/shipping/shipping_list');
      });
  };

  const handleProductChange = (event) => {
    setProductDetail(event.target.value);
  };

  return (
    <Box sx={{ pr: 5, pl: 2 }}>
      <Box sx={{ mt: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Create Shipping
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Box sx={{ pb: 3 }}>
          <InputLabel id="select-product-labelId">Select a Product</InputLabel>
          <Select
            labelId="select-product-labelId"
            value={productDetail}
            onChange={handleProductChange}
            fullWidth
            size="small"
          > 
            {
              productListData.map(({id, name}) => (
                <MenuItem value={id} key={`product_${id}`}>{name}</MenuItem>
              ))
            }
          </Select>
        </Box>

        <Box sx={{ pb: 3 }}>
          <TextField 
            label="Street Address"
            fullWidth
            onChange={(e) => setStreetAddress(e.target.value)}
            value={streetAddress}
            size="small"
          />
        </Box>

        <Box sx={{ pb: 3 }}>
          <TextField 
            label="City"
            fullWidth
            onChange={(e) => setCity(e.target.value)}
            value={city}
            size="small"
          />
        </Box>

        <Box sx={{ pb: 3 }}>
          <TextField 
            label="State"
            fullWidth
            onChange={(e) => setAddressState(e.target.value)}
            value={addressState}
            size="small"
          />
        </Box>

        <Box sx={{ pb: 3 }}>
          <TextField 
            label="Zip Code"
            fullWidth
            onChange={(e) => setZipcode(e.target.value)}
            value={zipcode}
            size="small"
          />
        </Box>

        <Box sx={{ pb: 3 }}>
          <TextField 
            label="Customer Name"
            fullWidth
            onChange={(e) => setCustomerName(e.target.value)}
            value={customerName}
            size="small"
          />
        </Box>

        <Box sx={{ pb: 3 }}>
          <TextField 
            label="Customer Email"
            fullWidth
            onChange={(e) => setCustomerEmail(e.target.value)}
            value={customerEmail}
            size="small"
          />
        </Box>

        <Box sx={{ pt: 2 }}>
          <Button 
            variant="contained"
            type="submit"
            disabled = {
              productDetail === ''
              || streetAddress === '' 
              || city === '' 
              || addressState === ''
              || zipcode === ''
              || customerName === ''
              || customerEmail === ''
            }
          >
            Create Shipping
          </Button>
        </Box>

      </form>

    </Box>
  );
}

export default CreateShipping;
