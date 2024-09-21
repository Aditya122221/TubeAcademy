import React, { useRef } from "react";
import Navbar from "../JSX/Navbar";
import C from '../CSS/ContactUs.module.css'

export default function Contact() {
    const aRef = useRef(null);
    const formRef = useRef(null);
    const bRef = useRef(null);
    const reachRef = useRef(null);

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
    return (
        <>
            <Navbar />
            <div className={C.contact}>
                <div className={C.button}>
                    <div ref={aRef} onClick={handleA} className={C.contacting}>
                        <span class="material-symbols-outlined" id={C.elu}>
                            connect_without_contact
                        </span>
                        <div className={C.textContact}>Contact Us</div>
                    </div>
                    <div ref={bRef} onClick={handleB} className={C.reachUs}>
                        <span class="material-symbols-outlined" id={C.elu}>
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
                                <input type="text" name="name" className={C.input} />
                            </div>
                            <div className={C.a4}>
                                <label htmlFor="email" className={C.label}>Email</label>
                                <input type="email" name="email" className={C.input} />
                            </div>
                        </div>
                        <label htmlFor="message" className={C.label}>Message</label>
                        <textarea className={C.textArea}></textarea>
                    </form>
                </div>
                <div ref={reachRef} className={C.reachBox}>
                    <a href="#" className={`${C.b1} ${C.instaa}`}>
                        <i class="fa-brands fa-instagram"></i>
                    </a>
                    <a href="#" className={`${C.b1} ${C.facee}`}>
                        <i class="fa-brands fa-square-facebook"></i>
                    </a>
                    <a href="#" className={`${C.b1} ${C.emaa}`}>
                        <i class="fa-regular fa-envelope"></i>
                    </a>
                    <a href="#" className={`${C.b1} ${C.phoo}`} id="pp">
                        <i class="fa-solid fa-phone"></i>
                    </a>
                </div>
            </div>
        </>
    )
}