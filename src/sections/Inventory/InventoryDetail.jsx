import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { apiUrl } from '../../constants';
import ConfirmationDialog from '../../components/dialogs/ConfirmationDialog';

function InventoryDetail() {
  const { inventory_id } = useParams();
  const [inventoryData, setInventoryData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiUrl}/api/inventory/read/${inventory_id}/`)
      .then(response => response.json())
      .then(data => {
        setInventoryData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [inventory_id]);


  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const handleConfirm = () => {
    fetch(`${apiUrl}/api/inventory/delete/${inventoryData.id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        navigate('/inventory/inventory_list');
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
          Inventory Detail
        </Typography>
      </Box>

      <Box sx={{mt: 2}}>
        <Typography>
          <strong>Category: </strong> 
          {inventoryData.category_description}
        </Typography>
      </Box>

      <Box sx={{mt: 2}}>
        <Typography>
          <strong>Item: </strong>
          {inventoryData.item}
        </Typography>
      </Box>

      <Box sx={{mt: 2}}>
        <Typography>
          <strong>Quantity: </strong>
          {inventoryData.quantity}
        </Typography>
      </Box>

      <Box sx={{mt: 2}}>
        <Typography>
          <strong>Price per Unit: </strong>
          {inventoryData.price_per_unit}
        </Typography>
      </Box>

      <Box sx={{mt: 5, display: 'flex', flexDirection: 'row'}}>
        <Box sx={{mr: 3}}>
          <Button 
            variant="outlined"
            onClick={()=>{
              navigate(`/inventory/edit_inventory/${inventory_id}`);
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

export default InventoryDetail;
