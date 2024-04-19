import React from 'react';
import MasterLayout from "../components/MasterLayout.jsx";
import ProfileContent from "../components/ProfileContent.jsx";
import SideNavbar from "../components/SideNavbar.jsx";

const ProfilePage = () => {
    return (
        <div className="row container">
            <div className="col-lg-4 col-12">
                <SideNavbar/>
            </div>
            <div className="col-lg-8 col-12 ">
                <ProfileContent/>
            </div>
        </div>
    );
};

export default ProfilePage;