import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user.value);
  return (
    <div>
      <button onClick={() => console.log(user)}>Get user</button>
    </div>
  );
};

export default Home;
