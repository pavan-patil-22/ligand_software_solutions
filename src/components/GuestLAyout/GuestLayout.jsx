import React from "react";
import { Outlet } from "react-router-dom";
import GuestHeader from "./GuestHeader";
import GuestFooter from "./GuestFooter";
const GuestLayout = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 100 }}>
        <GuestHeader />
      </div>
      {/* Main Content (Outlet) */}
      <div style={{ flex: 1}}>
        <Outlet />
      </div>
      {/* Fixed Footer */}
      <div
        style={{
          position: "float",
          bottom: 0,
          width: "100%",
          zIndex: 100,
          backgroundColor: "black",
          color: "white",
        }}
      >
        <GuestFooter />
      </div>
    </div>
  );
};
export default GuestLayout;
