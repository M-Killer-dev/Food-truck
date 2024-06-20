// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Canvas from '../components/Canvas/Canvas';
import CanvasItem from '../components/Canvas/CanvasItem';
import CardItem from "../components/CardItem"
import { menuData } from "../data/data"


const proptypes = {
  /** @type {boolean} whether or not to show fancy live region*/
  hideFancyLiveRegion: PropTypes.bool
};

const defaultProps = {
  hideFancyLiveRegion: false
};

export const DragOnCanvasExample = (props) => {

  return (
    <div>
      <Canvas hideFancyLiveRegion={props.hideFancyLiveRegion}>
        {
          menuData ? menuData.map((item, index) =>
          (
            <CanvasItem key={item.id} x={2 * (index + 1)} y={1 * (index + 1)} minWidth={3} minHeight={3}>
              <CardItem cardData={item} />
            </CanvasItem>
          )
          ) : null
        }
      </Canvas>
    </div>
  );
}

DragOnCanvasExample.propTypes = proptypes;
DragOnCanvasExample.defaultProps = defaultProps;

export const DragOnCanvasView = () => {
  return (
    <article>
      <DragOnCanvasExample />
    </article>
  );
}

// module.exports = {DragOnCanvasExample, DragOnCanvasView}
