import React, {useEffect, useState} from 'react';
import {Link, NavLink} from "react-router-dom";
import Helper from "../utility/Helper.js";
import axios from "axios";
import Swal from 'sweetalert2'

const AppNavbar = () => {
    let [user, setUser] = useState(null);
    useEffect(() => {
        (async () => {
            await registeredUser()
        })()
    }, []);
    const registeredUser = async () => {
        let res = await axios.get(`${Helper.BaseApi()}/readUser`, Helper.tokenHeader())
        setUser(res.data["UserInformation"][0])
    }
    const logout = () => {
        Swal.fire({
            title: "Are you sure you want to logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor:"#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Logout!"
        }).then( async (result) => {
            if (result.isConfirmed) {
                localStorage.clear()
                window.location.href = "/"
            }
        });
    }
    return (<div className="container">
        <nav className="navbar py-4 bg-dark navbar-expand-lg border-bottom border-body" data-bs-theme="dark">
            <div className="container">
                <NavLink to="/" className="navbar-brand">
                    <i className="bi bi-person-circle me-2 "></i>
                    <h3>greatATHLETES.</h3>
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-lg-center">
                        {Helper.isLogin() ? (<>
                            <li className="nav-item me-2">
                                <NavLink
                                    className={({isActive}) => (isActive ? "nav-link text-warning isActive" : "nav-link text-warning")}
                                    to="/" aria-current="page"
                                    href="#">Home</NavLink>
                            </li>
                            <li className="nav-item me-4">
                                <NavLink
                                    className={({isActive}) => (isActive ? "nav-link text-warning isActive" : "nav-link text-warning")}
                                    aria-current="page"
                                    to="/players">PlayerList</NavLink>
                            </li>
                        </>) : (

                            "")}

                        <li className="nav-item dropdown">
                            {Helper.isLogin() ? (<div className="idnBox shadow">
                                <a style={{
                                    padding: 0
                                }} className="nav-link dropdown-toggle" href="#" role="button"
                                   data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    {user !== null ? user["proImg"] !== null ? (
                                        <img src={user["proImg"]["profilePicUrl"]}
                                             className="img-fluid me-2 profileimg2" alt="Profile"/>) : (
                                        <i className="bi bi-person-circle me-2 "></i>) : ""}

                                    <span>
                                        {user !== null ? (user["firstname"]) : ""}
                                    </span>


                                </a>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item" to="/profile">Profile</NavLink>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li><Link className="dropdown-item" onClick={logout}>Logout</Link></li>

                                </ul>
                            </div>) : (<>
                                <a className="nav-link dropdown-toggle" style={{display:"block"}} href="#" role="button"
                                   data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    <i className="bi bi-person-add"></i>

                                </a>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item"
                                                 to="/registration">Don't Have An Account ?</NavLink>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li><NavLink className="dropdown-item" to="/login">Login</NavLink>
                                    </li>
                                </ul>
                            </>)}

                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>);
};

export default AppNavbar;