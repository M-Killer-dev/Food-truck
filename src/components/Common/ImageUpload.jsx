import React, { useState } from "react";
import ImageIcon from '@material-ui/icons/Image';
// const fetch = require('node-fetch');

const ImageUpload = (props) => {

  // Function to handle file selection
  const handleImageChange = async (e) => {
    const selectedFile = e.target.files[0];

    // Check if file is selected
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        props.setImage(event.target.result); // Set the preview image
      };
      const formData = new FormData();
      formData.append('image', selectedFile);

      try {
        const response = await fetch('http://localhost:8000/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        // props.setImage((data.filename).substring(8));
        alert('Image uploaded successfully');
      } catch (error) {
        console.error('Error uploading image:', error);
      }
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div>
      <input
        id={`file-upload-${props.id}`}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        hidden
      />
      <label htmlFor={`file-upload-${props.id}`} className="custom-file-upload">
        <ImageIcon />
      </label>
    </div>
  );
};

export default ImageUpload;
