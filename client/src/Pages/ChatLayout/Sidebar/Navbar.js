import React, { useState } from "react";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import Button from "react-bootstrap/Button";
import Flash from "./Flash";

function Navbar() {
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}></IconContext.Provider>


      <nav className="nav-menu-active">
        <ul className="nav-menu-items">
          {SidebarData.map((item, index) => {
            return (
              <Button variant="outline-info" style={{margin:"10px",padding:"2px",width:"95%",border:"none"}}>
                <li key={index} className={item.cname}>
                  {item.icon} {item.title}
                </li>
              </Button>
            );
          })}
          <Button className="quiz" variant="info">
            Quiz
          </Button>
          <Flash />
        </ul>
      </nav>
    </>
  );
}

export default Navbar;



