import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './sections/Layout/Layout';

import Home from './sections/Home';

import InventoryList from './sections/Inventory/InventoryList';
import InventoryDetail from './sections/Inventory/InventoryDetail';
import CreateInventory from './sections/Inventory/CreateInventory';
import EditInventory from './sections/Inventory/EditInventory';

import ProductList from './sections/Product/ProductList';
import ProductDetail from './sections/Product/ProductDetail';
import EditProduct from './sections/Product/EditProduct';
import CreateProduct from './sections/Product/CreateProduct';

import ShippingList from './sections/Shipping/ShippingList';
import ShippingDetail from './sections/Shipping/ShippingDetail';
import EditShipping from './sections/Shipping/EditShipping';
import CreateShipping from './sections/Shipping/CreateShipping';

import EmailList from './sections/MyEmail/EmailList';
import EmailDetail from './sections/MyEmail/EmailDetail';
import CreateEmail from './sections/MyEmail/CreateEmail';

import About from './sections/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="/inventory/inventory_list" element={<InventoryList />} />
          <Route path="/inventory/inventory-detail/:inventory_id" element={<InventoryDetail />} />
          <Route path="/inventory/create_inventory" element={<CreateInventory />} />
          <Route path="/inventory/edit_inventory/:inventory_id" element={<EditInventory />} />
          
          <Route path="/product/product_list" element={<ProductList />} />
          <Route path="/product/product-detail/:product_id" element={<ProductDetail />} />
          <Route path="/product/edit_product/:product_id" element={<EditProduct />} />
          <Route path="/product/create_product" element={<CreateProduct />} />

          <Route path="/shipping/shipping_list" element={<ShippingList />} />
          <Route path="/shipping/shipping-detail/:shipping_id" element={<ShippingDetail />} />
          <Route path="/shipping/create_shipping" element={<CreateShipping />} />
          <Route path="/shipping/edit_shipping/:shipping_id" element={<EditShipping />} />

          <Route path="/email/email_list" element={<EmailList />} />
          <Route path="/email/email-detail/:email_id" element={<EmailDetail />} />
          <Route path="/email/create_email" element={<CreateEmail />} />
          <Route path="/email/create_email/:email_address" element={<CreateEmail />} />
          
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
