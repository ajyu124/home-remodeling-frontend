import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';

import TopNavigation from "./TopNavigation";
import './TopNavigation.css';

const Layout = () => {
  return (
    <Box>
      <TopNavigation />

      <Box sx={{ mt: 15, ml: 5 }}>
        <Outlet />
      </Box>
    </Box>
  )
};

export default Layout;