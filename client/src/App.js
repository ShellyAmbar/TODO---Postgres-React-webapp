import "./App.css";
import React, {Fragment} from "react";
import ToDoDashboard from "./components/screens/ToDoDashboard";
import Login from "./components/screens/Login";
import SignUp from "./components/screens/SignUp";

function App() {
  return (
    <Fragment>
      <SignUp />
      {/* <Login /> */}
      {/* <ToDoDashboard /> */}
    </Fragment>
  );
}

export default App;
