import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import VerifyOtpPage from "./pages/VerifyOtpPage.jsx";
import LoginFormPage from "./pages/LoginFormPage.jsx";
import VerifyEmailPage from "./pages/VerifyEmailPage.jsx";
import VerifyOtpPassPage from "./pages/VerifyOtpPassPage.jsx";
import PasswordResetPage from "./pages/PasswordResetPage.jsx";
import UpdateUserPage from "./pages/UpdateUserPage.jsx";
import CreatePlayersPage from "./pages/CreatePlayersPage.jsx";
import PlayersPage from "./pages/PlayersPage.jsx";
import UpdatePlayersPage from "./pages/UpdatePlayersPage.jsx";
import Helper from "./utility/Helper.js";

const App = () => {
    if (Helper.isLogin()){
        return (
            <div >
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage/>} />
                        <Route path="/profile" element={<ProfilePage/>} />
                        {/*<Route path="/registration" element={<RegistrationPage/>} />*/}
                        {/*<Route path="/verify" element={<VerifyOtpPage/>} />*/}
                        {/*<Route path="/login" element={<LoginFormPage/>} />*/}
                        {/*<Route path="/verifyEmail" element={<VerifyEmailPage/>} />*/}
                        {/*<Route path="/verifyotppass" element={<VerifyOtpPassPage/>} />*/}
                        {/*<Route path="/passreset" element={<PasswordResetPage/>} />*/}
                        <Route path="/updateUser" element={<UpdateUserPage/>} />
                        <Route path="/createplayers" element={<CreatePlayersPage/>} />
                        <Route path="/players" element={<PlayersPage/>} />
                        <Route path="/update/:id" element={<UpdatePlayersPage/>} />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
    else {
        return (
            <div >
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage/>} />
                        {/*<Route path="/profile" element={<ProfilePage/>} />*/}
                        <Route path="/registration" element={<RegistrationPage/>} />
                        <Route path="/verify" element={<VerifyOtpPage/>} />
                        <Route path="/login" element={<LoginFormPage/>} />
                        <Route path="/verifyEmail" element={<VerifyEmailPage/>} />
                        <Route path="/verifyotppass" element={<VerifyOtpPassPage/>} />
                        <Route path="/passreset" element={<PasswordResetPage/>} />
                        {/*<Route path="/updateUser" element={<UpdateUserPage/>} />*/}
                        {/*<Route path="/createplayers" element={<CreatePlayersPage/>} />*/}
                        {/*<Route path="/players" element={<PlayersPage/>} />*/}
                        {/*<Route path="/update/:id" element={<UpdatePlayersPage/>} />*/}
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }

};

export default App;