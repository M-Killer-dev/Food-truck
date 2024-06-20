// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Rnd from "react-rnd";
import IconButton from "../Icon/IconButton";
import "./CanvasItem.css";

const proptypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  minWidth: PropTypes.number,
  minHeight: PropTypes.number,
  canvasSize: PropTypes.number,
  canvasHeight: PropTypes.number,
  moveAriaDescribedby: PropTypes.string,
  resizeAriaDescribedby: PropTypes.string,
};

class CanvasItem extends Component {
  constructor(props) {
    super(props);

    this.increaseZIndex = this.increaseZIndex.bind(this);
    this.handleDragStop = this.handleDragStop.bind(this);
    this.handleResizeStop = this.handleResizeStop.bind(this);

    this.defaultPosition = {
      x: this.props.gridInterval * this.props.x,
      y: this.props.gridInterval * this.props.y,
      // width: (this.props.gridInterval * this.props.width),
      // height: (this.props.gridInterval * this.props.height),
      width: this.props.width
        ? this.props.gridInterval * this.props.width
        : "fix-content",
      height: this.props.height
        ? this.props.gridInterval * this.props.height
        : "fix-content",
      minWidth: this.props.gridInterval * this.props.minWidth,
      minHeight: this.props.gridInterval * this.props.minHeight,
    };

    this.state = {
      isMoving: false,
      isResizing: false,
      zIndex: 0,
      x: this.defaultPosition.x,
      y: this.defaultPosition.y,
      width: this.defaultPosition.width,
      height: this.defaultPosition.height,
    };

    // Only allow drag-resize from bottomRight
    this.resizeHandles = {
      bottom: false,
      bottomLeft: false,
      bottomRight: true,
      left: false,
      right: false,
      top: false,
      topLeft: false,
      topRight: false,
    };
  }

  increaseZIndex() {
    this.setState({ zIndex: this.state.zIndex + 1 });
  }

  /** ---- Moving element START ---- **/

  updatePosition(x, y, isCancel) {
    this.rnd.updatePosition({ x: x, y: y });
    this.setState({ x: x, y: y });
    if (isCancel) {
      this.props.updateLiveText(`Move cancelled.`);
    } else {
      this.props.updateLiveText(`
        Row: ${x / this.props.gridInterval + 1},
        Column: ${y / this.props.gridInterval + 1}.
      `);
    }
  }

  moveLeft() {
    if (this.state.x > 0) {
      this.updatePosition(this.state.x - this.props.gridInterval, this.state.y);
    } else {
      this.props.updateLiveText("Reached left edge of canvas");
    }
  }

  moveRight() {
    if (this.state.x + this.state.width < this.props.canvasSize) {
      this.updatePosition(this.state.x + this.props.gridInterval, this.state.y);
    } else {
      this.props.updateLiveText("Reached right edge of canvas");
    }
  }

  moveUp() {
    if (this.state.y > 0) {
      this.updatePosition(this.state.x, this.state.y - this.props.gridInterval);
    } else {
      this.props.updateLiveText("Reached top edge of canvas");
    }
  }

  moveDown() {
    if (this.state.y + this.state.height < this.props.canvasSize) {
      this.updatePosition(this.state.x, this.state.y + this.props.gridInterval);
    } else {
      this.props.updateLiveText("Reached bottom edge of canvas");
    }
  }

  cancelMove() {
    this.updatePosition(this.state.prevX, this.state.prevY, true);
    this.setState({ isMoving: false });
  }

  /* Update state to reflect new position */
  handleDragStop(event, data) {
    this.setState({ x: data.x, y: data.y });
  }

  /** ---- Moving element END ---- **/
  /** ---- Resizing element START ---- **/

  updateSize(width, height, isCancel) {
    this.rnd.updateSize({ width: width, height: height });
    this.setState({ width: width, height: height });
    if (isCancel) {
      this.props.updateLiveText(`Resize cancelled.`);
    } else {
      this.props.updateLiveText(`
        Width: ${width / this.props.gridInterval},
        Height: ${height / this.props.gridInterval}.
      `);
    }
  }

  makeShorter() {
    if (this.state.height > this.props.minHeight) {
      this.updateSize(
        this.state.width,
        this.state.height - this.props.gridInterval
      );
    }
  }

  makeTaller() {
    const newHeight = this.state.height + this.props.gridInterval;
    if (this.state.y + newHeight <= this.props.canvasSize) {
      this.updateSize(
        this.state.width,
        this.state.height + this.props.gridInterval
      );
    }
  }

  makeWider() {
    const newWidth = this.state.width + this.props.gridInterval;
    if (this.state.x + newWidth <= this.props.canvasSize) {
      this.updateSize(
        this.state.width + this.props.gridInterval,
        this.state.height
      );
    }
  }

  makeNarrower() {
    if (this.state.width > this.props.minWidth) {
      this.updateSize(
        this.state.width - this.props.gridInterval,
        this.state.height
      );
    }
  }

  cancelResize() {
    this.updateSize(this.state.prevWidth, this.state.prevHeight, true);
    this.setState({ isResizing: false });
  }

  /** Update state to reflect new size */
  handleResizeStop(event, direction, refToElement, delta) {
    this.setState({
      width: this.state.width + delta.width,
      height: this.state.height + delta.height,
    });
  }

  /** ---- Resizing element END ---- **/

  render() {
    const itemClasses = classNames("dnd-canvas__object", {
      "dnd-canvas__object--moving": this.state.isMoving,
      "dnd-canvas__object--resizing": this.state.isResizing,
    });

    return (
      <Rnd
        ref={(c) => {
          this.rnd = c;
        }}
        className={itemClasses}
        default={this.defaultPosition}
        resizeGrid={[this.props.gridInterval, this.props.gridInterval]}
        dragGrid={[this.props.gridInterval, this.props.gridInterval]}
        minWidth={this.props.minWidth * this.props.gridInterval}
        minHeight={this.props.minHeight * this.props.gridInterval}
        bounds="parent"
        z={this.state.zIndex}
        onDragStart={this.increaseZIndex}
        onDragStop={this.handleDragStop}
        onResizeStop={this.handleResizeStop}
        enableResizing={this.resizeHandles}
      >
        <div className="box"></div>
        {this.props.children}
      </Rnd>
    );
  }
}

CanvasItem.propTypes = proptypes;

export default CanvasItem;
