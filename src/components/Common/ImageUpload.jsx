import React, { useState } from "react";
import ImageIcon from "@material-ui/icons/Image";
import { update_menu_item } from "../../redux/action/actions.js";
import { useDispatch } from "react-redux";

const ImageUpload = (props) => {
  const dispatch = useDispatch();
  
  // Function to handle file selection
  const handleImageChange = async (e) => {
    const selectedFile = e.target.files[0];

    // Check if file is selected
    if (selectedFile) {
      const reader = new FileReader();
      // reader.onload = (event) => {
      //   props.setImage(event.target.result); // Set the preview image
      // };
      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        const response = await fetch(
          `http://localhost:8000/upload/${props.cardData ? props.cardData.id : -1}`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        dispatch(update_menu_item({
          ...props.cardData,
          image: data.filename
        }))
        // props.setFileName(data.filename);
        alert("Image uploaded successfully");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div>
      <input
        id={`file-upload-${props.cardData.id}`}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        hidden
      />
      <label htmlFor={`file-upload-${props.cardData.id}`} className="custom-file-upload">
        <ImageIcon />
      </label>
    </div>
  );
};

export default ImageUpload;
