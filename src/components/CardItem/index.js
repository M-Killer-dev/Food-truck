import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import "./CardItem.css";
import ImageUpload from "../Common/ImageUpload.jsx";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import EditIcon from "@material-ui/icons/Edit";
import UnderStars from "./UnderStars.js";
import { open_modal, delete_menu } from "../../redux/action/actions.js";

export default function index({ cardData }) {
  const dispatch = useDispatch();
  const { view_mode } = useSelector((state) => state);

  const splitStr = (str) => {
    if (str === undefined) return [""];
    let index = str.indexOf(" ");

    if (index !== -1) {
      let part1 = str.slice(0, index); // from start to index (excluding index)
      let part2 = str.slice(index + 1); // from index + 1 to end
      return [part1, part2];
    } else {
      return [str];
    }
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    dispatch(delete_menu(id));
  };

  const handleEdit = () => {
    dispatch(open_modal(cardData.id));
  };

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
                <div key={index} className="category-item">
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
        <div
          className={`${
            view_mode ? "hide-action-gruop" : ""
          } action-group`}
        >
          <div className="action-item">
            <ImageUpload cardData={cardData} />
          </div>
          <div className="action-item">
            <EditIcon onClick={handleEdit} />
          </div>
          <div className="action-item">
            <HighlightOffIcon
              onDrop={(e) => e.stopPropagation()}
              onDrag={(e) => e.stopPropagation()}
              onClick={(e) => handleDelete(e, cardData.id)}
            />
          </div>
        </div>
      </div>
      {cardData.image && (
        <div className="card-img">
          <img
            src={cardData.image}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: "300px", padding: "10px" }}
          />
        </div>
      )}
    </div>
  );
}
