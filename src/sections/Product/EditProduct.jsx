
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { apiUrl, imageUrl } from '../../constants';

function EditProduct() {
  const { product_id } = useParams();

  // const [item, setItem] = useState('');
  const [name, setName] = useState('');
  const [imageName, setImageName] = useState('');

  useEffect(() => {
    fetch(`${apiUrl}/api/product/read/${product_id}/`)
      .then(response => response.json())
      .then(data => {
        setName(data.name);
        setImageName(data.image_name);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [product_id]);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // payload to be sent to the API
    const payload = {
      name: name,
    };

    // Making the API call using fetch
    fetch(`${apiUrl}/api/product/update/${product_id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((apiResponse) => {
        console.log("API response:", apiResponse);
        navigate('/product/product_list');
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
            <TextField 
              label="Name"
              fullWidth   // Take up full width
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Box>

          <Box sx={{ mt: 2, ml: 2 }}>
            <img src={imageUrl + '/product/' + imageName}  
              height="300"
              alt={name} />
          </Box>

          <Box sx={{ mt: 5, padding: 2 }}>
            <Button 
              variant="contained"
              type="submit"
              disabled = {
                name === '' 
              }
            >
              Update Product
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default EditProduct;
