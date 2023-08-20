import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiUrl } from '../../constants';

function ShippingDetail() {
  const { shipping_id } = useParams();
  const [shippingData, setShippingData] = useState({});

  useEffect(() => {
    fetch(`${apiUrl}/api/shippings/${shipping_id}/`)
      .then(response => response.json())
      .then(data => {
        setShippingData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [shipping_id]);

  return (
    <div>
      <h2>Shipping Detail</h2>
      <p>Product: {shippingData.product_detail_name}</p>
      <p>Street Address: {shippingData.street_address}</p>
      <p>City: {shippingData.city}</p>
      <p>State: {shippingData.state}</p>
      <p>Zipcode: {shippingData.zipcode}</p>
      <p>Customer Name: {shippingData.customer_name}</p>
      <p>Customer Email: {shippingData.customer_email}</p>
      <p>Created At: {new Date(shippingData.created_at).toLocaleString()}</p>
      {/* You can display other details as needed */}
    </div>
  );
}

export default ShippingDetail;
