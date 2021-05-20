import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./sidebar.css";
import { IconContext } from "react-icons";
import { useHistory, useLocation } from "react-router-dom";

function Sidebar() {
  const history = useHistory();
  const location = useLocation();

  return (
    <>
      <div className="sidebar">
        <IconContext.Provider value={{ color: "#200E32" }}>
          <ul className="sidebar-list">
            {SidebarData.map((item, index) => {
              return (
                <li
                  key={index}
                  className="sidebar-row-list"
                  id={
                    location.pathname === item.path
                      ? "sidebar-active"
                      : "sidebar-inactive"
                  }
                  onClick={() => {
                    history.push(item.path);
                  }}
                >
                  <div id="sidebar-icon" className="d-flex justify-content-center align-items-center"> {item.icon} </div>

                  <div id="sidebar-title" className="ml-3">
                    {item.title}
                  </div>
                </li>
              );
            })}
          </ul>
        </IconContext.Provider>
      </div>
    </>
  );
}

export default Sidebar;
