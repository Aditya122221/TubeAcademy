import React, { useState, useEffect, useRef } from "react";
import U from '../CSS/UpdateUser.module.css'
import Leader from '../Images/TeamLeader.png'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";

export default function UpdateUser() {
    const navigate = useNavigate()
    const location = useLocation()
    const [fname, setfname] = useState('')
    const [lname, setlname] = useState('')
    const [uemail, setemail] = useState('')
    const [phone, setphone] = useState('')
    const [uaddress, setaddress] = useState('')
    const [fnameerror, setfnameerror] = useState('')
    const [lnameerror, setlnameerror] = useState('')
    const [role, setRole] = useState('')

    const updateRef = useRef()
    const updateERef = useRef()

    useEffect(() => {
        setfname(location.state.fName)
        setlname(location.state.lName)
        setemail(location.state.email)
        setphone(location.state.pNumber)
        setaddress(location.state.address)
        setRole(JSON.parse(localStorage.getItem('role')))
        if (localStorage.getItem('token') === null) {
            window.location.href = '/gotLost';
        }
    }, [])

    const updateData = (e) => {
        e.preventDefault()
        const alpharegex = /^[a-zA-Z]+$/
        if (fname.length < 3 || !alpharegex.test(fname)) setfnameerror("First Name is not valid")
        else if (lname.length < 3 || !alpharegex.test(lname)) setlnameerror("Last Name is not a vailid")
        else {
            const payload = {
                fName: fname,
                lName: lname,
                pNumber: phone,
                uEmail: uemail,
                uAddress: uaddress,
                urole: role
            }
            axios.post("http://localhost:3000/update", payload).then((res) => {
                updateRef.current.style.display = "block"
                updateERef.current.style.display = "none"
            }).catch((err) => {
                updateRef.current.style.display = "none"
                updateERef.current.style.display = "block"
                console.log(err);
            })
            console.log(payload);
        }
    }

    return (
        <div className={U.update}>
            <div className={U.updateHeader}>
                {/* ----------------------------left------------------------------- */}
                <div className={U.left}>
                    <div className={U.left1}>
                        <div className={U.left2}>
                            <img src={Leader} className={U.left3} alt="" />
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
                        <Link to='/' className={U.left12}>
                            <div className={U.left13}>Home</div>
                        </Link>
                    </div>
                </div>
                <div className={U.right}>
                    <div className={U.right1}>Update Data</div>

                    <form className={U.right2}>
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
                                <input type="text" defaultValue={uemail} onChange={(e) => setemail(e.target.value)} className={U.right6} name="email" required />
                            </div>
                            <div className={U.right4}>
                                <label htmlFor="pnumber" className={U.right5}>Phone Number</label>
                                <input type="text" defaultValue={phone} className={U.right6} name="pnumber" disabled />
                            </div>
                        </div>
                        <label htmlFor="address" className={U.right5}>Address</label>
                        <textarea required defaultValue={uaddress} onChange={(e) => setaddress(e.target.value)} className={U.right7}></textarea>
                        <button onClick={updateData} type="submit" className={U.right8}>Update</button>
                    </form>

                    <span ref={updateRef} className={U.right9}>Updated</span>
                    <span ref={updateERef} className={U.right11}>Updation Failed</span>
                </div>
            </div>
        </div>
    )
}