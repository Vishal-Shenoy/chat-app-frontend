import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./screen/register/Register";
import Login from "./screen/login/Login";
import Home from "./screen/home/Home";
import Protected from "./utils/protected";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Protected />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
