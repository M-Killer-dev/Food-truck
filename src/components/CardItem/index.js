import React, { useState, useEffect } from "react";
import "./CardItem.css";
import ImageUpload from "../Common/ImageUpload.jsx";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import EditIcon from "@material-ui/icons/Edit";
import UnderStars from "./UnderStars.js";

export default function index({ cardData }) {
  const [image, setImage] = useState();
  const [inputVals, setInputVals] = useState([]);

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

  // const handleChange = (e, index) => {
  //   inputVals[index].name = e.target.value;
  //   setInputVals([...inputVals]);
  // };

  const handleDelete = () => {
    console.log("menu delete");
  };

  const handleEdit = () => {
    console.log("edit");
  };

  useEffect(() => {
    setInputVals(cardData.submenu);
  }, []);

  return (
    <div
      className={`container p-2 card-container card-${cardData.id}`}
      style={cardData.sold ? { borderBottom: "3px solid #f15553" } : null}
    >
      <div className="card-group-div d-flex flex-column">
        <div className="header-title">
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
                  <div className="text-with-dots">
                    {/* <input
                        type="text"
                        value={
                          inputVals && inputVals[index] && inputVals[index].name
                        }
                        onChange={(e) => handleChange(e, index)}
                        onFocus = {(e) => e.stopPropagation()}
                        onClick = {(e) => e.stopPropagation()}
                      ></input> */}
                    <p>{item.name}</p>
                    <UnderStars />
                  </div>
                  <div className="d-flex align-items-center">
                    <span>{`$${item.price1}`}</span>
                    <span>{item.price2 ? `/$${item.price2}` : ""}</span>
                  </div>
                </div>
              ))
            : null}
        </div>
        <div className="action-group d-flex justify-content-center">
          <div className="action-item">
            <ImageUpload id={cardData.id} setImage={setImage} />
          </div>
          <div className="action-item">
            <EditIcon onClick={handleEdit} />
          </div>
          <div className="action-item">
            <HighlightOffIcon onClick={handleDelete} />
          </div>
        </div>
      </div>
      {image && (
        <div className="card-img">
          <img
            src={image}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: "300px", padding: "10px" }}
          />
        </div>
      )}
    </div>
  );
}
