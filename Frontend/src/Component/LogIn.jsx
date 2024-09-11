import React, { useState } from "react";
import L from '../CSS/LogIn.module.css';
import { Link } from "react-router-dom";
import Logo from '../Images/Logo.png';
import { toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const LogIn = () => {
    const Navigate = useNavigate()
    const [pNumber, setpNumber] = useState('');
    const [password, setPassword] = useState('');
    const [settingUp, setSettingUp] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            pNumber: pNumber,
            password: password
        }
        axios.post('http://localhost:3000/login', payload).then((res) => {
            setSettingUp(false);
            toast("Log in Successful");
            console.log("User register", res);
            localStorage.setItem('token', JSON.stringify(res.data.token))
            Navigate('/profile')
        }).catch((err) => {
            toast("Log in failed");
            console.log(err);
            setSettingUp(false)
        })
        console.log(payload);
    }
    return (
        <>
            <div className={L.LogInPage}>
                <header>
                    <Link to="/"><img src={Logo} alt="logo" className={L.logo} /></Link>
                </header>
                <div className={L.overall}>
                    <div className={L.socialmedia}>
                        <div className={L.text} id="socmed">Login using social media account to get quick access</div>
                        <div className={L.button}>
                            <button className={L.but} id={L.facebook}>
                                <a href="#" className={`${L.link} ${L.facebook}`}>Continue with Facebook</a>
                            </button>
                            <button className={L.but} id={L.google}>
                                <a href="#" className={`${L.link} ${L.google}`}>Continue with Google</a>
                            </button>
                            <button className={L.but} id="apple">
                                <a href="#" className={`${L.link} ${L.apple}`}>Continue with Apple</a>
                            </button>
                        </div>
                    </div>
                    <div className={L.log}>
                        <div className={L.text}>Login to your account</div>
                        <div className={L.text}>Don't have an account? <Link to='/signup' className={L.sign}>Sign up for free!</Link></div>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="pNumber" id="pNumber" className={L.required}>Phone Number</label>
                            <input type="text" onChange={(e) => setpNumber(e.target.value)} name="pNumber" placeholder="Enter Phone Number" />
                            <label htmlFor="password" className={L.required}>Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Enter Password" />
                            <button type="submit" disabled={settingUp} className={L.submit} id={L.logIn}>
                                {settingUp ? 'Logging in' : 'Log In'}
                            </button>
                        </form>
                        <button className={L.submit} id={L.forpass}>Forgot Password</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LogIn