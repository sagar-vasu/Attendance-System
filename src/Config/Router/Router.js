import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {Login,Home} from '../../Containers'
export default function BasicExample() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
      </div>
    </Router>
  );
}