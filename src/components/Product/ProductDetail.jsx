import React, { useState } from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { apiUrl, imageUrl } from '../../constants';

function ProductDetail({ data }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [addressState, setAddressState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // URL of API endpoint
    const createApiUrl = `${apiUrl}/api/shippings/create/`;

    // payload to be sent to the API
    const payload = {
      product_detail: data.id,
      street_address: streetAddress,
      city: city,
      state: addressState,
      zipcode: zipcode,
      customer_name: customerName,
      customer_email: customerEmail,
    };

    // Making the API call using fetch
    fetch(createApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((apiResponse) => {
        console.log("API response:", apiResponse);
        setIsDrawerOpen(false);
        setStreetAddress('');
      })
  };

  // toggleDrawer(true/false) returns a function, not a value.
  const toggleDrawer = (open) => {
    // return a event handler function that remembers "open"
    return (event) => {
      setIsDrawerOpen(open);
    };
  }

  const renderForm = () => (
    <Box
      sx={{ width: 500 }}
      role="presentation"
    >
      <Box sx={{ paddingTop: 2 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ padding: 2 }}>
            <Typography variant='h5'>
              {data.name}
            </Typography>
          </Box>

          <Box sx={{ padding: 2 }}>
            <TextField 
              label="Street Address"
              onChange={(e) => setStreetAddress(e.target.value)}
              value={streetAddress}
              fullWidth
            />
          </Box>

          <Box sx={{ padding: 2 }}>
            <TextField 
              label="City"
              onChange={(e) => setCity(e.target.value)}
              value={city}
              fullWidth
            />
          </Box>

          <Box sx={{ padding: 2 }}>
            <TextField 
              label="State"
              onChange={(e) => setAddressState(e.target.value)}
              value={addressState}
              fullWidth
            />
          </Box>

          <Box sx={{ padding: 2 }}>
            <TextField 
              label="Zipcode"
              onChange={(e) => setZipcode(e.target.value)}
              value={zipcode}
              fullWidth
            />
          </Box>

          <Box sx={{ padding: 2 }}>
            <TextField 
              label="CustomerName"
              onChange={(e) => setCustomerName(e.target.value)}
              value={customerName}
              fullWidth
            />
          </Box>

          <Box sx={{ padding: 2 }}>
            <TextField 
              label="CustomerEmail"
              onChange={(e) => setCustomerEmail(e.target.value)}
              value={customerEmail}
              fullWidth
            />
          </Box>

          <Box sx={{ padding: 2 }}>
            <Button 
              variant="contained"
              type="submit"
              disabled = {
                streetAddress === '' 
                || city === '' 
                || addressState === '' 
                || zipcode === '' 
                || customerName === '' 
                || customerEmail === ''
              }
            >
              Ship
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );

  return (
    <Box>
      <Box sx={{ mb: 10 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box>
            <Typography variant='h5'>
              {data.name}
            </Typography>
          </Box>
          <Box sx={{ marginLeft: '20px' }}>
            <Button 
              variant="contained"
              onClick={toggleDrawer(true)} // toggleDrawer(true) returns a function that remembers "open" as true
            >
              Ship
            </Button>
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <img src={imageUrl + '/product/' + data.image_name}  
            height="300"
            alt={data.name} />
        </Box>
      </Box>

      <Drawer
        anchor='right'
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}  // toggleDrawer(false) returns a function that remembers "open" as false
      >
        {renderForm()}
      </Drawer>

    </Box>
  );
}

export default ProductDetail;