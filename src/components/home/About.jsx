import React, { useEffect } from "react";
import { Title } from "../utils/Title";
import { Quote } from "../svg/Quote";
import AboutImg from "../../assets/img/fax.png";
import EmailSvg from "../../assets/img/email.png";
import GithubSvg from "../../assets/img/github.png";
import LinkedinSvg from "../../assets/img/linkedin.png";
import { Btn } from "../utils/Btn";
import Aos from "aos";

export function About({refs}) {

    useEffect(() => {
        Aos.init({duration:2000})
    },[])

    return(
        <div className="l-container" id="about" ref={refs}>
            <div className="about-section">
                <Title value="about me"/>
                <div className="about-description">
                    <div className="quotes-left">
                        <Quote />
                        <Quote />
                    </div>
                    <p>I'm a Fullstack Developper who have skills on React Js and Spring. I'm abble to create any kind of website and ready for new challenges. Actually, I'm looking for new opportunities and open for collaboration on your projects.</p>
                    <div className="quotes-right">
                        <Quote />
                        <Quote />
                    </div>
                </div>
                <div className="about-content">
                    <div className="about-image-container">
                        <div className="about-image-bg">
                        </div>
                        <div className="about-image">
                            <img src={AboutImg} alt="about's svg image" data-aos="fade-left"/>
                        </div>
                    </div>
                    <div className="social-media">
                        <a href="#" className="social-content">
                            <div className="social-icon">
                                <img src={EmailSvg} alt="email svg" />
                            </div>
                            <div className="social-info">
                                faniryram0@gmail.com
                            </div>
                        </a>
                        <a href="#" className="social-content">
                            <div className="social-icon">
                                <img src={GithubSvg} alt="github svg" />
                            </div>
                            <div className="social-info">
                                faniryram0@gmail.com
                            </div>
                        </a>
                        <a href="#" className="social-content">
                            <div className="social-icon">
                                <img src={LinkedinSvg} alt="linkedin svg" />
                            </div>
                            <div className="social-info">
                                faniryram0@gmail.com
                            </div>
                        </a>
                    </div>
                </div>
                <div className="about-btn">
                    <Btn>Download my CV</Btn>
                </div>
            </div>
        </div>
    )

}