import React, {useState} from 'react';
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import {Link, useNavigate} from "react-router-dom";
import BtnLoader from "./BTNLoader.jsx";
import Helper from '../utility/Helper.js';

const VerifyEmailForm = () => {
    const [btnloader, setBtnLoader] = useState(false)
    let navigate = useNavigate()
    const userInfo = async (e) => {
        e.preventDefault()
        let formData = new FormData(e.target)
        let email = formData.get("email")
        setBtnLoader(true)
        let res = await axios.post(`${Helper.BaseApi()}/createUser`,{
            email:email
        })
        // setBtnLoader(false)
        if (res.data["status"] === "success") {
            toast.success(res.data["message"])
            sessionStorage.setItem("email", res.data["email"])
            // navigate("/verifyotppass")
            setTimeout(() => {
                navigate("/verifyotppass")
            }, 2000)
        } else {
            toast.error("Request Fail")
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
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                name="email"
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

export default VerifyEmailForm;