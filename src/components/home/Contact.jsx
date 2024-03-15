import React, { useEffect } from "react";
import { Title } from "../utils/Title";
import ContactImg from "../../assets/img/contact.jpg";
import Aos from "aos";

export function Contact({refs}) {

    useEffect(() => {
        Aos.init({duration:2000})
    },[])

    return(
        <div className="contact-section" ref={refs}>
            <Title value="contact me" />
            <div className="l-container">
                <div className="form-container" data-aos="fade-right">
                    <h3>contact me now</h3>
                    <form action="" className="form">
                        <div className="form-group">
                            <input type="email" id="email" name="email" required />
                            <label htmlFor="email">Email Address</label>
                        </div>
                        <div className="form-group">
                            <input type="text" id="name" name="name" required />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-group">
                            <textarea name="message" id="message" required ></textarea>
                            <label htmlFor="message">Message</label>
                        </div>
                        <button className="btn-contact">
                            Send your message
                        </button>
                    </form>
                </div>
                <div className="contact-img-container" data-aos="fade-left">
                    <div className="contact-img">
                        <img src={ContactImg} alt="contact background image" />
                    </div>
                    <div className="contact-description">
                        <div className="contact-description-content">
                            Contact me for collaborations
                        </div>
                        <div className="contact-description-content">
                            Let's work together and realize your dream project
                        </div>
                        <div className="contact-description-content">
                            Create tomorrow's technologies by making it together today
                        </div>
                    </div>
                    <div className="pagination">
                        <a href="#" className="is-pagination-active"></a>
                        <a href="#"></a>
                        <a href="#"></a>
                    </div>
                </div>
            </div>
        </div>
    )

}