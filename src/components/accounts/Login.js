import React from "react";
import { useState } from "react";
import { getUserData, sendLoginForm } from "../../utils/userApiCalls";
import { useDispatch } from "react-redux";
import { login } from "../../features/user";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    token && navigate("/");
  });
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const getFormData = (e) => {
    let newFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(newFormData);
  };
  const submitData = async (e) => {
    e.preventDefault();
    const resp = await sendLoginForm(formData);
    console.log(resp);
    localStorage.setItem("token", resp.token);
    const user = await getUserData(resp.token);
    dispatch(
      login({
        username: user.username,
        email: user.email,
        isAuthenticated: true,
      })
    );
    navigate("/");
  };
  return (
    <div>
      <h1>Login</h1>
      <form className="accountsForm" method="post">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          required
          value={formData.username}
          onChange={(e) => getFormData(e)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          required
          value={formData.password}
          onChange={(e) => getFormData(e)}
        />
        <input type="submit" value="Login!" onClick={(e) => submitData(e)} />
      </form>
      <button onClick={() => console.log(formData)}>test</button>
    </div>
  );
};

export default Login;
