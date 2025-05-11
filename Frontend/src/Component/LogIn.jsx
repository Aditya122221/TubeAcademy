import React, { useState, useEffect } from "react";
import L from '../CSS/LogIn.module.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const LogIn = () => {
    const Navigate = useNavigate();
    var [Reg_ID, setReg_ID] = useState('');
    const [password, setPassword] = useState('');
    const [settingUp, setSettingUp] = useState(false);
    const [fpnumber, setfpnumber] = useState('')
    var [regis, setRegis] = useState('')
    const [role, setRole] = useState('');
    const [frole, setfRole] = useState('');
    const [error, setError] = useState('');
    const [fError, setFError] = useState('')

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            window.location.href = '/home';
        }
    })

    function validateLogIn() {
        if (Reg_ID.length > 0) {
            const numregex = /^[0-9]+$/
            if (numregex.test(Reg_ID)) {
                if (password.length > 0) {
                    if (role.length === 0) {
                        setError("Role is required")
                        return false
                    } else {
                        setError('');
                        return true
                    }
                } else {
                    setError('Please enter your password')
                    return false
                }
            } else {
                console.log(Reg_ID)
                setError('Registration Id should only contain number')
                return false
            }
        } else {
            setError('Please enter your Registration ID')
            return false;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateLogIn()) {
            Reg_ID = parseInt(Reg_ID, 10);
            const payload = {
                Reg_ID,
                password,
                role
            };

            setSettingUp(true);
            axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/login`, payload)
                .then((res) => {
                    setSettingUp(false);
                    localStorage.setItem('token', JSON.stringify(res.data.token));
                    localStorage.setItem('role', JSON.stringify(res.data.roleAction))
                    localStorage.setItem('RegID', JSON.stringify(res.data.RegID))
                    Navigate('/home');
                })
                .catch((err) => {
                    setSettingUp(false);
                    console.error("Server either not running or disconnected", err);
                });
        }
    };

    const validateF = () => {
        if (regis.length > 0) {
            const numregex = /^[0-9]+$/
            if (numregex.test(regis)) {
                if (fpnumber.length > 0) {
                    if (numregex.test(fpnumber)) {
                        if (frole.length === 0) {
                            setFError("Role is required")
                            return false
                        } else {
                            setFError("")
                            return true
                        }
                    } else {
                        setFError("Phone Number should only contain number")
                        return false
                    }
                } else {
                    setFError("Phone Number required")
                    return false
                }
            } else {
                setFError('Registration Id should only contain number')
                return false
            }
        } else {
            setFError("Registration Id Required")
            return false
        }
    }

    const handleForgot = (e) => {
        e.preventDefault()
        if (validateF()) {
            regis = parseInt(regis, 10)
            const payload = { fpnumber: fpnumber, regis: regis, frole: frole }
            axios.post('/api/usercheck', payload).then((res) => {
                if (res.status) {
                    Navigate('/forgotpas', { state: res.data.data })
                }
                else {
                    console.log(res.data.data)
                    setError(res.data.data);
                }
            }).catch((e) => {
                console.log(e)
            })
        }
    }

    return (
        <div className={L.main}>
            <div className={L.loggerandfor}>
                <input type="checkbox" className={L.chk} id="ccc" aria-hidden="true" />

                <div className={L.signup}>
                    <form onSubmit={handleSubmit}>
                        <label className={L.label} htmlFor="ccc" aria-hidden="true">Log In</label>

                        <span className={L.err}>{error}</span>

                        <input className={L.input} type="text" name="Reg_ID" placeholder="Enter Registration_ID" required="" onChange={(e) => setReg_ID(e.target.value)} />

                        <input className={L.input} type="password" name="password" placeholder="Enter Password" required="" onChange={(e) => setPassword(e.target.value)} />

                        <div className={L.radioInputs}>

                            <label className={L.radio}>
                                <input value="admin" type="radio" name="role" onChange={(e) => setRole(e.target.value)} />
                                <span className={L.name}>admin</span>
                            </label>

                            <label className={L.radio}>
                                <input value="Teacher" type="radio" name="role" onChange={(e) => setRole(e.target.value)} />
                                <span className={L.name}>Teacher</span>
                            </label>

                            <label className={L.radio}>
                                <input value="Student" type="radio" name="role" onChange={(e) => setRole(e.target.value)} />
                                <span className={L.name}>Student</span>
                            </label>
                        </div>

                        <button className={L.button} type="submit">Log In</button>

                    </form>
                </div>

                <div className={L.login}>
                    <form onSubmit={handleForgot}>

                        <label className={L.label} htmlFor="ccc" aria-hidden="true">Forgot Password</label>

                        <span className={L.err}>{fError}</span>

                        <input className={L.input} type="text" name="regis" placeholder="Enter Registration ID" required="" onChange={(e) => setRegis(e.target.value)} />

                        <input className={L.input} type="text" name="pNumber" placeholder="Enter Phone Number" required="" onChange={(e) => setfpnumber(e.target.value)} />

                        <div className={L.radioInputs}>
                            <label className={L.radio}>
                                <input value="fadmin" type="radio" name="frole" onChange={(e) => setfRole(e.target.value)} />
                                <span className={L.name}>admin</span>
                            </label>

                            <label className={L.radio}>
                                <input value="fTeacher" type="radio" name="frole" onChange={(e) => setfRole(e.target.value)} />
                                <span className={L.name}>Teacher</span>
                            </label>

                            <label className={L.radio}>
                                <input value="fStudent" type="radio" name="frole" onChange={(e) => setfRole(e.target.value)} />
                                <span className={L.name}>Student</span>
                            </label>
                        </div>

                        <button className={L.button} type="submit">Next</button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default LogIn;