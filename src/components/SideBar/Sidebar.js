import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./sidebar.css";
import { IconContext } from "react-icons";

function Navbar() {
  return (
    <>
      <IconContext.Provider value={{ color: "#200E32" }}>
        {/* <nav className="nav-menu active">
          <ul className="nav-menu-items">
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span id="itemt-title">{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav> */}
        
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
