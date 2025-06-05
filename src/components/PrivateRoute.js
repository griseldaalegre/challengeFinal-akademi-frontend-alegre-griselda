import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ user, allowedRoles }) => {
  if (!user) {

    return <Navigate to="/login" />;
   
  }
  console.log(user.role)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/access-denied" />;
  }
  return <Outlet />;
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(PrivateRoute);
