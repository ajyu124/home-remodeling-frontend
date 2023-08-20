import React, { useState, useEffect } from 'react';
import { map } from 'lodash';

import Box from '@mui/material/Box';


import { apiUrl } from '../../constants';
import ProductDetail from './ProductDetail';

function ProductList() {
  const [ productListData, setProductListData ] = useState({});

  useEffect(() => {
    fetch(`${apiUrl}/api/products/`)
      .then(response => response.json())
      .then(data => {
        setProductListData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []); // run only once

  const itemList = map(productListData, (d) => {
    return <ProductDetail key={d.id} data={d} />
  });

  return (
    <Box>
      <Box>
        {itemList}
      </Box>
    </Box>
  );
}

export default ProductList;