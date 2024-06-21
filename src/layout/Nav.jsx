// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormGroup,
  Input,
  Label,
  Button,
  Form,
  Row,
  Col,
} from "reactstrap";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import {
  add_menu_item,
  update_menu_item,
  open_modal,
  close_modal,
} from "../redux/action/actions.js";

const NavLayout = () => {
  const dispatch = useDispatch();
  const { openModal, id, menu_data } = useSelector((state) => state);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submenu, setSubmenu] = useState([]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleOpen = () => {
    dispatch(open_modal());
  };

  const toggle = () => {
    dispatch(close_modal());
  };

  const handleAdd = () => {
    submenu.push({ name: "", price1: "", price2: "" });
    setSubmenu([...submenu]);
  };

  const handleSave = (event) => {
    event.preventDefault();
    let cardsData = menu_data;
    if (!id) {
      dispatch(
        add_menu_item({
          id: Date(),
          title: title,
          subtitle: description,
          submenu,
          x: 500,
          y: 500,
        })
      );
    } else {
      let index = _.findIndex(cardsData, { id: id });
      dispatch(
        update_menu_item({
          id: cardsData[index].id,
          title: title,
          subtitle: description,
          submenu,
        })
      );
    }
    setTitle("");
    setDescription("");
    dispatch(close_modal());
  };

  const handleCancel = () => {
    dispatch(close_modal());
  };

  const handleSubmenuChange = (e, index) => {
    let tmp = [...submenu];
    tmp[index] = { ...tmp[index], id: index + 1 };
    if (e.target.name.indexOf("name") === 0) tmp[index].name = e.target.value;
    else if (e.target.name.indexOf("price1") === 0)
      tmp[index].price1 = e.target.value;
    else if (e.target.name.indexOf("price2") === 0)
      tmp[index].price2 = e.target.value;

    setSubmenu(tmp);
  };

  const handleSaveToFile = () => {
    
  }

  useEffect(() => {
    if (id) {
      let index = _.findIndex(menu_data, { id: id });
      setTitle(menu_data[index].title ? menu_data[index].title : "");
      setDescription(
        menu_data[index].subtitle ? menu_data[index].subtitle : ""
      );
      setSubmenu(menu_data[index].submenu);
    } else {
      setSubmenu([]);
    }
  }, [id]);

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-sm bg-light">
        <ul className="navbar-nav">
          <button className="btn btn-success" onClick={handleOpen}>
            Add
          </button>
          <button className="btn btn-info" onClick={handleSaveToFile}>Save</button>
        </ul>
      </nav>
      <Modal isOpen={openModal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add New Menu</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="Title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Title"
                type="text"
                value={title}
                onChange={handleTitleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Description">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="Description"
                type="text"
                value={description}
                onChange={handleDescriptionChange}
              />
            </FormGroup>
            {submenu.map((item, index) => (
              <Row key={index}>
                <Col md={6}>
                  <FormGroup>
                    <Label for={`name-${index}`}>name</Label>
                    <Input
                      id={`name-${index}`}
                      name={`name-${index}`}
                      placeholder="name"
                      type="text"
                      value={submenu[index] ? submenu[index].name : ""}
                      onChange={(e) => handleSubmenuChange(e, index)}
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="price1">price1</Label>
                    <Input
                      id={`price1-${index}`}
                      name={`price1-${index}`}
                      placeholder="price1"
                      value={submenu[index] ? submenu[index].price1 : ""}
                      onChange={(e) => handleSubmenuChange(e, index)}
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="price2">price2</Label>
                    <Input
                      id={`price2-${index}`}
                      name={`price2-${index}`}
                      placeholder="price2"
                      type="text"
                      value={submenu[index] ? submenu[index].price2 : ""}
                      onChange={(e) => handleSubmenuChange(e, index)}
                    />
                  </FormGroup>
                </Col>
              </Row>
            ))}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={handleAdd}>
            Add Submenu
          </Button>{" "}
          <Button color="success" type="text" onClick={handleSave}>
            Save Menu
          </Button>{" "}
          <Button color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default NavLayout;
