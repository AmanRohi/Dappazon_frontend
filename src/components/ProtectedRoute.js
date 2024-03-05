import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function ProtectedRoute({ Children }) {
  const user = useSelector((state) => state.user);
  console.log("Protected", user);
  if (user) return Children;
  else return <Navigate to="/signUp" />;
}

export default ProtectedRoute;
