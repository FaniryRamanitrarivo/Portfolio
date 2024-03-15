import React, { useEffect } from "react";
import Aos from "aos";

export function Footer() {

    const actualYear = new Date().getFullYear()

    useEffect(() => {
        Aos.init({duration:2000})
    },[])

    return(
        <footer className="l-footer">
            <div className="l-container">
                <div className="footer-top-container" data-aos="fade-down">
                    <div className="footer-top">
                        <h4>Let's work together on realising your dream project</h4>
                        <a href="#" className="btn">Contact me</a>
                    </div>
                </div>
                <div className="footer-main">
                    <div className="link-icons">

                    </div>
                    <div className="copyright">
                        &copy; copyright 2023 - {actualYear}
                    </div>
                </div>
            </div>
        </footer>
    )

}