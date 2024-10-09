import React, { useRef, useState } from "react";
import Navbar from "../JSX/Navbar";
import C from '../CSS/ContactUs.module.css'
import axios from 'axios';

export default function Contact() {
    const aRef = useRef(null);
    const formRef = useRef(null);
    const bRef = useRef(null);
    const reachRef = useRef(null);

    const [succ, setSucc] = useState("");
    const [unsucc, setUnSucc] = useState("");

    const [contactData, setContactData] = useState({
        fullname: "Aditya Kumar",
        email: "adityakumar122221@gmail.com",
        message: "This is a test message"
    });

    const handleA = () => {
        aRef.current.style.backgroundColor = "#edecec"
        formRef.current.style.display = "flex";
        bRef.current.style.backgroundColor = "white";
        reachRef.current.style.display = "none";
    }
    const handleB = () => {
        aRef.current.style.backgroundColor = "white"
        formRef.current.style.display = "none";
        bRef.current.style.backgroundColor = "#edecec";
        reachRef.current.style.display = "flex";
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setContactData({ ...contactData, [name]: value })
    }

    const handleSend = async (e) => {
        e.preventDefault();
        const alpharegex = /^[a-z A-Z]+$/
        if (!(alpharegex.test(contactData.name))) {
            setUnSucc("Name is not valid");
        } else {
            let dataSend = {
                name: contactData.fullname,
                email: contactData.email,
                message: contactData.message
            }
            console.log(dataSend);
            axios.post("http://localhost:3000/email", dataSend).then((res) => {
                setSucc = "Email sent"
            }).catch((err) => {
                setUnSucc = "Something went wrong";
                console.log(err);
            })
        }
    }
    return (
        <>
            <Navbar />
            <div className={C.contact}>
                <div className={C.button}>
                    <div ref={aRef} onClick={handleA} className={C.contacting}>
                        <span className="material-symbols-outlined" id={C.elu}>
                            connect_without_contact
                        </span>
                        <div className={C.textContact}>Contact Us</div>
                    </div>
                    <div ref={bRef} onClick={handleB} className={C.reachUs}>
                        <span className="material-symbols-outlined" id={C.elu}>
                            rocket_launch
                        </span>
                        <div className={C.textReach}>Reach Us</div>
                    </div>
                </div>
                <div ref={formRef} className={C.formBox}>
                    <div className={C.a1}>Contact Us</div>
                    <div className={C.a2}>Customer Care: <span className={C.a11}>022-69856666</span></div>
                    <form className={C.form}>
                        <div className={C.a3}>
                            <div className={C.a4}>
                                <label htmlFor="name" className={C.label}>Name</label>
                                <input value={contactData.fullname} type="text" required name="fullname" className={C.input} onChange={handleChange} />
                            </div>
                            <div className={C.a4}>
                                <label htmlFor="email" className={C.label}>Email</label>
                                <input type="email" required value={contactData.email} name="email" className={C.input} onChange={handleChange} />
                            </div>
                        </div>
                        <label htmlFor="message" className={C.label}>Message</label>
                        <textarea value={contactData.message} onChange={handleChange} required name="message" className={C.textArea}></textarea>
                        <button onClick={handleSend} className={C.sendButton}>Send</button>
                    </form>
                    <div className={C.succ}>{succ}</div>
                    <div className={C.unsucc}>{unsucc}</div>
                </div>
                <div ref={reachRef} className={C.reachBox}>
                    <a href="#" className={`${C.b1} ${C.instaa}`}>
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href="#" className={`${C.b1} ${C.facee}`}>
                        <i className="fa-brands fa-square-facebook"></i>
                    </a>
                    <a href="#" className={`${C.b1} ${C.emaa}`}>
                        <i className="fa-regular fa-envelope"></i>
                    </a>
                    <a href="#" className={`${C.b1} ${C.phoo}`} id="pp">
                        <i className="fa-solid fa-phone"></i>
                    </a>
                </div>
            </div>
        </>
    )
}
