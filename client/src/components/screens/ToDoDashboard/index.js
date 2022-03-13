import "./ToDoDashboard.css";
import React, {Fragment} from "react";
import InputToDo from "../../InputToDo";
import ListTodos from "../../ListTodos";

function ToDoDashboard() {
  return (
    <Fragment>
      <div className="container">
        <InputToDo />
        <ListTodos />
      </div>
    </Fragment>
  );
}

export default ToDoDashboard;
