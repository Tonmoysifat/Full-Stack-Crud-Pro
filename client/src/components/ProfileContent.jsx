import React, {useEffect, useState} from 'react';
import axios from "axios";
import Helper from "../utility/Helper.js";
import {Link} from "react-router-dom";
import FullScreenLoader from "./FullScreenLoader.jsx";

const ProfileContent = () => {
    let [user, setUser] = useState(null);
    // const [loader, setLoader] = useState(true);
    useEffect(() => {
        (async () => {
            await registratedUser()
        })()
    }, []);

    const registratedUser = async () => {
        let res = await axios.get(`/api/readUser`, Helper.tokenHeader())
        setUser(res.data["UserInformation"])
    }
    return (
        <div className="mt-5">
            <h1 className="acTxt">Account</h1>
            {user ? user.map((item, i) => {
                return (
                    <div key={i} className="ms-3 my-5">
                        <div>
                            <h3>First Name</h3>
                            <p>{item.firstname}</p>
                        </div>
                        <hr/>
                        <div>
                            <h3>Last Name</h3>
                            <p>{item.lastname}</p>
                        </div>
                        <hr/>
                        <div>
                            <h3>Email</h3>
                            <p>{item.email}</p>
                        </div>
                        <hr/>
                        <div>
                            <h3>Mobile</h3>
                            <p>{item.mobile}</p>
                        </div>
                        <hr/>
                    </div>
                )
            }) : (<FullScreenLoader/>)}
        </div>
    );
};

export default ProfileContent;