import React, {useEffect, useState} from 'react';
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import Helper from "../utility/Helper.js";
import {useNavigate} from "react-router-dom";
import BtnLoader from "./BTNLoader.jsx";

const UpdateUserForm = () => {
    let navigate = useNavigate()
    const [btnloader, setBtnLoader] = useState(false)
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
    const userInfo = async (e) => {
        e.preventDefault()
        let formData = new FormData(e.target)
        let firstname = formData.get("firstname")
        let lastname = formData.get("lastname")
        let mobile = formData.get("mobile")
        // let password = formData.get("password")
        setBtnLoader(true)
        let res = await axios.post(`${Helper.BaseApi()}/updateUser`, {
            // email: user !== null ? (user["email"]) : "",
            firstname: firstname,
            lastname: lastname,
            mobile: mobile,
            // password:password
        }, Helper.tokenHeader())
        if (res.data["status"] === "success") {
            toast.success(res.data["message"])
            setTimeout(() => {
                navigate("/profile")
            }, 2000)
        } else {
            toast.error("Request Fail")
        }
    }
    return (
        <div className="container mt-5">
            <Toaster/>
            <h1 className="acTxt">Make Changes</h1>
            <form onSubmit={userInfo} className="ms-3 my-5">
                <div className="mb-3">
                    <label htmlFor="exampleInputFname" className="form-label">
                        First Name
                    </label>
                    <input
                        defaultValue={user !== null ? (user["firstname"]) : ""}
                        type="text"
                        className="form-control"
                        id="exampleInputFname"
                        name="firstname"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputLname" className="form-label">
                        Last Name
                    </label>
                    <input
                        defaultValue={user !== null ? (user["lastname"]) : ""}
                        type="text"
                        className="form-control"
                        id="exampleInputLname"
                        name="lastname"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputMobile" className="form-label">
                        Mobile Number
                    </label>
                    <input
                        defaultValue={user !== null ? (user["mobile"]) : ""}
                        type="text"
                        className="form-control"
                        id="exampleInputMobile"
                        name="mobile"
                        required
                    />
                </div>

                <button disabled={btnloader} type="submit"
                        className="btn submitbtn btn-outline-warning mt-3">
                    {btnloader ? (<BtnLoader/>) : ("Save Changes")}
                </button>
            </form>

        </div>
    );
};
export default UpdateUserForm;