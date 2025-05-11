import React, { useState, useEffect, useRef } from "react";
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
    const [fnameerror, setfnameerror] = useState('')
    const [lnameerror, setlnameerror] = useState('')
    const [role, setRole] = useState('')

    const updateRef = useRef()
    const updateERef = useRef()

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
        const alpharegex = /^[a-zA-Z]+$/
        if (fname.length < 3 || !alpharegex.test(fname)) setfnameerror("First Name is not valid")
        else if (lname.length < 3 || !alpharegex.test(lname)) setlnameerror("Last Name is not a vailid")
        else {
            const payload = new FormData()
            payload.append("fname", fname)
            payload.append("lname", lname)
            payload.append("pNumber", phone)
            payload.append("uEmail", uemail)
            payload.append("uAddress", uaddress)
            payload.append("urole", role)
            payload.append("avatar", avatar)

            axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/update`, payload, {headers: {'Content-Type': 'multipart/form-data'}}).then((res) => {
                updateRef.current.style.display = "block"
                updateERef.current.style.display = "none"
            }).catch((err) => {
                updateRef.current.style.display = "none"
                updateERef.current.style.display = "block"
                console.log("Error from client side", err);
            })
        }
    }

    return (
        <div className={U.update}>
            <div className={U.updateHeader}>
                {/* --------------------------left------------------------------- */}
                <div className={U.left}>
                    <div className={U.left1}>
                        <div className={U.left2}>
                            <img src={avatar == "" ? Leader : avatar} className={U.left3} alt="" />
                        </div>
                        <div className={U.left4}>{fname} {lname}</div>
                        <div className={U.left5}>{uemail}</div>
                    </div>
                    <div className={U.left6}>
                        <Link to='/profile' className={U.left7}>
                            <span className="material-symbols-outlined left8">
                                account_circle
                            </span>
                            <div className={U.left9}>Account</div>
                        </Link>
                        <div className={U.left10}>
                            <span className="material-symbols-outlined llee">
                                edit
                            </span>
                            <div className={U.left11}>Edit</div>
                        </div>
                        <Link to='/home' className={U.left12}>
                            <div className={U.left13}>Home</div>
                        </Link>
                    </div>
                </div>
                <div className={U.right}>
                    <div className={U.right1}>Update Data</div>

                    <form onSubmit={updateData} encType="multipart/form-data" className={U.right2} >
                        <div className={U.right3}>

                            <div className={U.right4}>
                                <label htmlFor="fname" className={U.right5}>First Name</label>
                                <span className={U.right10}>{fnameerror}</span>
                                <input type="text" defaultValue={fname} onChange={(e) => setfname(e.target.value)} className={U.right6} name="fname" required />
                            </div>

                            <div className={U.right4}>
                                <label htmlFor="lname" className={U.right5}>Last Name</label>
                                <span className={U.right10}>{lnameerror}</span>
                                <input type="text" defaultValue={lname} onChange={(e) => setlname(e.target.value)} className={U.right6} name="lname" required />
                            </div>
                        </div>
                        <div className={U.right3}>

                            <div className={U.right4}>
                                <label htmlFor="email" className={U.right5}>Email</label>
                                <input type="text" defaultValue={uemail} onChange={(e) => setemail(e.target.value)} className={U.right6} name="email" />
                            </div>

                            <div className={U.right4}>
                                <label htmlFor="pnumber" className={U.right5}>Phone Number</label>
                                <input type="text" defaultValue={phone} className={U.right6} name="pnumber" disabled />
                            </div>
                        </div>

                        <label htmlFor="address" className={U.right5}>Address</label>
                        <textarea defaultValue={uaddress} onChange={(e) => setaddress(e.target.value)} className={U.right7}></textarea>

                        <input type="file" name="avatar" onChange={(e) => setAvatar(e.target.files[0])} />

                        <button type="submit" className={U.right8}>Update</button>
                    </form>

                    <span ref={updateRef} className={U.right9}>Updated</span>
                    <span ref={updateERef} className={U.right11}>Updation Failed</span>
                </div>
            </div>
        </div>
    )
}