import React, {useEffect, useState} from 'react';
import axios from "axios";
import Helper from "../utility/Helper.js";
import FullScreenLoader from "./FullScreenLoader.jsx";
import {FaEdit, FaTrash} from "react-icons/fa";
import Swal from 'sweetalert2'

const ProfileContent = () => {
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);
    const [showIcons, setShowIcons] = useState(false);

    useEffect(() => {
        (async () => {
            await registratedUser();
        })();
    }, []);

    const registratedUser = async () => {
        try {
            const res = await axios.get(`${Helper.BaseApi()}/readUser`, Helper.tokenHeader());
            setUser(res.data["UserInformation"]);
            setLoader(false);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleImageUpload = async (e) => {
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then( async (result) => {
            if (result.isConfirmed) {
               await Swal.fire("Saved!", "", "success");
                setLoader(true);
                const formData = new FormData();
                formData.append('file', e.target.files[0]);
                console.log(formData)
                await axios.post(`${Helper.BaseApi()}/profileImage`, formData, Helper.tokenHeader())
                await registratedUser();
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };

    const deleteProfileImg = async () => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor:"#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, delete it!"
            }).then( async (result) => {
                if (result.isConfirmed) {
                   await Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    setLoader(true);
                    await axios.get(`${Helper.BaseApi()}/removeProfileImg`, Helper.tokenHeader());
                    await registratedUser();
                }
            });

        } catch (error) {
            console.error("Error deleting profile image:", error);
        } finally {
            setLoader(false);
        }
    };
    return (<div className="mt-5">
        <h1 className="acTxt">Account</h1>
        {loader ? (<FullScreenLoader/>) : (user.map((item, i) => (<div key={i} className="ms-3 my-5">
            <div className="position-relative rounded-5 mb-5"
                 style={{width: '120px', height: "120px"}}
                 onMouseOver={() => setShowIcons(true)}
                 onMouseOut={() => setShowIcons(false)}
                 onMouseMove={() => setShowIcons(true)}
            >
                <img className="img-fluid profileimg"
                     src={item.proImg ? item.proImg.profilePicUrl : "https://image.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-260nw-2281862025.jpg"}
                     alt="Profile"
                />
                {showIcons && (
                    <div className="position-absolute start-50 translate-middle rounded-5 proIconDiv">
                        <div className="d-flex iconss">
                            <label htmlFor="file" style={{marginBottom: "3px"}}>
                                <FaEdit className="me-3" style={{cursor: "pointer"}} size={20}/>
                            </label>
                            <input type="file" id="file" name="file"
                                   onChange={handleImageUpload} style={{display: 'none'}}/>
                            <FaTrash size={20} onClick={deleteProfileImg} style={{cursor: "pointer"}}/>
                        </div>
                    </div>)}
            </div>
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
        </div>)))}
    </div>);
};

export default ProfileContent;





