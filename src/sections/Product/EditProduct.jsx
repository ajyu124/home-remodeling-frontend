
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { apiUrl } from '../../constants';
import UploadImageComponent from '../../components/UploadImage';

function EditProduct() {
  const { product_id } = useParams();

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

    const payload = {
      name: name,
      image_name: imageName,
    };

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
    <Box sx={{ pr: 5, pl: 2 }}>
      <Box sx={{mt: 2, mb: 3}}>
        <Typography variant="h6" gutterBottom>
          Product Detail
        </Typography>
      </Box>

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
          <UploadImageComponent setImageName={setImageName} imageName={imageName} />
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
            Update
          </Button>
        </Box>

      </form>
    </Box>
  );
}

export default EditProduct;
