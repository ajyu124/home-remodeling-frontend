import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './components/Layout/Layout';
import Home from './components/Home';
import ProductList from './components/Product/ProductList';
import ShippingList from './components/Shipping/ShippingList';
import MyEmailList from "./components/MyEmail/MyEmailList";
import CreateEmail from "./components/MyEmail/CreateEmail";
import About from './components/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product_list" element={<ProductList />} />
          <Route path="shipping_list" element={<ShippingList />} />
          <Route path="my_email_list" element={<MyEmailList />} />
          <Route path="create_email" element={<CreateEmail />} />
          <Route path="create_email/:email_address" element={<CreateEmail />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
