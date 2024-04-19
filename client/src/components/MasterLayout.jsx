import React from 'react';
import AppNavbar from "./AppNavbar.jsx";
import {Toaster} from "react-hot-toast";

const MasterLayout = (props) => {
    return (
        <div>
            <Toaster/>
            <AppNavbar/>
            {props.children}
        </div>
    );
};

export default MasterLayout;