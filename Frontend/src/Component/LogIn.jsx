import React, { useState, useEffect, useRef } from "react";
import L from '../CSS/LogIn.module.css';
import Logo from '../Images/Logo.png';
import { toast } from "react-toastify";
import axios from 'axios';
import { useNavigate, Link, useLocation } from "react-router-dom";

const LogIn = () => {
    const Navigate = useNavigate();
    const location = useLocation();
    const [pNumber, setpNumber] = useState('');
    const [password, setPassword] = useState('');
    const [settingUp, setSettingUp] = useState(false);
    const [Error, setError] = useState("")
    const [fpnumber, setfpnumber] = useState('')

    const loginRef = useRef()
    const forgotRef = useRef()

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            window.location.href = '/gotLost';
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            pNumber,
            password
        };

        setSettingUp(true);
        axios.post('http://localhost:3000/login', payload)
            .then((res) => {
                setSettingUp(false);
                toast("Log in Successful");
                console.log("User logged in:", res);
                localStorage.setItem('token', JSON.stringify(res.data.token));
                Navigate('/');
            })
            .catch((err) => {
                setSettingUp(false);
                setError("User does not exists")
                console.error(err);
            });

        console.log(payload);
    };

    const handleShowHide = () => {
        loginRef.current.style.display = "none"
        forgotRef.current.style.display = "block"
    }

    const handleL = () => {
        loginRef.current.style.display = "block"
        forgotRef.current.style.display = "none"
    }

    const handleForgot = (e) => {
        e.preventDefault()
        const payload = { fpnumber: fpnumber }
        axios.post('http://localhost:3000/usercheck', payload).then((res) => {
            console.log(res)
            Navigate('/forgotpas', { state: fpnumber })
            setError("")
        }).catch((e) => {
            setError("User does not exist")
            console.log(e)
        })
    }

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
                    <span className={L.e}>{Error}</span>
                    <div ref={loginRef} className={L.formm}>
                        <input onChange={(e) => setpNumber(e.target.value)} type="text" placeholder="Enter Phone Number" required className={L.phoneNumberInput} />
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Password" required className={L.passwordInput} />
                        <button onClick={handleSubmit} className={L.loginButton} disabled={settingUp}>Log In</button>
                        <button onClick={handleShowHide} className={L.forgotPassword}>Forgot Password</button>
                    </div>
                    <div ref={forgotRef} className={L.forgotPas}>
                        <input onChange={(e) => setfpnumber(e.target.value)} type="text" placeholder="Enter phone number" required className={L.phoneNumberInput} />
                        <button onClick={handleForgot} className={L.loginButton}>Next</button>
                        <button onClick={handleL} className={L.forgotPassword}>Got Remembered</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
