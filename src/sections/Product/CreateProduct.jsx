
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { apiUrl } from '../../constants';
import UploadImageComponent from '../../components/UploadImage';

function CreateProduct() {
  const [name, setName] = useState('');
  const [imageName, setImageName] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      name: name,
      image_name: imageName,
    };

    fetch(`${apiUrl}/api/product/create/`, {
      method: "POST",
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
    <Box sx={{ pr: 5, pl: 2 }}>
      <Box sx={{ mt: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Create Product
        </Typography>
      </Box>

      <Box>
        <form onSubmit={handleSubmit}>
          <Box sx={{ pb: 5 }}>
            <TextField 
              label="Name"
              fullWidth
              onChange={(e) => setName(e.target.value)}
              value={name}
              size="small"
            />
          </Box>

          <Box sx={{ pb: 2 }}>
            <UploadImageComponent setImageName={setImageName} />
          </Box>

          <Box>
            <Button 
              variant="contained"
              type="submit"
              disabled = {
                name === '' 
                || imageName === ''
              }
            >
              Create
            </Button>
          </Box>

        </form>
      </Box>
    </Box>
  );
}

export default CreateProduct;
