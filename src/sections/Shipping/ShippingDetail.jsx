import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { apiUrl } from '../../constants';
import ConfirmationDialog from '../../components/dialogs/ConfirmationDialog';

function ShippingDetail() {
  const { shipping_id } = useParams();
  const [shippingData, setShippingData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiUrl}/api/shipping/read/${shipping_id}/`)
      .then(response => response.json())
      .then(data => {
        setShippingData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [shipping_id]);

  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const handleConfirm = () => {
    fetch(`${apiUrl}/api/shipping/delete/${shippingData.id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        navigate('/shipping/shipping_list');
        setConfirmationOpen(false);
      });
  };
  const handleClose = () => {
    setConfirmationOpen(false);
  };

  return (
    <Box>
      <Box sx={{mt: 2, mb: 3}}>
        <Typography variant="h6" gutterBottom>
          Shipping Detail
        </Typography>
      </Box>

      <Box sx={{mt: 2}}>
        <Typography>
          <strong>Product: </strong>
          {shippingData.product_detail_name}
        </Typography>
      </Box>

      <Box sx={{mt: 2}}>
        <Typography>
          <strong>Street Address: </strong>
          {shippingData.street_address}
        </Typography>
      </Box>

      <Box sx={{mt: 2}}>
        <Typography>
          <strong>City: </strong>
          {shippingData.city}
        </Typography>
      </Box>

      <Box sx={{mt: 2}}>
        <Typography>
          <strong>State: </strong>
          {shippingData.state}
        </Typography>
      </Box>

      <Box sx={{mt: 2}}>
        <Typography>
          <strong>Zip code: </strong>
          {shippingData.zipcode}
        </Typography>
      </Box>

      <Box sx={{mt: 2}}>
        <Typography>
          <strong>Customer Name: </strong>
          {shippingData.customer_name}
        </Typography>
      </Box>

      <Box sx={{mt: 2}}>
        <Typography>
          <strong>Customer Email: </strong>
          {shippingData.customer_email}
        </Typography>
      </Box>

      <Box sx={{mt: 2}}>
        <Typography>
          <strong>Created At: </strong>
          {new Date(shippingData.created_at).toLocaleString()}
        </Typography>
      </Box>

      <Box sx={{mt: 5, display: 'flex', flexDirection: 'row'}}>
        <Box sx={{mr: 3}}>
          <Button 
            variant="outlined"
            onClick={()=>{
              navigate(`/shipping/edit_shipping/${shipping_id}`);
            }}
          >
            Edit
          </Button>
        </Box>

        <Box>
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

export default ShippingDetail;
