import React, {useState} from 'react';
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import Helper from "../utility/Helper.js";
import {useNavigate} from "react-router-dom";
import BtnLoader from "./BTNLoader.jsx";

const CreatePlayersForm = () => {
    const [btnloader, setBtnLoader] = useState(false)
    let navigate = useNavigate()

    const playerInfo = async (e) => {
        e.preventDefault()
        let formData = new FormData(e.target)
        let name = formData.get("name")
        let sport = formData.get("sport")
        let nationality = formData.get("nationality")
        let age = formData.get("age")
        setBtnLoader(true)
        let res = await axios.post(`${Helper.BaseApi()}/api/createSportsman`,{
            name:name,
            sport:sport,
            nationality:nationality,
            age:age
        }, Helper.tokenHeader())
        // setBtnLoader(false)
        if (res.data["status"] === "success") {
            toast.success(res.data["message"])
            // navigate("/players")
            setTimeout(() => {
                navigate("/players")
            }, 2000)
        } else {
            toast.error("Request Fail")
        }
    }
    return (
        <div className="container mt-5">
            {/*<Toaster/>*/}
            <div className="row justify-content-center">
                <div className="col-12 card shadow mb-5 p-4">
                    <h1 className="mb-5 text-center">Add Athletes</h1>
                    <form onSubmit={playerInfo}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputName" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputName"
                                name="name"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputSport" className="form-label">
                                Sport
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputSport"
                                name="sport"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputNationality" className="form-label">
                                Nationality
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputNationality"
                                name="nationality"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputAge" className="form-label">
                                Age
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="exampleInputAge"
                                name="age"
                                required
                            />
                        </div>

                        <button disabled={btnloader} type="submit"
                                className="btn submitbtn btn-outline-warning w-100 mt-3">
                            {btnloader ? (<BtnLoader/>) : ("ADD")}
                        </button>
                    </form>
                </div>
            </div>


        </div>
    );
};

export default CreatePlayersForm;