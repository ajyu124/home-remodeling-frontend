import React, { useState, useEffect } from 'react';
import { map } from 'lodash';

import Box from '@mui/material/Box';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import { apiUrl } from '../../constants';
import ProductDetail from './ProductDetail';

function ProductList() {
  const [ productListData, setProductListData ] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

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
    return <ProductDetail key={d.id} data={d} />
  });

  return (
    <Box>
      <Box>
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
   
      <Box sx={{ pl: 1, pt: 5 }}>
        {itemList}
      </Box>
    </Box>
  );
}

export default ProductList;