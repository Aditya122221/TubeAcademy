import { useState, useEffect } from "react";
import S from '../CSS/SignUp.module.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SignUp = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fName: '',
        lName: '',
        pNumber: '',
        email: '',
        role: '',
        password: '',
        cPassword: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (localStorage.getItem('role') !== '"admin"') {
            window.location.href = '/';
        }
    }, []);

    const validateForm = () => {
        let newErrors = {};
        const alpharegex = /^[a-zA-Z]+$/;

        if (formData.fName.length < 3 || !alpharegex.test(formData.fName))
            newErrors.fName = "First Name is not valid";

        if (formData.lName.length < 3 || !alpharegex.test(formData.lName))
            newErrors.lName = "Last Name is not valid";

        const numregex = /^[0-9]+$/;
        if (!numregex.test(formData.pNumber))
            newErrors.pNumber = "Phone Number is not valid";

        if (!formData.email.includes('@'))
            newErrors.email = "Email is not valid";

        if (formData.password.length < 8)
            newErrors.password = "Length should be at least 8 characters long";
        else if (!hasLower(formData.password))
            newErrors.password = "Password should contain at least one lowercase letter";
        else if (!hasUpper(formData.password))
            newErrors.password = "Password should contain at least one uppercase letter";
        else if (!hasNumber(formData.password))
            newErrors.password = "Password should contain at least one digit";
        else if (!hasSpecial(formData.password))
            newErrors.password = "Password should contain at least one special character";

        if (formData.password !== formData.cPassword)
            newErrors.cPassword = "Passwords do not match";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleForm = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const payload = {
                fName: formData.fName,
                lName: formData.lName,
                pNumber: formData.pNumber,
                role: formData.role,
                password: formData.password,
                email: formData.email,
                address: ""
            };
            axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/signup`, payload)
                .then(() => navigate('/profile'))
                .catch((err) => console.error(err));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Password validation helpers
    const hasLower = (str) => /[a-z]/.test(str);
    const hasUpper = (str) => /[A-Z]/.test(str);
    const hasNumber = (str) => /\d/.test(str);
    const hasSpecial = (str) => /[!@#$%^&*(),.?":{}|<>]/.test(str);

    return (
        <div className={S.container}>
            <div className={S.formWrapper}>
                <h1 className={S.title}>Register a Member</h1>
                <form className={S.form} onSubmit={handleForm}>
                    <div className={S.inputGroup}>
                        {errors.fName && <span className={S.error}>{errors.fName}</span>}
                        <input
                            type="text"
                            name="fName"
                            value={formData.fName}
                            onChange={handleInputChange}
                            placeholder="First Name"
                            className={S.input}
                            required
                        />
                    </div>

                    <div className={S.inputGroup}>
                        {errors.lName && <span className={S.error}>{errors.lName}</span>}
                        <input
                            type="text"
                            name="lName"
                            value={formData.lName}
                            onChange={handleInputChange}
                            placeholder="Last Name"
                            className={S.input}
                            required
                        />
                    </div>

                    <div className={S.inputGroup}>
                        {errors.pNumber && <span className={S.error}>{errors.pNumber}</span>}
                        <input
                            type="tel"
                            name="pNumber"
                            value={formData.pNumber}
                            onChange={handleInputChange}
                            placeholder="Phone Number"
                            className={S.input}
                            required
                        />
                    </div>

                    <div className={S.inputGroup}>
                        {errors.email && <span className={S.error}>{errors.email}</span>}
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email Address"
                            className={S.input}
                            required
                        />
                    </div>

                    <div className={S.inputGroup}>
                        {errors.password && <span className={S.error}>{errors.password}</span>}
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                            className={S.input}
                            required
                        />
                    </div>

                    <div className={S.inputGroup}>
                        {errors.cPassword && <span className={S.error}>{errors.cPassword}</span>}
                        <input
                            type="password"
                            name="cPassword"
                            value={formData.cPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm Password"
                            className={S.input}
                            required
                        />
                    </div>

                    <div className={S.roleSelector}>
                        <p className={S.roleLabel}>Select the role:</p>
                        <div className={S.roleOptions} role="radiogroup" aria-label="User role selection">
                            {['admin', 'Teacher', 'Student'].map((role) => (
                                <label
                                    key={role}
                                    className={`${S.roleButton} ${formData.role === role ? S.roleButtonActive : ''}`}
                                >
                                    <input
                                        type="radio"
                                        name="role"
                                        value={role}
                                        checked={formData.role === role}
                                        onChange={handleInputChange}
                                        className={S.radioInput}
                                    />
                                    {role}
                                </label>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className={S.signUpButton}>
                        Sign Up
                    </button>
                </form>

                <div className={S.backLink}>
                    <button
                        type="button"
                        className={S.backButton}
                        onClick={() => navigate('/profile')}
                    >
                        ← Back to Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
