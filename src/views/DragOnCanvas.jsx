// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Canvas from "../components/Canvas/Canvas";
import CanvasItem from "../components/Canvas/CanvasItem";
import CardItem from "../components/CardItem";
import { menuData } from "../data/data";

const proptypes = {
  /** @type {boolean} whether or not to show fancy live region*/
  hideFancyLiveRegion: PropTypes.bool,
};

const defaultProps = {
  hideFancyLiveRegion: false,
};

export const DragOnCanvasExample = (props) => {
  const update_num  = useSelector((state) => state.update_num);
  const [cardsData, setCardsData] = useState([]);

  console.log("here", update_num)

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("data"));
    if (data && data.length) setCardsData(data);
    else setCardsData(menuData);
  }, []);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("data"));
    
    console.log("Here", data);
    if (data && data.length) setCardsData(data);
  }, [update_num]);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(cardsData));
  }, [cardsData]);

  return (
    <div>
      <Canvas hideFancyLiveRegion={props.hideFancyLiveRegion}>
        <CanvasItem x={2} y={1} minWidth={3} minHeight={3}>
          <div className="logo">
            <img src="logo.png" alt="logo"></img>
          </div>
        </CanvasItem>
        {cardsData
          ? cardsData.map((item, index) => (
              <CanvasItem
                key={item.id}
                test={item.x}
                x={item.x ? item.x : 10 * (index + 1)}
                y={item.y ? item.y : 1 * (index + 1)}
                width={item.width ? item.width : null}
                height={item.height ? item.height : null}
                minWidth={3}
                minHeight={3}
                menuId={item.id}
                setCardsData={setCardsData}
              >
                <CardItem cardData={item} />
              </CanvasItem>
            ))
          : null}
      </Canvas>
    </div>
  );
};

DragOnCanvasExample.propTypes = proptypes;
DragOnCanvasExample.defaultProps = defaultProps;

export const DragOnCanvasView = () => {
  return (
    <article>
      <DragOnCanvasExample />
    </article>
  );
};

// module.exports = {DragOnCanvasExample, DragOnCanvasView}
