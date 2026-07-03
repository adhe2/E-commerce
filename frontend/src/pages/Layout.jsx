import Navbar from "../components/Navbar.jsx";
import React from "react";

const Layoat = ({ children }) => {
  return (
    <React.Fragment>
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6 bg-slate-100 h-full">
          <main className=" ">{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layoat;
