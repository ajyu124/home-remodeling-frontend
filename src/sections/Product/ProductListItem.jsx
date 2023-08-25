import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { apiUrl } from '../../constants';

function ProductListItem({ data }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [addressState, setAddressState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      product_detail: data.id,
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
        setIsDrawerOpen(false);
        navigate('/shipping/shipping_list')
      })
  };

  // toggleDrawer(true/false) returns a function, not a value.
  const toggleDrawer = (open) => {
    // return a event handler function that remembers "open"
    return (event) => {
      event.stopPropagation();
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
              label="Zip Code"
              onChange={(e) => setZipcode(e.target.value)}
              value={zipcode}
              fullWidth
            />
          </Box>

          <Box sx={{ padding: 2 }}>
            <TextField 
              label="Customer Name"
              onChange={(e) => setCustomerName(e.target.value)}
              value={customerName}
              fullWidth
            />
          </Box>

          <Box sx={{ padding: 2 }}>
            <TextField 
              label="Customer Email"
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

  const imageSrcUrl = `${apiUrl}/api/images/${data.image_name}`;

  const handleItemClick = () => {
    navigate(`/product/product-detail/${data.id}`);
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }} onClick={() => handleItemClick()}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box>
            <Typography variant='body1'>
              {data.name}
            </Typography>
          </Box>

          <Box sx={{ marginLeft: '30px' }}>
            <Button 
              variant="contained"
              size="small"
              onClick={toggleDrawer(true)} // toggleDrawer(true) returns a function that remembers "open" as true
            >
              Ship
            </Button>
          </Box>
        </Box>

        <Box sx={{ mt: 2, mb: 3 }}>
          <img src={imageSrcUrl}  
            height="100"
            alt={data.name} />
        </Box>

        <Divider />
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

export default ProductListItem;