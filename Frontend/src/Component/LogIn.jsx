import { useState, useEffect } from "react";
import L from '../CSS/LogIn.module.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const LogIn = () => {
    const Navigate = useNavigate();
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [loginData, setLoginData] = useState({
        Reg_ID: '',
        password: '',
        role: ''
    });
    const [forgotPasswordData, setForgotPasswordData] = useState({
        regis: '',
        fpnumber: '',
        frole: ''
    });
    const [error, setError] = useState("")
    const [ferror, setfError] = useState("")
    const [isDis, setIsDis] = useState(false)
    const [isClass, setIsClass] = useState(2)

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleForgotPasswordChange = (e) => {
        const { name, value } = e.target;
        setForgotPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const switchToForgotPassword = () => {
        setIsLoginMode(false);
        setIsClass(2)
        setError("")
        setIsDis(false)
        setfError("")
    };

    const switchToLogin = () => {
        setIsLoginMode(true);
        setIsDis(false)
        setIsClass(2)
        setError("")
        setfError("")
    };

    const RoleSelector = ({ selectedRole, onRoleChange, name }) => {
        const roles = [
            { value: 'admin', label: 'Admin' },
            { value: 'Teacher', label: 'Teacher' },
            { value: 'Student', label: 'Student' }
        ];

        return (
            <div className={L.roleSelector}>
                {roles.map((role) => (
                    <label key={role.value} className={`${L.roleOption} ${selectedRole === role.value ? L.selected : ''}`}>
                        <input
                            type="radio"
                            name={name}
                            value={role.value}
                            checked={selectedRole === role.value}
                            onChange={onRoleChange}
                        />
                        <span className={L.roleText}>{role.label}</span>
                    </label>
                ))}
            </div>
        );
    };

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            window.location.href = '/home';
        }
    })

    function validateLogIn() {
        if (loginData.Reg_ID.length > 0) {
            const numregex = /^[0-9]+$/
            if (numregex.test(loginData.Reg_ID)) {
                if (loginData.password.length > 0) {
                    if (loginData.role.length === 0) {
                        setError("Role is required")
                        setIsClass(1)
                        return false
                    } else {
                        setError('');
                        setIsClass(2)
                        return true
                    }
                } else {
                    setError('Please enter your password')
                    setIsClass(1)
                    return false
                }
            } else {
                console.log(loginData.Reg_ID)
                setError('Registration Id should only contain number')
                setIsClass(1)
                return false
            }
        } else {
            setError('Please enter your Registration ID')
            setIsClass(1)
            return false;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("Input Validating...")
        setIsDis(true)
        setIsClass(0)

        if (validateLogIn()) {
            setError("User Verifying...")
            setIsClass(0)
            const Reg_ID = parseInt(loginData.Reg_ID, 10)
            const password = loginData.password
            const role = loginData.role
            const payload = {
                Reg_ID,
                password,
                role
            };
            axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/login`, payload)
                .then((res) => {
                    if (res.status !== 200) {
                        setError(res.data.message)
                        setIsClass(1)
                        setIsDis(false)
                    } else {
                        localStorage.setItem('token', JSON.stringify(res.data.token));
                        localStorage.setItem('role', JSON.stringify(res.data.roleAction))
                        localStorage.setItem('RegID', JSON.stringify(res.data.RegID))
                        Navigate('/home');
                    }
                })
                .catch((err) => {
                    console.error("Server either not running or disconnected", err);
                });
        }
    };

    const validateF = () => {
        if (forgotPasswordData.regis.length > 0) {
            const numregex = /^[0-9]+$/
            if (numregex.test(forgotPasswordData.regis)) {
                if (forgotPasswordData.fpnumber.length > 0) {
                    if (numregex.test(forgotPasswordData.fpnumber)) {
                        if (forgotPasswordData.frole.length === 0) {
                            setfError("Role is required")
                            setIsClass(1)
                            return false
                        } else {
                            setfError("")
                            setIsClass(2)
                            return true
                        }
                    } else {
                        setfError("Phone Number should only contain number")
                        setIsClass(1)
                        return false
                    }
                } else {
                    setIsClass(1)
                    setfError("Phone Number required")
                    return false
                }
            } else {
                setIsClass(1)
                setfError('Registration Id should only contain number')
                return false
            }
        } else {
            setIsClass(1)
            setfError("Registration Id Required")
            return false
        }
    }

    const handleForgot = (e) => {
        e.preventDefault()
        setfError("Input Validating...")
        setIsDis(0)
        if (validateF()) {
            setIsClass(0)
            setfError("User Verifying...")
            const regis = parseInt(forgotPasswordData.regis, 10)
            const fpnumber = forgotPasswordData.fpnumber
            const frole = forgotPasswordData.frole
            const payload = { fpnumber: fpnumber, regis: regis, frole: frole }
            axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/usercheck`, payload).then((res) => {
                if (res.status !== 200) {
                    setfError(res.data.message);
                    setIsClass(1)
                    setIsDis(false)
                } else {
                    Navigate('/forgotpas', { state: res.data.data })
                }
            }).catch((e) => {
                console.log("Front end error", e)
            })
        }
    }

    return (
        <div className={L.loginContainer}>
            <p className={L.userInfo}>
                Use <span className={L.greenText}>22</span> as Registration ID and <span className={L.greenText}>Admin@123</span> as Password
            </p>
            <div className={L.loginCard}>
                <div className={L.formContainer}>
                    {isLoginMode ? (
                        <div className={`${L.formSection} ${L.loginSection}`}>
                            <h2 className={L.formTitle}>Login</h2>
                            <form onSubmit={handleSubmit} className={L.loginForm}>
                                <span className={`${L.er} ${isClass === 1 ? L.error : isClass === 0 ? L.pending : ""}`}>{error}</span>
                                <div className={L.inputGroup}>
                                    <input
                                        type="text"
                                        name="Reg_ID"
                                        placeholder="Enter Registration ID"
                                        value={loginData.Reg_ID}
                                        onChange={handleLoginChange}
                                        className={L.formInput}
                                        required
                                    />
                                </div>

                                <div className={L.inputGroup}>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Enter Password"
                                        value={loginData.password}
                                        onChange={handleLoginChange}
                                        className={L.formInput}
                                        required
                                    />
                                </div>

                                <div className={L.inputGroup}>
                                    <RoleSelector
                                        selectedRole={loginData.role}
                                        onRoleChange={handleLoginChange}
                                        name="role"
                                    />
                                </div>

                                <button type="submit" className={L.submitBtn} disabled={isDis}>
                                    Login
                                </button>

                                <button
                                    type="button"
                                    className={L.linkBtn}
                                    onClick={switchToForgotPassword}
                                    disabled={isDis}
                                >
                                    Forgot Password?
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className={`${L.formSection} ${L.forgotPasswordSection}`}>
                            <h2 className={L.formTitle}>Forgot Password</h2>
                            <form onSubmit={handleForgot} className={L.forgotPasswordForm}>
                                <span className={`${L.er} ${isClass === 1 ? L.error : isClass === 0 ? L.pending : ""}`}>{ferror}</span>
                                <div className={L.inputGroup}>
                                    <input
                                        type="text"
                                        name="regis"
                                        placeholder="Enter Registration ID"
                                        value={forgotPasswordData.regis}
                                        onChange={handleForgotPasswordChange}
                                        className={L.formInput}
                                        required
                                    />
                                </div>

                                <div className={L.inputGroup}>
                                    <input
                                        type="text"
                                        name="fpnumber"
                                        placeholder="Enter Phone Number"
                                        value={forgotPasswordData.fpnumber}
                                        onChange={handleForgotPasswordChange}
                                        className={L.formInput}
                                        required
                                    />
                                </div>

                                <div className={L.inputGroup}>
                                    <RoleSelector
                                        selectedRole={forgotPasswordData.frole}
                                        onRoleChange={handleForgotPasswordChange}
                                        name="frole"
                                    />
                                </div>

                                <button type="submit" className={L.submitBtn}>
                                    Reset Password
                                </button>

                                <button
                                    type="button"
                                    className={L.linkBtn}
                                    onClick={switchToLogin}
                                >
                                    Back to Login
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default LogIn;