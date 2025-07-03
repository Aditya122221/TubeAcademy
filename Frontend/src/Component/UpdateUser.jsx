import { useState, useEffect } from "react";
import U from '../CSS/UpdateUser.module.css'
import Leader from '../Images/TeamLeader.png'
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";

export default function UpdateUser() {
    const location = useLocation()
    const [fname, setfname] = useState('')
    const [lname, setlname] = useState('')
    const [uemail, setemail] = useState('')
    const [phone, setphone] = useState('')
    const [uaddress, setaddress] = useState('')
    const [avatar, setAvatar] = useState('')
    const [role, setRole] = useState('')
    const [info, setInfo] = useState("")
    const [isClass, setIsClass] = useState(2)
    const [isDis, setIsDis] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('token') === null || !location.state) {
            window.location.href = '/';
            return;
        }
        setfname(location.state.fName)
        setlname(location.state.lName)
        setemail(location.state.email)
        setphone(location.state.pNumber)
        setaddress(location.state.address)
        setAvatar(location.state.avatar)
        setRole(JSON.parse(localStorage.getItem('role')))
    }, [])

    const updateData = (e) => {
        e.preventDefault()
        setIsDis(true)
        setInfo("Input Validation")
        setIsClass(0)
        const alpharegex = /^[a-zA-Z]+$/
        if (fname.length < 3 || !alpharegex.test(fname)) {
            setInfo("First Name is not valid")
            setIsClass(1)
        } else if (lname.length < 3 || !alpharegex.test(lname)) {
            setlnameerror("Last Name is not a vailid")
            setIsClass(1)
        } else {
            setInfo("Updating Data...")
            setIsClass(0)
            const payload = new FormData()
            payload.append("fname", fname)
            payload.append("lname", lname)
            payload.append("pNumber", phone)
            payload.append("uEmail", uemail)
            payload.append("uAddress", uaddress)
            payload.append("urole", role)
            if (avatar instanceof File) payload.append("avatar", avatar)

            axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/update`, payload).then((res) => {
                if (res.status !== 200) {
                    setInfo(res.data.message)
                    setIsClass(1)
                    setIsDis(false)
                } else {
                    setInfo(res.data.message)
                    setIsClass(0)
                    setIsDis(false)
                }
            }).catch((err) => {
                setInfo("Updation failed")
                setIsClass(1)
                console.log("Error from client side", err);
            })
        }
    }

    return (
        <div className={U.container}>
            <div className={U.formWrapper}>
                <div className={U.header}>
                    <h1 className={U.title}>Update Profile</h1>
                    <div className={U.navigation}>
                        <button
                            type="button"
                            className={U.navButton}
                            disabled={isDis}
                        >
                            <Link className={U.link} to='/home'>← Back to Home</Link>
                        </button>
                        <button
                            type="button"
                            className={U.navButton}
                            disabled={isDis}
                        >
                            <Link className={U.link} to='/profile'>View Profile →</Link>
                        </button>
                    </div>
                </div>

                <form className={U.form} onSubmit={updateData}>
                    {/* Avatar Section */}
                    <div className={U.avatarSection}>
                        <div className={U.avatarPreview}>
                            <img
                                src={avatar == "" ? Leader : avatar}
                                alt="Current avatar"
                                className={U.avatarImage}
                            />
                        </div>
                        <div className={U.avatarUpload}>
                            <label htmlFor="avatar" className={U.avatarLabel}>
                                Change Avatar
                            </label>
                            <input
                                type="file"
                                id="avatar"
                                name="avatar"
                                accept="image/*"
                                onChange={(e) => setAvatar(e.target.files[0])}
                                className={U.avatarInput}
                            />
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className={U.formGrid}>
                        <div className={U.formGroup}>
                            <label htmlFor="fname" className={U.label}>
                                First Name
                            </label>
                            <input
                                type="text"
                                id="fname"
                                name="fname"
                                value={fname}
                                onChange={(e) => setfname(e.target.value)}
                                className={U.input}
                                required
                            />
                        </div>

                        <div className={U.formGroup}>
                            <label htmlFor="lastName" className={U.label}>
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lname"
                                value={lname}
                                onChange={(e) => setlname(e.target.value)}
                                className={U.input}
                                required
                            />
                        </div>

                        <div className={U.formGroup}>
                            <label htmlFor="email" className={U.label}>
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={uemail}
                                disabled
                                className={U.input}
                                required
                            />
                        </div>

                        <div className={U.formGroup}>
                            <label htmlFor="phoneNumber" className={U.label}>
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="pnumber"
                                value={phone}
                                className={`${U.input} ${U.disabled}`}
                                disabled
                            />
                        </div>

                        <div className={U.formGroup}>
                            <label htmlFor="address" className={U.label}>
                                Address
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                value={uaddress}
                                onChange={(e) => setaddress(e.target.value)}
                                className={U.textarea}
                                rows="3"
                            />
                        </div>
                    </div>

                    <div className={U.submitSection}>
                        <button type="submit" className={U.submitButton} disabled={isDis}>
                            Update Profile
                        </button>
                    </div>
                </form>
                <span className={`${U.er} ${isClass === 1 ? U.error : isClass === 0 ? U.pending : ""}`}>{info}</span>
            </div>
        </div>
    )
}