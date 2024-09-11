import React, { useState } from "react";
import S from '../CSS/SignUp.module.css';
import Logo from '../Images/Logo.png'
import Img from '../Images/SignUpImg.png'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";

const SignUp = () => {
    const Navigate = useNavigate()
    const [fName, setfName] = useState('');
    const [lName, setlName] = useState('');
    const [pNumber, setpNumber] = useState('');
    const [password, setpassword] = useState('');
    const [settingUp, setSettingUp] = useState(false);

    const handleForm = (e) => {
        setSettingUp(true);
        e.preventDefault();
        const payload = {
            fName: fName,
            lName: lName,
            pNumber: pNumber,
            password: password
        }
        axios.post('http://localhost:3000/signup', payload).then((res) => {
            toast("Registration Successful");
            console.log("User register", res);
            setSettingUp(false);
            Navigate('/login')
        }).catch((err) => {
            toast("Registration failed");
            console.log(err);
            setSettingUp(false)
        })
        console.log(payload);
    }
    return (
        <div className={S.container}>
            <Link to='/'><img src={Logo} alt="Logo" className={S.logo} /></Link>
            <div className={S.box}>
                <div className={S.box1}>
                    <h1 className={S.title}>Sign Up for free</h1>
                    <img src={Img} className={S.iim} alt="img" />
                </div>
                <div className={S.box2}>
                    <h1>Create Account</h1>
                    <form onSubmit={handleForm} className={S.form}>
                        <div className={S.Name}>
                            <div className={S.fName}>
                                <label htmlFor="fName" className={S.labell}>First Name:</label>
                                <input type="text" name="fName" value={fName} onChange={(e) => setfName(e.target.value)} className={S.inputt} />
                            </div>
                            <div className={S.lName}>
                                <label htmlFor="lName" className={S.labell}>Last Name:</label>
                                <input type="text" name="lName" value={lName} onChange={(e) => setlName(e.target.value)} className={S.inputt} />
                            </div>
                        </div>
                        <label htmlFor="Pnumber" className={S.labell}>Phone Number:</label>
                        <input type="text" name="Pnumber" value={pNumber} onChange={(e) => setpNumber(e.target.value)} className={S.inputt} id={S.pn} />
                        <div className={S.Name}>
                            <div className={S.fName}>
                                <label htmlFor="password" className={S.labell}>Password:</label>
                                <input type="password" name="password" value={password} onChange={(e) => setpassword(e.target.value)} className={S.inputt} />
                            </div>
                            <div className={S.lName}>
                                <label htmlFor="cpassword" className={S.labell}>Confirm Password:</label>
                                <input type="password" name="cpassword" className={S.inputt} />
                            </div>
                        </div>
                        <button type="submit" disabled={settingUp} className={S.signin}>
                            {settingUp ? 'Signing in' : 'Sign Up'}
                        </button>
                    </form>
                    <div className={S.alre}>Already have an account! <Link to='/login' className={S.log}>Log In</Link></div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;