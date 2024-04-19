import React from 'react';
import {NavLink} from "react-router-dom";

const SideNavbar = () => {
    const logout = () => {
        localStorage.clear()
        window.location.href = "/"
    }
    return (
        <div>
            <nav className="navbar sideNav navbar-expand-lg bg-body-tertiary fixed-top ">
                <div className="container">
                    <NavLink to="/" className="navbar-brand">
                        <i className="bi bi-person-circle me-2 "></i>
                        <h3>greatATHLETES.</h3>
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar"
                        aria-controls="offcanvasNavbar"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div
                        className="offcanvas offcanvas-end offCW"
                        tabIndex={-1}
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                    >
                        <div className="offcanvas-header">
                            <NavLink to="/" className="navbar-brand">
                                <i className="bi bi-person-circle me-2 "></i>
                                <h3>greatATHLETES.</h3>
                            </NavLink>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            />
                        </div>
                        <div className="offcanvas-body">
                            <ul className="mt-5 nav flex-column">
                                <li className="nav-item mb-3">
                                    <NavLink className={({isActive})=>
                                        (isActive?"nav-link text-warning isActive":"nav-link text-warning")}
                                             to="/profile">Profile
                                        <hr/>
                                    </NavLink>

                                </li>

                                <li className="nav-item mb-3">
                                    <NavLink className={({isActive})=>
                                        (isActive?"nav-link text-warning isActive":"nav-link text-warning")}
                                             to="/updateUser">Settings
                                        <hr/>
                                    </NavLink>

                                </li>

                                <li className="nav-item mb-3">
                                    <NavLink className="nav-link logOUT text-warning"
                                             onClick={logout}>Logout
                                        <hr/>
                                    </NavLink>

                                </li>

                            </ul>

                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default SideNavbar;