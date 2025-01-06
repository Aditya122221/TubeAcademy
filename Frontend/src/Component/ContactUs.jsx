import React, { useRef, useState, useEffect } from "react";
import Navbar from "../JSX/Navbar";
import C from '../CSS/ContactUs.module.css'
import axios from 'axios';
import SB from '../CSS/SendButton.module.css'

export default function Contact() {
    const aRef = useRef(null);
    const formRef = useRef(null);
    const bRef = useRef(null);
    const reachRef = useRef(null);
    const succRef = useRef()
    const unsuccRef = useRef()

    const [succ, setSucc] = useState("");
    const [unsucc, setUnSucc] = useState("");

    const [contactData, setContactData] = useState({
        fullname: "",
        email: "",
        message: ""
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
        if (!(nameValidate(contactData.fullname))) {
            setUnSucc("Name is not valid");
            unsuccRef.current.style.display = "block"
            succRef.current.style.display = "none"
        } else {
            let dataSend = {
                name: contactData.fullname,
                email: contactData.email,
                message: contactData.message
            }
            axios.post("/api/email", dataSend).then((res) => {
                
                setSucc("Email sent")
                succRef.current.style.display = "block"
                unsuccRef.current.style.display = "none"
            }).catch((err) => {
                setUnSucc("Something went wrong");
                console.log(err);
                unsuccRef.current.display = "block"
                succRef.current.style.display = "none"
            })
        }
    }

    function nameValidate(str) {
        const alpharegex = /^[a-z A-Z]+$/
        for (var i = 0; i < str.length; i++) {
            if (!alpharegex.test(str[i])) return false
        }
        if (str.length < 3) return false
        return true
    }

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            window.location.href = '/gotLost';
        }
    })
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
                    <div className={C.a2}>Customer Care: <span className={C.a11}> 9113189281</span></div>
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

                        <button onClick={handleSend} className={SB.button}>
                            <div className={SB.outline}></div>
                            <div className={`${SB.state} ${SB.stateDefault}`}>
                                <div className={SB.icon}>
                                    <svg
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g style={{ filter: 'url(#shadow)' }}>
                                            <path
                                                d="M14.2199 21.63C13.0399 21.63 11.3699 20.8 10.0499 16.83L9.32988 14.67L7.16988 13.95C3.20988 12.63 2.37988 10.96 2.37988 9.78001C2.37988 8.61001 3.20988 6.93001 7.16988 5.60001L15.6599 2.77001C17.7799 2.06001 19.5499 2.27001 20.6399 3.35001C21.7299 4.43001 21.9399 6.21001 21.2299 8.33001L18.3999 16.82C17.0699 20.8 15.3999 21.63 14.2199 21.63ZM7.63988 7.03001C4.85988 7.96001 3.86988 9.06001 3.86988 9.78001C3.86988 10.5 4.85988 11.6 7.63988 12.52L10.1599 13.36C10.3799 13.43 10.5599 13.61 10.6299 13.83L11.4699 16.35C12.3899 19.13 13.4999 20.12 14.2199 20.12C14.9399 20.12 16.0399 19.13 16.9699 16.35L19.7999 7.86001C20.3099 6.32001 20.2199 5.06001 19.5699 4.41001C18.9199 3.76001 17.6599 3.68001 16.1299 4.19001L7.63988 7.03001Z"
                                                fill="currentColor"
                                            ></path>
                                            <path
                                                d="M10.11 14.4C9.92005 14.4 9.73005 14.33 9.58005 14.18C9.29005 13.89 9.29005 13.41 9.58005 13.12L13.16 9.53C13.45 9.24 13.93 9.24 14.22 9.53C14.51 9.82 14.51 10.3 14.22 10.59L10.64 14.18C10.5 14.33 10.3 14.4 10.11 14.4Z"
                                                fill="currentColor"
                                            ></path>
                                        </g>
                                        <defs>
                                            <filter id="shadow">
                                                <feDropShadow
                                                    dx="0"
                                                    dy="1"
                                                    stdDeviation="0.6"
                                                    floodOpacity="0.5"
                                                ></feDropShadow>
                                            </filter>
                                        </defs>
                                    </svg>
                                </div>
                                <p>
                                    <span style={{ "--i": 0 }}>S</span>
                                    <span style={{ "--i": 1 }}>e</span>
                                    <span style={{ "--i": 2 }}>n</span>
                                    <span style={{ "--i": 3 }}>d</span>
                                    <span style={{ "--i": 4 }}>M</span>
                                    <span style={{ "--i": 5 }}>e</span>
                                    <span style={{ "--i": 6 }}>s</span>
                                    <span style={{ "--i": 7 }}>s</span>
                                    <span style={{ "--i": 8 }}>a</span>
                                    <span style={{ "--i": 9 }}>g</span>
                                    <span style={{ "--i": 10 }}>e</span>
                                </p>
                            </div>
                            <div className={`${SB.stateSent}`}>
                                <div className={SB.icon}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        height="1em"
                                        width="1em"
                                        strokeWidth="0.5px"
                                        stroke="black"
                                    >
                                        <g style={{ filter: 'url(#shadow)' }}>
                                            <path
                                                fill="currentColor"
                                                d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
                                            ></path>
                                            <path
                                                fill="currentColor"
                                                d="M10.5795 15.5801C10.3795 15.5801 10.1895 15.5001 10.0495 15.3601L7.21945 12.5301C6.92945 12.2401 6.92945 11.7601 7.21945 11.4701C7.50945 11.1801 7.98945 11.1801 8.27945 11.4701L10.5795 13.7701L15.7195 8.6301C16.0095 8.3401 16.4895 8.3401 16.7795 8.6301C17.0695 8.9201 17.0695 9.4001 16.7795 9.6901L11.1095 15.3601C10.9695 15.5001 10.7795 15.5801 10.5795 15.5801Z"
                                            ></path>
                                        </g>
                                    </svg>
                                </div>
                                <p>
                                    <span style={{ "--i": 5 }}>S</span>
                                    <span style={{ "--i": 6 }}>e</span>
                                    <span style={{ "--i": 7 }}>n</span>
                                    <span style={{ "--i": 8 }}>t</span>
                                </p>
                            </div>
                        </button>

                    </form>
                    <div ref={succRef} className={C.successful}>{succ}</div>
                    <div ref={unsuccRef} className={C.unsuccessful}>{unsucc}</div>
                </div>
                <div ref={reachRef} className={C.reachBox}>

                    <ul className={C.wrapper}>
                        <a href="#" className={`${C.icon} ${C.facebook}`}>
                            <span className={C.tooltip}>Facebook</span>
                            <svg
                                viewBox="0 0 320 512"
                                height="1.2em"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                                className={C.facebook}
                            >
                                <path
                                    d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                                ></path>
                            </svg>
                        </a>
                        <a href="#" className={`${C.icon} ${C.facebook}`}>
                            <span className={C.tooltip}>Twitter</span>
                            <svg
                                height="1.8em"
                                fill="currentColor"
                                viewBox="0 0 48 48"
                                xmlns="http://www.w3.org/2000/svg"
                                className={C.twitter}
                            >
                                <path
                                    d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"
                                ></path>
                            </svg>
                        </a>
                        <a href="#" className={`${C.icon} ${C.instagram}`}>
                            <span className={C.tooltip}>Instagram</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1.2em"
                                fill="currentColor"
                                className={C.instagram}
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
                                ></path>
                            </svg>
                        </a>
                    </ul>

                </div>
            </div>
        </>
    )
}