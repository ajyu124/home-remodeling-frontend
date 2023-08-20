import React from 'react';
import { AppBar } from '@mui/material';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';

const TopNavigation = () => {
	return (
		<Box>
			<AppBar>
				<ul id="nav-list">
          <li>Burlingame Home Remodelling</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/product_list">Product</Link>
          </li>
          <li>
            <Link to="/shipping_list">Shipping</Link>
          </li>
          <li>
            <Link to="/inventory_list">Inventory</Link>
          </li>
          <li>
            <Link to="/my_email_list">Email</Link>
          </li>
					<li>
            <Link to="/about">About</Link>
          </li>
				</ul>
			</AppBar>
		</Box>
	)
}

export default TopNavigation
