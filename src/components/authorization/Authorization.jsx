// // src/components/authorization/Authorization.js
// import React from "react";
// import { Navigate } from "react-router-dom";

// const Authorization = ({ children, allowedRoles }) => {
//   const role = localStorage.getItem("role") || sessionStorage.getItem("role");

//   if (!role || !allowedRoles.includes(role)) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default Authorization;
