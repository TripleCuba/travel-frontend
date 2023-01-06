import { Route, Routes } from "react-router-dom";
import "./App.css";
import Destinations from "./components/public/Destinations";
import Destination from "./components/public/Destination";
import Town from "./components/public/Town";
import Navbar from "./components/main/Navbar";
import Registration from "./components/accounts/Registration";
import Login from "./components/accounts/Login";
import Home from "./components/main/Home";
import { useEffect } from "react";
import { getUserData } from "./utils/userApiCalls";
import { useDispatch } from "react-redux";
import { login } from "./features/user";
import Hotel from "./components/public/Hotel";
import Reservations from "./components/private/Reservations";
import Success from "./components/public/Success";

function App() {
  const dispatch = useDispatch();
  const setUser = async (token) => {
    const resp = await getUserData(token);
    resp > 201 && localStorage.removeItem("token");

    dispatch(
      login({
        username: resp.username,
        email: resp.email,
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
        <Route path="hotel/:hotel" element={<Hotel />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="register" element={<Registration />} />
        <Route path="login" element={<Login />} />
        <Route path="success" element={<Success />} />
      </Routes>
    </div>
  );
}

export default App;
