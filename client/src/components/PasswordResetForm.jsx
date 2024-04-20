import React, {useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import BtnLoader from "./BTNLoader.jsx";

const PasswordResetForm = () => {
    let [showPass, setShowPass] = useState(false)
    let [showPass2, setShowPass2] = useState(false)
    const [btnloader, setBtnLoader] = useState(false)
    const Inputtype = useRef(null)
    const Inputtype2 = useRef(null)
    const cngEye = useRef(null)
    const cngEye2 = useRef(null)
    const cng = () => {
        setShowPass(!showPass)
        let a = Inputtype.current;
        let b = cngEye.current;
        if (a && b) {
            a.type = showPass ? "password" : "text";
            b.classList = showPass ? "bi bi-eye position-absolute" : "bi bi-eye-slash position-absolute"
        }
    }
    const cng2 = () => {
        setShowPass2(!showPass2)
        let a2 = Inputtype2.current;
        let b2 = cngEye2.current;
        if (a2 && b2) {
            a2.type = showPass2 ? "password" : "text";
            b2.classList = showPass2 ? "bi bi-eye position-absolute" : "bi bi-eye-slash position-absolute"
        }
    }
    let navigate = useNavigate()
    const userInfo = async (e) => {
        e.preventDefault()
        let formData = new FormData(e.target)
        let email = sessionStorage.getItem("email")
        let otp = sessionStorage.getItem("otp")
        let NewPassword = formData.get("NewPassword")
        let ConfirmPassword = formData.get("ConfirmPassword")
        setBtnLoader(true)
        let res = await axios.post(`${Helper.BaseApi()}/api/passwordReset`, {
            email: email,
            otp: otp,
            NewPassword: NewPassword,
            ConfirmPassword: ConfirmPassword,
        })
        // setBtnLoader(false)
        if (res.data["status"] === "success") {
            toast.success(res.data["message"])
            sessionStorage.removeItem("email")
            sessionStorage.removeItem("otp")
            setTimeout(() => {
                navigate("/login")
            }, 2000)
        } else {
            toast.error("Request Fail")
        }
    }
    return (
        <div className="container">
            <Toaster/>
            <Link to="/" className="text-decoration-none">
                <h3 className="py-5 text-white">greatATHLETES.</h3>
            </Link>
            <div className="row justify-content-center">
                <div className="col-lg-6 card shadow mb-5 p-4">
                    <form onSubmit={userInfo} className="mb-5">
                        <div className="mb-3">
                            <label htmlFor="exampleInputnewpass" className="form-label">
                                New Password
                            </label>
                            <div className="d-flex align-items-center position-relative">
                                <input
                                    type="password"
                                    ref={Inputtype}
                                    className="form-control"
                                    id="exampleInputnewpass"
                                    name="NewPassword"
                                    required
                                />
                                <i onClick={cng} ref={cngEye} className="bi bi-eye position-absolute"></i>
                            </div>

                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputconPass" className="form-label">
                                Confirm Password
                            </label>
                            <div className="d-flex align-items-center position-relative">
                                <input
                                    type="password"
                                    ref={Inputtype2}
                                    className="form-control"
                                    id="exampleInputconPass"
                                    name="ConfirmPassword"
                                    required
                                />
                                <i onClick={cng2} ref={cngEye2} className="bi bi-eye position-absolute"></i>
                            </div>

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

export default PasswordResetForm;