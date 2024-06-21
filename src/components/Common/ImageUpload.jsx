import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import ImageIcon from '@material-ui/icons/Image';

const ImageUpload = (props) => {

  // Function to handle file selection
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    // Check if file is selected
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        props.setImage(event.target.result); // Set the preview image
      };
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
