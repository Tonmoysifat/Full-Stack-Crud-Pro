import React, {useState} from 'react';
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import {Link, useLocation, useNavigate} from "react-router-dom";
import BtnLoader from "./BTNLoader.jsx";
import Helper from '../utility/Helper.js';

const VerifyOtpForm = () => {
    const [btnloader, setBtnLoader] = useState(false)
    let navigate = useNavigate()
    const data = useLocation()
    console.log(data.state)
    const userInfo = async (e) => {
        e.preventDefault()
        let formData = new FormData(e.target)
        if (data.state===`${Helper.BaseApi()}/verifyEmail`){
            let otp = formData.get("otp")
            let email = sessionStorage.getItem("email")
            let target = sessionStorage.getItem("target")
            setBtnLoader(true)
            let res = await axios.post(`${Helper.BaseApi()}/verifyOtp`,{
                otp:otp,
                email:email,
                target:target
            })
            if (res.data["status"] === "success") {
                toast.success(res.data["message"])
                sessionStorage.setItem("otp", res.data["otp"])
                setTimeout(() => {
                    navigate("/passreset")
                }, 2000)
            } else {
                toast.error("Request Fail")
            }
        }
        else {
            let otp = formData.get("otp")
            let email = sessionStorage.getItem("email")
            let firstname = sessionStorage.getItem("firstname")
            let lastname = sessionStorage.getItem("lastname")
            let mobile = sessionStorage.getItem("mobile")
            let password = sessionStorage.getItem("password")
            let target = sessionStorage.getItem("target")
            setBtnLoader(true)
            let res = await axios.post(`${Helper.BaseApi()}/verifyOtp`,{
                otp:otp,
                email:email,
                firstname:firstname,
                lastname:lastname,
                mobile:mobile,
                password:password,
                target:target
            })
            // setBtnLoader(false)
            if (res.data["status"] === "success") {
                toast.success(res.data["message"])
                sessionStorage.removeItem("email")
                sessionStorage.removeItem("firstname")
                sessionStorage.removeItem("lastname")
                sessionStorage.removeItem("mobile")
                sessionStorage.removeItem("password")
                sessionStorage.removeItem("target")
                localStorage.setItem("token", res.data["token"])
                // window.location.href = "/"
                setTimeout(() => {
                    // navigate("/createplayers")
                    window.location.href = "/"
                }, 2000)
            } else {
                toast.error("Request Fail")
            }
        }

    }
    return (
        <div className="container">
            <Toaster/>
            <Link to="/" className="text-decoration-none">
                <h3  className="py-5 text-white">greatATHLETES.</h3>
            </Link>
            <div className="row justify-content-center">
                <div className="col-lg-6 card shadow mb-5 p-4">
                    <form onSubmit={userInfo} className="mb-5">
                        <div className="mb-3">
                            <label htmlFor="exampleInputOtp" className="form-label">
                                Verification Code
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputOtp"
                                name="otp"
                                required
                            />
                        </div>

                        <button disabled={btnloader} type="submit"
                                className="btn submitbtn btn-outline-warning w-100 mt-3">
                            {btnloader ? (<BtnLoader/>) : ("Submit")}
                        </button>
                    </form>
                </div>
            </div>


        </div>
    );
};

export default VerifyOtpForm;