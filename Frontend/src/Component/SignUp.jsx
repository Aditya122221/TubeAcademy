import React, { useState, useEffect } from "react";
import S from '../CSS/SignUp.module.css';
import Logo from '../Images/Logo.png'
import Img from '../Images/SignUpImg.png'
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
        password: '',
        cPassword: ''
    })
    const [settingUp, setSettingUp] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let newErrors = {}
        const alpharegex = /^[a-zA-Z]+$/
        if (formData.fName.length < 3 || !(alpharegex.test(formData.fName))) newErrors.fName = "First Name is not valid"

        if (formData.lName.length < 3 || !(alpharegex.test(formData.lName))) newErrors.lName = "Last Name is not valid"

        const numregex = /^[0-9]+$/
        if (!(numregex.test(formData.pNumber))) newErrors.pNumber = "Phone Number is not valid"

        const lowerregex = /^[a-z]+$/
        const upperregex = /^[A-Z]+$/
        const specialregex = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/

        if (formData.password.length < 8) newErrors.password = "Length should atleast be 8 character long"
        // else if (!(lowerregex.test(formData.password))) newErrors.password = "Password should contain atleast one lowercase letter"
        // else if (!(upperregex.test(formData.password))) newErrors.password = "Password should contain atleast one uppercase letter"
        // else if (!(numregex.test(formData.password))) newErrors.password = "Password should contain atleast one digit"
        // else if (!(specialregex.test(formData.password))) newErrors.password = "Password should contain atleast one special character"

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
                password: formData.password
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
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
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
                                {errors.fName && <p>{errors.fName}</p>}
                                <input type="text" name="fName" value={formData.fName} onChange={handleChange} required className={errors.fName ? S.errr : S.inputt} />
                            </div>
                            <div className={S.lName}>
                                <label htmlFor="lName" className={S.labell}>Last Name:</label>
                                {errors.lName && <p>{errors.lName}</p>}
                                <input type="text" name="lName" value={formData.lName} onChange={handleChange} required className={errors.lName ? S.errr : S.inputt} />
                            </div>
                        </div>
                        <label htmlFor="pNumber" className={S.labell}>Phone Number:</label>
                        {errors.pNumber && <p>{errors.pNumber}</p>}
                        <input type="text" name="pNumber" value={formData.pNumber} onChange={handleChange} required className={errors.pNumber ? S.errr : S.inputt} id={S.pn} minLength={10} maxLength={10} />
                        <div className={S.Name}>
                            <div className={S.fName}>
                                <label htmlFor="password" className={S.labell}>Password:</label>
                                {errors.password && <p>{errors.password}</p>}
                                <input type="text" name="password" value={formData.password} onChange={handleChange} required className={errors.password ? S.errr : S.inputt} />
                            </div>
                            <div className={S.lName}>
                                <label htmlFor="cPassword" className={S.labell}>Confirm Password:</label>
                                {errors.cPassword && <p>{errors.cPassword}</p>}
                                <input onChange={handleChange} type="text" name="cPassword" value={formData.cPassword} required className={errors.cPassword ? S.errr : S.inputt} />
                            </div>
                        </div>
                        <button type="submit" className={S.signin}>
                            Sign Up
                        </button>
                    </form>
                    <div className={S.alre}>Already have an account! <Link to='/login' className={S.log}>Log In</Link></div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
