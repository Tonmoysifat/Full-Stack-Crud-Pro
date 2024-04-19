import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Helper from "../utility/Helper.js";
import BtnLoader from "./BTNLoader.jsx";


const UpdatePlayersForm = () => {
    let navigate = useNavigate()
    const [btnloader, setBtnLoader] = useState(false)
    let [player, setPlayer] = useState(null);
    let {id} = useParams()
    useEffect(() => {
        (async () => {
            await CreatedPlayers(id)
        })()
    }, []);

    const CreatedPlayers = async (id) => {
        let res = await axios.get(`/api/readBYId/${id}`, Helper.tokenHeader())
        setPlayer(res.data["playerData"][0])
    }
    const playerInfo = async (e) => {
        e.preventDefault()
        let formData = new FormData(e.target)
        let name = formData.get("name")
        let sport = formData.get("sport")
        let nationality = formData.get("nationality")
        let age = formData.get("age")
        setBtnLoader(true)
        let res = await axios.post(`/api/updateSportsman/${id}`, {
            name: name,
            sport: sport,
            nationality: nationality,
            age: age
        })
        if (res.data["status"] === "success") {
            toast.success(res.data["message"])
            setTimeout(() => {
                navigate("/players")
            }, 2000)
        } else {
            toast.error("Request Fail")
        }
    }
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 card shadow mb-5 p-4">
                    <h1 className="mb-5 text-center">Change Athletes Information</h1>
                    <form onSubmit={playerInfo}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputName" className="form-label">
                                Name
                            </label>
                            <input
                                defaultValue={player !== null ? (player["name"]) : ""}
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
                                defaultValue={player !== null ? (player["sport"]) : ""}
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
                                defaultValue={player !== null ? (player["nationality"]) : ""}
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
                                defaultValue={player !== null ? (player["age"]) : ""}
                                type="number"
                                className="form-control"
                                id="exampleInputAge"
                                name="age"
                                required
                            />
                        </div>

                        <button disabled={btnloader} type="submit"
                                className="btn submitbtn btn-outline-warning w-100 mt-3">
                            {btnloader ? (<BtnLoader/>) : ("Update")}
                        </button>
                    </form>
                </div>
            </div>


        </div>
    );
};

export default UpdatePlayersForm;