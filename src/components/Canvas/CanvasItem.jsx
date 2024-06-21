// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import _ from "lodash";
import PropTypes from "prop-types";
import Rnd from "react-rnd";
import "./CanvasItem.css";
import { update_menu_item } from "../../redux/action/actions";

const proptypes = {
  x: PropTypes.any,
  y: PropTypes.any,
  width: PropTypes.any,
  height: PropTypes.any,
  minWidth: PropTypes.number,
  minHeight: PropTypes.number,
  canvasSize: PropTypes.number,
  canvasHeight: PropTypes.number,
  moveAriaDescribedby: PropTypes.string,
  resizeAriaDescribedby: PropTypes.string,
  menuId: PropTypes.any,
};

class CanvasItem extends Component {
  constructor(props) {
    super(props);

    this.increaseZIndex = this.increaseZIndex.bind(this);
    this.handleDragStop = this.handleDragStop.bind(this);
    this.handleResizeStop = this.handleResizeStop.bind(this);

    this.defaultPosition = {
      x: this.props.x,
      y: this.props.y,
      // width: (this.props.gridInterval * this.props.width),
      // height: (this.props.gridInterval * this.props.height),
      width: this.props.width ? this.props.width : "fix-content",
      height: this.props.height ? this.props.height : "fix-content",
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
    let cardsData = this.props.menu_data;
    let index = _.findIndex(cardsData, { id: this.props.menuId });
    if (this.props.openModal)
      this.props.update_menu_item({
        ...cardsData[index],
        x: data.x,
        y: data.y,
      });
  }

  /** Update state to reflect new size */
  handleResizeStop(event, direction, refToElement, delta) {
    this.setState({
      width: this.state.width + delta.width,
      height: this.state.height + delta.height,
    });

    let cardWidth = document.getElementsByClassName(
      `card-${this.props.menuId}`
    )[0].clientWidth;
    let cardHeight = document.getElementsByClassName(
      `card-${this.props.menuId}`
    )[0].clientHeight;

    let cardsData = this.props.menu_data;
    let index = _.findIndex(cardsData, { id: this.props.menuId });

    if (this.props.openModal)
      this.props.update_menu_item({
        ...cardsData[index],
        width: cardWidth,
        height: cardHeight,
      });
  }

  /** ---- Resizing element END ---- **/

  render() {
    const itemClasses = classNames(
      "dnd-canvas__object",
      {
        "dnd-canvas__object--moving": this.state.isMoving,
        "dnd-canvas__object--resizing": this.state.isResizing,
      },
      "conic"
    );

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
        {this.props.children}
      </Rnd>
    );
  }
}

CanvasItem.propTypes = proptypes;

const mapStateToProps = (state) => ({
  menu_data: state.menu_data,
  openModal: state.openModal,
});

// Map dispatch actions to component props
const mapDispatchToProps = {
  update_menu_item,
};

export default connect(mapStateToProps, mapDispatchToProps)(CanvasItem);
