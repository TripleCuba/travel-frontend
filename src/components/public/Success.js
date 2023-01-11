import React from "react";
import { useLocation } from "react-router";

const Success = () => {
  const { state } = useLocation();
  console.log(state);
  return (
    <div>
      <h1>Success</h1>
      <h3>{state}</h3>
    </div>
  );
};

export default Success;
