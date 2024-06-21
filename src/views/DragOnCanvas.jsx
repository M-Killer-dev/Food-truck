// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Canvas from "../components/Canvas/Canvas";
import CanvasItem from "../components/Canvas/CanvasItem";
import CardItem from "../components/CardItem";

const proptypes = {
  /** @type {boolean} whether or not to show fancy live region*/
  hideFancyLiveRegion: PropTypes.bool,
};

const defaultProps = {
  hideFancyLiveRegion: false,
};

export const DragOnCanvasExample = (props) => {
  const dispatch = useDispatch();
  const { update_num, openModal, menu_data } = useSelector((state) => state);

  return (
    <div>
      <Canvas hideFancyLiveRegion={props.hideFancyLiveRegion}>
        <CanvasItem x={2} y={1} minWidth={3} minHeight={3}>
          <div className="logo">
            <img src="logo.png" alt="logo"></img>
          </div>
        </CanvasItem>
        {menu_data
          ? menu_data.map((item, index) => {
              return (
                <CanvasItem
                  key={item.id}
                  test={item}
                  x={item.x ? item.x : 10 * (index + 1)}
                  y={item.y ? item.y : 1 * (index + 1)}
                  width={item.width ? item.width : null}
                  height={item.height ? item.height : null}
                  minWidth={3}
                  minHeight={3}
                  menuId={item.id}
                >
                  <CardItem cardData={item} />
                </CanvasItem>
              );
            })
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
