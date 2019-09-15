import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {Login,Home,AddClass, EditClass,Attendance} from '../../Containers'
export default function BasicExample() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Login} />
        <Route  path="/home" component={Home} />
        <Route  path="/add-class" component={AddClass} />
        <Route  path="/edit-class" component={EditClass} />
        <Route  path="/attendance" component={Attendance} />
      </div>
    </Router>
  );
}