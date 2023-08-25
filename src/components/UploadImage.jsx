import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';

import { apiUrl } from '../constants';

function UploadImage({ setImageName, imageName: initImageName }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSrcUrl, setImageSrcUrl] = useState('');
  const [isUploadImageButtonClicked, setUploadImageButtonClicked] = useState(false);

  useEffect(() => {
    const initImageSrcUrl = initImageName ? `${apiUrl}/api/images/${initImageName}` : '';
    setImageSrcUrl(initImageSrcUrl);
  }, [initImageName]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageName('');
    setSelectedFile(file);
    setImageSrcUrl('');
    setUploadImageButtonClicked(false);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);

      fetch(`${apiUrl}/api/product/image_upload/`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log('Image uploaded successfully:', data);
          const imageUrl = data.image;
          const arr = imageUrl.split('/');
          const imageName = arr[arr.length - 1];
          setImageName(imageName);
          setImageSrcUrl(`${apiUrl}/api/images/${imageName}`);
          setUploadImageButtonClicked(true);
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
        });
    }
  };

  return (
    <Box>
      { imageSrcUrl && (
        <Box sx={{ pb: 1 }}>
          <img src={imageSrcUrl}  
            height='300'
            alt={imageSrcUrl}
          />
        </Box>
      )}

      <Box sx={{ mb: 3, display: 'flex', flexDirection: 'row' }}>
        <Box>
          <Input type="file" onChange={handleFileChange} />
        </Box>

        { selectedFile && (
          <Box sx={{ pl: 2}}>
            <Button variant="contained" onClick={handleUpload}>
              UPLOAD IMAGE
            </Button>
          </Box>
        )}

        { selectedFile && !isUploadImageButtonClicked && (
          <Box sx={{ pl: 1, pt: 1 }}>
            <Typography variant="caption" sx={{ color: 'red' }}>
              Please click "UPLOAD IMAGE"
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default UploadImage;
