


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { apiUrl } from '../../constants';
import ConfirmationDialog from '../../components/dialogs/ConfirmationDialog';

function ProductDetail() {
  const { product_id } = useParams();

  const [productData, setProductData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiUrl}/api/product/read/${product_id}/`)
      .then(response => response.json())
      .then(data => {
        setProductData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [product_id]);


  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const handleConfirm = () => {
    fetch(`${apiUrl}/api/product/delete/${product_id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        navigate('/product/product_list');
        setConfirmationOpen(false);
      });
  };
  const handleClose = () => {
    setConfirmationOpen(false);
  };
  
  const imageSrcUrl = `${apiUrl}/api/images/${productData.image_name}`;

  return (
    <Box sx={{ pr: 5, pl: 2 }}>
      <Box sx={{mt: 2, mb: 3}}>
        <Typography variant="h6" gutterBottom>
          Product Detail
        </Typography>
      </Box>

      <Box sx={{mt: 2}}>
        <Typography>
          <strong>Name: </strong>
          {productData.name}
        </Typography>
      </Box>

      <Box sx={{ mt: 2, mb: 3 }}>
        <img src={imageSrcUrl}  
          height="300"
          alt={productData.name} />
      </Box>

      <Box sx={{mt: 5, display: 'flex', flexDirection: 'row'}}>
        <Box>
          <Button 
            variant="outlined"
            onClick={() => {
              navigate(`/product/edit_product/${product_id}`);
            }}
          >
            Edit
          </Button>
        </Box>
        <Box sx={{ marginLeft: '20px' }}>
          <Button 
            variant="outlined"
            onClick={()=>{
              setConfirmationOpen(true);
            }}
          >
            Delete
          </Button>

          <ConfirmationDialog
            open={isConfirmationOpen}
            onClose={handleClose}
            onConfirm={handleConfirm}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ProductDetail;
