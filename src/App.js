import Login from "./components/page/auth/login/login";
import Register from "./components/page/auth/register/register";
import { Route, Routes } from "react-router-dom";
import Home from "./components/page/home/home/home";
import Navbar from "./components/layout/navbar";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
