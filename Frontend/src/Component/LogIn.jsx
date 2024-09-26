import React, { useState, useEffect } from "react";
import L from '../CSS/LogIn.module.css';
import { Link } from "react-router-dom";
import Logo from '../Images/Logo.png';
import { toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const LogIn = () => {
    const Navigate = useNavigate();
    const [pNumber, setpNumber] = useState('');
    const [password, setPassword] = useState('');
    const [settingUp, setSettingUp] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            window.location.href = '/';
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            pNumber,
            password
        };

        setSettingUp(true);
        axios.post('https://tube-academy-backend.onrender.com/login', payload)
            .then((res) => {
                setSettingUp(false);
                toast("Log in Successful");
                console.log("User logged in:", res);
                localStorage.setItem('token', JSON.stringify(res.data.token));
                Navigate('/');
            })
            .catch((err) => {
                setSettingUp(false);
                toast("Log in failed");
                console.error(err);
            });

        console.log(payload);
    };

    return (
        <div className={L.logger}>
            <div className={L.container}>
                <div className={L.socialLogin}>
                    <header>
                        <Link to='/'><img className={L.looggo} src={Logo} alt="Logo" /></Link>
                    </header>
                    <h3>Login using social media account to get quick access</h3>
                    <button className={L.facebookButton}>Continue with Facebook</button>
                    <button className={L.googleButton}>Continue with Google</button>
                    <button className={L.appleButton}>Continue with Apple</button>
                </div>
                <div className={L.loginForm}>
                    <h2>Login to your account</h2>
                    <p>Don’t have an account? <Link className={L.signer} to="/signup">Sign up for free!</Link></p>
                    <div className={L.formm}>
                        <input onChange={(e) => setpNumber(e.target.value)} type="text" placeholder="Enter Phone Number" required className={L.phoneNumberInput} />
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Password" required className={L.passwordInput} />
                        <button onClick={handleSubmit} className={L.loginButton} disabled={settingUp}>Log In</button>
                        <button className={L.forgotPassword}>Forgot Password</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
