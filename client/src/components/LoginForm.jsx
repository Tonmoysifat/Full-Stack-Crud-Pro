import React, {useRef, useState} from 'react';
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import {Link, useNavigate} from "react-router-dom";
import BtnLoader from "./BTNLoader.jsx";

const LoginForm = () => {
    let [showPass,setShowPass] = useState(false)
    const [btnloader, setBtnLoader] = useState(false)
    const Inputtype = useRef(null)
    const cngEye = useRef(null)
    const cng = ()=>{
        setShowPass(!showPass)
        let a= Inputtype.current;
        let b = cngEye.current;
        if (a && b){
            a.type = showPass?"password":"text";
            b.classList = showPass?"bi bi-eye position-absolute":"bi bi-eye-slash position-absolute"
        }
    }

    let navigate = useNavigate()
    const userInfo = async (e) => {
        e.preventDefault()
        let formData = new FormData(e.target)
        let email = formData.get("email")
        let password = formData.get("password")
        setBtnLoader(true)
        let res = await axios.post("/api/loginUser",{
            email:email,
            password:password
        })
        // setBtnLoader(false)
        if (res.data["status"] === "success") {
            toast.success(res.data["message"])
            localStorage.setItem("token", res.data["token"])
            // window.location.href = "/"
            setTimeout(() => {
                window.location.href = "/"
                // navigate("/profile")
            }, 2000)
        } else {
            toast.error("Wrong Password or Email")
            setBtnLoader(false)
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
                    <h1 className="mb-5 text-center">Login To Your Account!</h1>
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
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                Password
                            </label>
                            <div className="d-flex align-items-center position-relative">
                                <input
                                    type="password"
                                    ref={Inputtype}
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    name="password"
                                    required
                                />
                                <i onClick={cng} ref={cngEye} className="bi bi-eye position-absolute"></i>
                            </div>
                        </div>
                        <div className="mb-3">
                            <Link to="/verifyEmail">Forget Password</Link>
                        </div>

                        <button disabled={btnloader} type="submit"
                                className="btn submitbtn btn-outline-warning w-100 mt-3">
                            {btnloader ? (<BtnLoader/>) : ("Submit")}
                        </button>
                    </form>
                    <h3 className="text-center mb-5">Don't Have Any Account? <Link to="/registration">Get Started</Link>
                    </h3>
                </div>
            </div>


        </div>
    );
};

export default LoginForm;