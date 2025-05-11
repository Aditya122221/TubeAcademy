import React, { useEffect, useState } from "react";
import PA from '../CSS/update.module.css'
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function PasswordUpdate() {
    const location = useLocation()
    const Navigate = useNavigate()
    const [newpassword, setnewpassword] = useState("")
    const [cpassword, setcpassword] = useState("")
    const [npassworderror, setnpassworderror] = useState("")
    const [cpassworderror, setcpassworderror] = useState()
    const [regis, setRegis] = useState()
    const [urole, setuRole] = useState()

    useEffect(() => {
        setRegis(location.state.regis)
        setuRole(location.state.frole)
        if (localStorage.getItem('token') !== null) {
            window.location.href = '/gotLost';
        }
    }, [])

    const handleUpdate = (e) => {
        e.preventDefault()

        if (newpassword.length < 8) setnpassworderror("Length should atleast be 8 character long")
        else if (!(lowerCaseE(newpassword))) setnpassworderror("Password should contain atleast one lowercase letter")
        else if (!(upperCaseE(newpassword))) setnpassworderror("Password should contain atleast one uppercase letter")
        else if (!(numberE(newpassword))) setnpassworderror("Password should contain atleast one digit")
        else if (!(specialCharE(newpassword))) setnpassworderror("Password should contain atleast one special character")
        else if (newpassword !== cpassword) {
            setcpassworderror("Password did not matched")
            setnpassworderror('')
        }

        else {
            setnpassworderror('')
            setcpassworderror('')
            const payload = {
                regis: regis,
                newpassword: newpassword,
                urole: urole
            }
            axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/passwordupdate`, payload).then((res) => {
                Navigate('/')
            }).catch((e) => {
                console.log(e)
            })
        }
    }

    // --------------------------------Functions----------------------------------

    function lowerCaseE(str) {
        const lowerregex = /^[a-z]+$/
        for (var i = 0; i < str.length; i++) {
            if (lowerregex.test(str[i])) return true
        }
        return false
    }

    function upperCaseE(str) {
        const upperregex = /^[A-Z]+$/
        for (var i = 0; i < str.length; i++) {
            if (upperregex.test(str[i])) return true
        }
        return false
    }

    function numberE(str) {
        const numberregex = /^[0-9]+$/
        for (var i = 0; i < str.length; i++) {
            if (numberregex.test(str[i])) return true
        }
        return false
    }

    function specialCharE(str) {
        const specialregex = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
        for (var i = 0; i < str.length; i++) {
            if (specialregex.test(str[i])) return true
        }
        return false
    }

    const handleNav = () => {
        Navigate('/')
    }
    return (
        <div className={PA.logger}>
            <div className={PA.container}>
                <div className={PA.forgotPas}>
                    <span className={PA.error}>{npassworderror}</span>
                    <input onChange={(e) => setnewpassword(e.target.value)} value={newpassword} type="password" placeholder="Enter New Password" required className={PA.phoneNumberInput} />

                    <span className={PA.error}>{cpassworderror}</span>
                    <input onChange={(e) => setcpassword(e.target.value)} value={cpassword} type="password" placeholder="Re-enter Password" required className={PA.phoneNumberInput} />

                    <button onClick={handleUpdate} className={PA.loginButton}>Update Password</button>

                    <button onClick={handleNav} className={PA.forgotPassword}>Back to LogIn</button>
                </div>
            </div>
        </div>
    )
}