import React from 'react';
import { AppBar } from '@mui/material';
import { Link, useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import './TopNavigation.css';

const TopNavigation = () => {
  const location = useLocation();

	return (
		<Box>
			<AppBar>
				<ul id="nav-list">
          <li>Burlingame Home Remodelling</li>

          <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              Home
            </Link>
          </li>

          <li>
            <Link 
              to="/inventory/inventory_list"
              className={location.pathname.startsWith('/inventory') ? 'active' : ''}
            >
              Inventory
            </Link>
          </li>

          <li>
            <Link 
              to="/product/product_list"
              className={location.pathname.startsWith('/product/') ? 'active' : ''}
            >
              Product
            </Link>
          </li>

          <li>
            <Link 
              to="/shipping/shipping_list"
              className={location.pathname.startsWith('/shipping/') ? 'active' : ''}
            >
              Shipping
            </Link>
          </li>

          <li>
            <Link 
              to="/email/email_list"
              className={location.pathname.startsWith('/email/') ? 'active' : ''}
            >
              Email
            </Link>
          </li>

					<li>
            <Link 
              to="/about"
              className={location.pathname === '/about' ? 'active' : ''}
            >
              About
            </Link>
          </li>

				</ul>
			</AppBar>
		</Box>
	)
}

export default TopNavigation
