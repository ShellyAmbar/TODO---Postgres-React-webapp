import {Routes, Route, Link} from "react-router-dom";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import ToDoDashboard from "../screens/ToDoDashboard";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/TodoDashboard" element={<ToDoDashboard />} />
      </Routes>
    </div>
  );
};

export default Router;
