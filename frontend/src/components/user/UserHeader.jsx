import React from "react";
import { UserNavbar } from "./UserNavbar";
import { Link, Outlet } from "react-router-dom";
// import AdminLTEFullLogo from "./assets/css/AdminLTEFullLogo";

export const UserHeader = () => {
  return (
    <>
    <UserNavbar></UserNavbar>
    <aside
        className="app-sidebar bg-body-secondary shadow"
        data-bs-theme="dark">
          
        <div className="sidebar-brand">
          <a href="./index.html" className="brand-link">
            
            <img
              src="https://c8.alamy.com/comp/2H7NTHX/urban-logo-template-city-skyline-silhouette-vector-2H7NTHX.jpg"
              // alt="AdminLTE Logo"
              className="brand-image opacity-75 shadow"/>
            
            <span className="brand-text fw-light">Urban Services</span>
          </a>
          
        </div>

        <div className="" data-overlayscrollbars-viewport="scrollbarHidden overflowXHidden overflowYScroll" tabIndex={-1}
          style={{
            marginRight: "-16px",
            marginBottom: "-16px",
            marginLeft: 0,
            top: "-8px",
            right: "auto",
            left: "-8px",
            width: "calc(100% + 16px)",
            padding: 8,
          }}>
          <nav className="mt-2">
            
            <ul
              className="nav sidebar-menu flex-column"
              data-lte-toggle="treeview"
              role="menu"
              data-accordion="false">
              <li className="nav-item menu-open">
                <a href="#" className="nav-link active">
                  <i className="nav-icon bi bi-speedometer" />
                  <p>
                    Dashboard
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/addservice" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>Add Services</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="./index2.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Dashboard v2</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./index3.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Dashboard v3</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="./generate/theme.html" className="nav-link">
                  <i className="nav-icon bi bi-palette" />
                  <p>Theme Generate</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon bi bi-box-seam-fill" />
                  <p>
                    Widgets
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </a>
                
              </li>
            </ul>
            
          </nav>
        </div>
      </aside>
      <main className="app-main">
        <Outlet/>
      </main>
    </>
  );
};
