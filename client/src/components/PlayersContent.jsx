import React, { useEffect, useState } from 'react';
import axios from "axios";
import Helper from "../utility/Helper.js";
import { Link } from "react-router-dom";
import FullScreenLoader from "./FullScreenLoader.jsx";

const PlayersContent = () => {
    const [player, setPlayer] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        (async () => {
            await CreatedPlayers();
            // setLoader(false);
        })()

    }, []);

    const CreatedPlayers = async () => {

        try {
            setLoader(true);
            const res = await axios.get(`${Helper.BaseApi()}/api/readSportsman`, Helper.tokenHeader());
            setPlayer(res.data.playerData);
        } catch (error) {
            console.error("Error fetching players:", error);
        } finally {
            setLoader(false);
        }
    };

    const deleteData = async (id) => {
        setLoader(true);
        try {
            await axios.get(`${Helper.BaseApi()}/api/deleteSportsman/${id}`);
            await CreatedPlayers();
        } catch (error) {
            console.error("Error deleting player:", error);
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="mt-5">
            {loader ? (
                <FullScreenLoader />
            ) : (
                <div className="container">
                    <h1>Your Favourite Sportsman List</h1>
                    <div>
                        <Link to="/createplayers" className="btn btn-outline-warning my-4">Add Players</Link>
                        {player.length === 0 ? (
                            <h1 className="text-center mt-5">No Items Added</h1>
                        ) : (
                            <table className="table table-bordered">
                                <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Sport</th>
                                    <th scope="col">Nationality</th>
                                    <th scope="col">Age</th>
                                    <th scope="col">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {player.map((item, i) => (
                                    <tr key={i}>
                                        <td>{item.name}</td>
                                        <td>{item.sport}</td>
                                        <td>{item.nationality}</td>
                                        <td>{item.age}</td>
                                        <td>
                                            <button className="btn me-3 btn-outline-warning" onClick={() => deleteData(item["_id"])}>
                                                Delete
                                            </button>
                                            <Link className="btn btn-outline-warning" to={`/update/${item["_id"]}`}>
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlayersContent;
