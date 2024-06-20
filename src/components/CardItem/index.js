import React, { useState } from "react";
import "./CardItem.css";
import ImageUpload from "../Common/ImageUpload.jsx";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

export default function index({ cardData }) {
  const [image, setImage] = useState();

  const splitStr = (str) => {
    let index = str.indexOf(" ");

    if (index !== -1) {
      let part1 = str.slice(0, index); // from start to index (excluding index)
      let part2 = str.slice(index + 1); // from index + 1 to end
      return [part1, part2];
    } else {
      return [str];
    }
  };

  const handleDelete = () => {
    console.log("menu delete");
  };

  return (
    <div className={`container p-2 d-flex card-container card-${cardData.id}`}>
      <div className="d-flex flex-column">
        <div className="header-title d-flex justify-content-center">
          <span className="title1">
            {cardData && splitStr(cardData.title)[0]}
          </span>
          <span className="title2">
            {cardData && splitStr(cardData.title)[1]}
          </span>
        </div>
        <div className="subtitle-container">
          {cardData.subtitle ? (
            <div className="subtitle d-flex justify-content-center">
              {`(${cardData.subtitle})`}
            </div>
          ) : null}
        </div>
        <div className="category-item-list d-flex flex-column justify-content-center">
          {cardData && cardData.submenu
            ? cardData.submenu.map((item, index) => (
                <div key={item.id} className="category-item">
                  <div className="category-container">
                    <p>{item.name}</p>
                    <div>
                      <span>{`$${item.price1}`}</span>
                      <span>{item.price2 ? `/$${item.price2}` : ""}</span>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
        <div className="d-flex justify-content-end">
          <ImageUpload id={cardData.id} setImage={setImage} />
          <div>
            <HighlightOffIcon onClick={handleDelete} />
          </div>
        </div>
      </div>
      <div>
        {image && (
          <div>
            <img
              src={image}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: "300px", padding: "10px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
