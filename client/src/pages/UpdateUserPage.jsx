import React from 'react';
import MasterLayout from "../components/MasterLayout.jsx";
import UpdateUserForm from "../components/UpdateUserForm.jsx";
import SideNavbar from "../components/SideNavbar.jsx";


const UpdateUserPage = () => {
    return (
        // <MasterLayout>
        <div className="row container">
            <div className="col-lg-4 col-12">
                <SideNavbar/>
            </div>
            <div className="col-lg-8 col-12 ">
                <UpdateUserForm/>
            </div>


            {/*</MasterLayout>*/}
        </div>


    // </MasterLayout>
)
    ;
};

export default UpdateUserPage;