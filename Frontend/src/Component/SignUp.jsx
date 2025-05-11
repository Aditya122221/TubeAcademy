import React, { useState, useEffect } from "react";
import S from '../CSS/SignUp.module.css';
import Logo from '../Images/Logo.png'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";

const SignUp = () => {
    const Navigate = useNavigate()
    const [formData, setFormData] = useState({
        fName: '',
        lName: '',
        pNumber: '',
        email: '',
        role: '',
        password: '',
        cPassword: ''
    })
    const [settingUp, setSettingUp] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (localStorage.getItem('role') !== '"admin"') {
            window.location.href = '/';
        }
    })

    const validateForm = () => {
        let newErrors = {}
        const alpharegex = /^[a-zA-Z]+$/
        if (formData.fName.length < 3 || !(alpharegex.test(formData.fName))) newErrors.fName = "First Name is not valid"

        if (formData.lName.length < 3 || !(alpharegex.test(formData.lName))) newErrors.lName = "Last Name is not valid"

        const numregex = /^[0-9]+$/
        if (!(numregex.test(formData.pNumber))) newErrors.pNumber = "Phone Number is not valid"

        if(formData.email.length === 0) newErrors.email = "Email is not valid"

        if (formData.password.length < 8) newErrors.password = "Length should atleast be 8 character long"
        else if (!(lowerCaseE(formData.password))) newErrors.password = "Password should contain atleast one lowercase letter"
        else if (!(upperCaseE(formData.password))) newErrors.password = "Password should contain atleast one uppercase letter"
        else if (!(numberE(formData.password))) newErrors.password = "Password should contain atleast one digit"
        else if (!(specialCharE(formData.password))) newErrors.password = "Password should contain atleast one special character"

        if (formData.password !== formData.cPassword) newErrors.cPassword = "Password did not matched"

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0;
    }

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            console.log(errors)
        }
    }, [errors]);

    const handleForm = (e) => {
        setSettingUp(true);
        e.preventDefault();
        const isValidate = validateForm();
        if (isValidate) {
            const payload = {
                fName: formData.fName,
                lName: formData.lName,
                pNumber: formData.pNumber,
                role: formData.role,
                password: formData.password,
                email: formData.email,
                address: ""
            }
            axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/signup`, payload).then((res) => {
                toast("Registration Successful");
                console.log("User register", res);
                setSettingUp(false);
                Navigate('/profile')
            }).catch((err) => {
                toast("Registration failed");
                console.log(err);
                setSettingUp(false)
            })
            console.log(payload);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    //---------------------Function to validate Password------------------------

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


    return (
        <div className={S.sigern}>
            <div className={S.container}>
                <div className={S.illustration}>
                    <Link to='/'> <img className={S.logoType} src={Logo} alt="Illustration" /></Link>
                </div>
                <div className={S.formContainer}>
                    <h2 className={S.h2}>Create Account</h2>
                    <form className={S.form} onSubmit={handleForm}>
                        <label className={S.label} htmlFor="fName">First Name:</label>{errors.fName && <span className={S.eeror}>{errors.fName}</span>}
                        <input type="text" id="first-name" name="fName" required value={formData.fName} onChange={handleChange} className={S.inputField} />

                        <label className={S.label} htmlFor="lName">Last Name:</label>{errors.lName && <span className={S.eeror}>{errors.lName}</span>}
                        <input type="text" id="last-name" name="lName" required value={formData.lName} onChange={handleChange} className={S.inputField} />

                        <label className={S.label} htmlFor="pNumber">Phone Number:</label>{errors.pNumber && <span className={S.eeror}>{errors.pNumber}</span>}
                        <input type="text" id="phone" name="pNumber" required value={formData.pNumber} onChange={handleChange} className={S.inputField} minLength={10} maxLength={10} />

                        <label className={S.label} htmlFor="email">Email:</label>{errors.lName && <span className={S.eeror}>{errors.email}</span>}
                        <input type="text" id="email" name="email" required value={formData.email} onChange={handleChange} className={S.inputField} />

                        <div className={S.radioInput}>
                            <label className={S.label}>
                                <input value="admin" name="role" className={S.value1} type="radio" onChange={handleChange} />
                                <span className={S.text}>Admin</span>
                            </label>
                            <label className={S.label}>
                                <input value="Teacher" name="role" className={S.value1} type="radio" onChange={handleChange} />
                                <span className={S.text}>Teacher</span>
                            </label>
                            <label className={S.label}>
                                <input value="Student" name="role" className={S.value1} type="radio" onChange={handleChange} />
                                <span className={S.text}>Student</span>
                            </label>
                        </div>

                        <label className={S.label} htmlFor="password">Password:</label>{errors.password && <span className={S.eeror}>{errors.password}</span>}
                        <input type="password" id="password" name="password" required value={formData.password} onChange={handleChange}
                            className={S.inputField} />

                        <label className={S.label} htmlFor="cPassword">Confirm Password:</label>{errors.cPassword && <span className={S.eeror}>{errors.cPassword}</span>}
                        <input type="password" id="confirm-password" name="cPassword" required
                            value={formData.cPassword} onChange={handleChange}
                            className={S.inputField} />

                        <button className={S.button} type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp;

//{error.fName ? S.errorClassName : Simple ClassName}