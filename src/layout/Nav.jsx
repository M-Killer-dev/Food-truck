// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
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
import _ from "lodash"

const NavLayout = () => {
  const [open, setOpen] = useState(false);
  const [submenuList, setSubmenuList] = useState([1]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [submenu, setSubmenu] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target);
    setFormData({ ...formData, [name]: value });
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const toggle = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    submenuList.push(1);
    setSubmenuList([...submenuList]);
  };

  const handleSave = (event) => {
    event.preventDefault();
    let cardsData = JSON.parse(localStorage.getItem("data"));
    for(let i = 0; i < cardsData.length; i++) {
        cardsData[i].id = _.uniqueId();
    }
    cardsData.push({
      id: _.uniqueId(),
      title: formData.title,
      subtitle: formData.description,
      submenu,
    });
    localStorage.setItem("data", JSON.stringify(cardsData));
    // addMenu(formData, submenu)
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
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

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-sm bg-light">
        <ul className="navbar-nav">
          <button className="btn btn-success" onClick={handleOpen}>
            Add
          </button>
          <button className="btn btn-info">Save</button>
        </ul>
      </nav>
      <Modal isOpen={open} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add New Menu</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="Title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Title"
                type="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Description">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="Description"
                type="Description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </FormGroup>
            {submenuList.map((item, index) => (
              <Row key={index}>
                <Col md={6}>
                  <FormGroup>
                    <Label for="name">name</Label>
                    <Input
                      id={`name-${index}`}
                      name={`name-${index}`}
                      placeholder="name"
                      type="name"
                      value={submenu[index] && submenu[index].name}
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
                      value={submenu[index] && submenu[index].price1}
                      onChange={(e) => handleSubmenuChange(e, index)}
                      type="price1"
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
                      type="price2"
                      value={submenu[index] && submenu[index].price2}
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
          <Button color="success" type="submit" onClick={handleSave}>
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
