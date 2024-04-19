import React, {useRef, useState} from 'react';
import {Link, NavLink} from "react-router-dom";
import MasterLayout from "../components/MasterLayout.jsx";
import Helper from "../utility/Helper.js";
import BtnLoader from "../components/BTNLoader.jsx";

const HomePage = () => {
    return (
        <MasterLayout>
            <div className="container">
                <h1 className="mt-5 hpBannerText lh-lg">Welcome to our Sportsman Fan App! <br/> Add your favorite
                    athletes name, sport, age, and
                    nationality to personalize your collection.<br/> Get started now and showcase your admiration for
                    the
                    greatest talents in the game!</h1> <Link to={Helper.isLogin()?"/createplayers":"/registration"}
                                                             className="btn btn-outline-warning mb-5">Add Now</Link>
            </div>
        </MasterLayout>
    );
};

export default HomePage;