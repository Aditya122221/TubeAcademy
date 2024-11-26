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
    const [fpnumber, setfpnumber] = useState('')
    const [regis, setRegis] = useState('')
    const [role, setRole] = useState();
    const [frole, setfRole] = useState();
    const [error, setError] = useState('');
    const [userData, setUserData] = useState();

    const loginRef = useRef()
    const forgotRef = useRef()
    const EuserRef = useRef()

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            window.location.href = '/gotLost';
        }
    })

    function validateLogIn() {
        if (pNumber.length === 0) {
            setError('Phone Number required')
            return false
        }
        else if (password.length === 0) {
            setError('Password is required')
            return false
        }
        else if (role.length === 0) {
            setError('Role is required')
            return false;
        }
        else return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateLogIn()) {
            const payload = {
                pNumber,
                password,
                role
            };

            setSettingUp(true);
            axios.post('http://localhost:3000/login', payload)
                .then((res) => {
                    setSettingUp(false);
                    localStorage.setItem('token', JSON.stringify(res.data.token));
                    localStorage.setItem('role', JSON.stringify(res.data.roleAction))
                    EuserRef.current.style.display = "none"
                    Navigate('/');
                })
                .catch((err) => {
                    setSettingUp(false);
                    EuserRef.current.style.display = "block"
                    console.error("Server either not running or disconnected", err);
                });

            console.log(payload)
        }
    };

    const handleShowHide = () => {
        loginRef.current.style.display = "none"
        forgotRef.current.style.display = "block"
        EuserRef.current.style.display = "none"
    }

    const handleL = () => {
        loginRef.current.style.display = "block"
        forgotRef.current.style.display = "none"
        EuserRef.current.style.display = "none"
    }

    const handleForgot = (e) => {
        e.preventDefault()
        const payload = { fpnumber: fpnumber, regis: regis, frole: frole }
        axios.post('http://localhost:3000/usercheck', payload).then((res) => {
            if (res.status) {
                setUserData(res.data.data)
                console.log(res.data.data)
                Navigate('/forgotpas', { state: userData })
            }
            else {
                console.log(res.data.data)
                setError(res.data.data);
            }
        }).catch((e) => {
            console.log("Here is the error", e)
        })
    }

    return (
        <div className={L.logger}>
            <div className={L.container}>
                <div className={L.socialLogin}>
                    <header>
                        <Link to='/'><img className={L.looggo} src={Logo} alt="Logo" /></Link>
                    </header>
                </div>
                <div className={L.loginForm}>
                    <h2>Login to your account</h2>
                    <span ref={EuserRef} className={L.e}>User does not exist. SignUp first</span>
                    <span className={L.error}>{error}</span>
                    <div ref={loginRef} className={L.formm}>
                        <input onChange={(e) => setpNumber(e.target.value)} type="text" placeholder="Enter Phone Number" required className={L.phoneNumberInput} value={pNumber} />

                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Password" required className={L.passwordInput} value={password} />

                        <div className={L.roles}>
                            <p className={L.para}>
                                <input type="radio" id="user" name="role" value="admin" onChange={(e) => setRole(e.target.value)} />
                                <label className={L.roleLabel} htmlFor="role">Admin</label>
                            </p>

                            <p className={L.para}>
                                <input type="radio" id="user" name="role" value="Teacher" onChange={(e) => setRole(e.target.value)} />
                                <label className={L.roleLabel} htmlFor="role">Teacher</label>
                            </p>

                            <p className={L.para}>
                                <input type="radio" id="user" name="role" value="Student" onChange={(e) => setRole(e.target.value)} />
                                <label className={L.roleLabel} htmlFor="role">Student</label>
                            </p>
                        </div>

                        <button onClick={handleSubmit} className={L.loginButton} disabled={settingUp}>Log In</button>

                        <button onClick={handleShowHide} className={L.forgotPassword}>Forgot Password</button>
                        {/* <div className={L.forPas}>
                            <span className={L.like}>Don't Remember the password! </span>
                            <Link to='/contact' className={L.like}>Contact admin</Link>
                        </div> */}
                    </div>
                    <div ref={forgotRef} className={L.forgotPas}>
                        <input onChange={(e) => setfpnumber(e.target.value)} type="text" placeholder="Enter phone number" required className={L.phoneNumberInput} />

                        <input onChange={(e) => setRegis(e.target.value)} type="number" placeholder="Enter your Registration ID" required className={L.phoneNumberInput} />

                        <div className={L.roles}>
                            <p className={L.para}>
                                <input type="radio" id="user" name="frole" value="fadmin" onChange={(e) => setfRole(e.target.value)} />
                                <label className={L.roleLabel} htmlFor="frole">Admin</label>
                            </p>

                            <p className={L.para}>
                                <input type="radio" id="user" name="frole" value="fTeacher" onChange={(e) => setfRole(e.target.value)} />
                                <label className={L.roleLabel} htmlFor="frole">Teacher</label>
                            </p>

                            <p className={L.para}>
                                <input type="radio" id="user" name="frole" value="fStudent" onChange={(e) => setfRole(e.target.value)} />
                                <label className={L.roleLabel} htmlFor="frole">Student</label>
                            </p>
                        </div>

                        <button onClick={handleForgot} className={L.loginButton}>Next</button>

                        <button onClick={handleL} className={L.forgotPassword}>Back to LogIn</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;