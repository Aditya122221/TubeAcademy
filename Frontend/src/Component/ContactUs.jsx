import { useRef, useState, useEffect } from "react";
import Navbar from "../JSX/Navbar";
import C from '../CSS/ContactUs.module.css'
import axios from 'axios';

export default function Contact() {
    const succRef = useRef()
    const unsuccRef = useRef()

    const [succ, setSucc] = useState("");
    const [unsucc, setUnSucc] = useState("");

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        message: ''
    });

    const Registration_ID = localStorage.getItem("RegID")

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!(nameValidate(formData.fullName))) {
            setUnSucc("Name is not valid");
            unsuccRef.current.style.display = "block"
            succRef.current.style.display = "none"
        } else {
            let dataSend = {
                Registration_ID,
                name: formData.fullName,
                email: formData.email,
                message: formData.message
            }
            axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/email`, dataSend).then((res) => {

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
            window.location.href = '/';
        }
    })
    return (
        <>
            <Navbar />
            <div className={C.container}>
                <div className={C.formWrapper}>
                    <div className={C.header}>
                        <h1 className={C.title}>Contact Us</h1>
                        <p className={C.subtitle}>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                    </div>

                    <form className={C.form} onSubmit={handleSend}>
                        <div className={C.inputGroup}>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Full Name"
                                className={C.input}
                                required
                                aria-label="Full Name"
                            />
                        </div>

                        <div className={C.inputGroup}>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address"
                                className={C.input}
                                required
                                aria-label="Email Address"
                            />
                        </div>

                        <div className={C.inputGroup}>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your Message"
                                className={`${C.input} ${C.textarea}`}
                                rows="6"
                                required
                                aria-label="Your Message"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className={C.submitButton}
                            aria-label="Submit contact form"
                        >
                            Send Message
                        </button>
                    </form>
                    <div ref={succRef} className={C.successful}>{succ}</div>
                    <div ref={unsuccRef} className={C.unsuccessful}>{unsucc}</div>
                </div>
            </div>
        </>
    )
}