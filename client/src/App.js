import "./App.css";
import React, {Fragment} from "react";
import InputToDo from "./components/InputToDo";
import ListTodos from "./components/ListTodos";
function App() {
  return (
    <Fragment>
      <div className="container">
        <InputToDo />
        <ListTodos />
      </div>
    </Fragment>
  );
}

export default App;
