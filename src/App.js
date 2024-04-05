import Login from "./components/page/auth/login/login";
import Register from "./components/page/auth/register/register";
import { Route, Routes } from "react-router-dom";
import Home from "./components/page/home/home/home";
import Navbar from "./components/layout/navbar";
//page admin
import HomeAdmin from "./components/page/admin/home/home";
//page user
import HomeUser from "./components/page/user/home/home";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/index" element={<indexAdmin />} />
        <Route path="/user/index" element={<HomeUser />} />
      </Routes>
    </div>
  );
}

export default App;
