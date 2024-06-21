// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { DragOnCanvasView } from "./views/DragOnCanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Nav from "./layout/Nav";
import { Provider } from "react-redux";
import storage from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const { store, persistor } = storage();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router>
        <Nav />
        <Route path="/" component={DragOnCanvasView}></Route>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
