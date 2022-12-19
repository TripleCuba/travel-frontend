import { Route, Routes } from "react-router-dom";
import "./App.css";
import Destinations from "./components/Destinations";
import Destination from "./components/Destination";
import Town from "./components/Town";
import Navbar from "./components/Navbar";
import Registration from "./components/accounts/Registration";
import Login from "./components/accounts/Login";
import Home from "./components/Home";
import { useEffect } from "react";
import { getUserData } from "./utils/userApiCalls";
import { useDispatch } from "react-redux";
import { login } from "./features/user";

function App() {
  const dispatch = useDispatch();
  const setUser = async (token) => {
    const user = await getUserData(token);
    dispatch(
      login({
        username: user.username,
        email: user.email,
        isAuthenticated: true,
      })
    );
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    token && setUser(token);
  }, []);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="destinations" element={<Destinations />} />
        <Route path="destinations/:destination" element={<Destination />} />
        <Route path="town/:town" element={<Town />} />
        <Route path="register" element={<Registration />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
