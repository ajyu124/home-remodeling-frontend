import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiUrl } from '../../constants';

function EmailDetail() {
  const { email_id } = useParams();
  const [emailData, setEmailData] = useState({});

  useEffect(() => {
    fetch(`${apiUrl}/api/my_emails/${email_id}/`)
      .then(response => response.json())
      .then(data => {
        setEmailData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [email_id]);

  return (
    <div>
      <h2>Email Detail</h2>
      <p>Recipient: {emailData.recipient}</p>
      <p>Subject: {emailData.subject}</p>
      <p>Body: {emailData.body}</p>
      <p>Sent at: {new Date(emailData.sent_at).toLocaleString()}</p>
      {/* You can display other details as needed */}
    </div>
  );
}

export default EmailDetail;
