import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { map } from 'lodash';

import Box from '@mui/material/Box';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import { apiUrl } from '../../constants';
import ProductListItem from './ProductListItem';

function ProductList() {
  const [ productListData, setProductListData ] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiUrl}/api/product/read_list/?search=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        setProductListData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [searchTerm]);

  const itemList = map(productListData, (d) => {
    return <ProductListItem key={d.id} data={d} />
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 2 }}>
        <Box>
          <Button 
            variant="outlined"
            onClick={()=>{
              navigate('/product/create_product');
            }}
            >
            Create
          </Button>
        </Box>
        <Box sx={{ ml: 5 }}>
          <TextField
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            size="small"
          />
          <IconButton aria-label="search">
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>

      <Divider />

      <Box sx={{ pl: 1, mt: 3 }}>
        {itemList}
      </Box>
    </Box>
  );
}

export default ProductList;