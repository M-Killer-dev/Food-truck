// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Canvas from '../components/Canvas/Canvas';
import CanvasItem from '../components/Canvas/CanvasItem';
import CardItem from "../components/CardItem"


const proptypes = {
  /** @type {boolean} whether or not to show fancy live region*/
  hideFancyLiveRegion: PropTypes.bool
};

const defaultProps = {
  hideFancyLiveRegion: false
};

export class DragOnCanvasExample extends Component {
  render() {
    return (
      <div>
        <Canvas hideFancyLiveRegion={this.props.hideFancyLiveRegion}>
          <CanvasItem label="Object A" x={2} y={1} minWidth={3} minHeight={3}>
            <CardItem />
          </CanvasItem>
          <CanvasItem label="Object B" x={6} y={12} width={4} height={4} minWidth={3} minHeight={3} />
          <CanvasItem label="Object C" x={6} y={12} width={4} height={4} minWidth={3} minHeight={3} />
          <CanvasItem label="Object D" x={6} y={12} width={4} height={4} minWidth={3} minHeight={3} />
          <CanvasItem label="Object E" x={6} y={12} width={4} height={4} minWidth={3} minHeight={3} />
        </Canvas>
      </div>
    );
  }
}

DragOnCanvasExample.propTypes = proptypes;
DragOnCanvasExample.defaultProps = defaultProps;

export class DragOnCanvasView extends Component {

  render() {
    return (
      <article>
        <DragOnCanvasExample/>
      </article>
    ); 
  }
}

// module.exports = {DragOnCanvasExample, DragOnCanvasView}
