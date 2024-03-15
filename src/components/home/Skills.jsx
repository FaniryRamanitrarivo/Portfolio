import React, { useEffect } from "react";
import { Title } from "../utils/Title";
import CssImg from "../../assets/img/css.png";
import SassImg from "../../assets/img/sass.svg";
import NpmImg from "../../assets/img/npm.svg";
import GithubImg from "../../assets/img/github.png";
import ReactImg from "../../assets/img/reactjs.svg";
import SymfonyImg from "../../assets/img/symfony.png";
import AdobexdImg from "../../assets/img/adobexd.svg";
import SpringImg from "../../assets/img/springboot.svg";
import HtmlImg from "../../assets/img/html.png";
import { SectionForm } from "../utils/Section";
import Aos from "aos";

export function Skills({refs}) {

    useEffect(() => {
        Aos.init({duration: 2000})
    })

    return(
        <div className="skills-section" ref={refs}>
            <div className="l-container">
                <Title value="my skills" />
                <p>As a Fullstack Developper, I have many skills that can be used in making and realising lots of project. Actually, I'm able to realise websites with the following technologies :</p>
                <div className="skill-section" data-aos="fade-in">
                    <SectionForm />
                    <div className="skill-main">
                        <h3>web sections :</h3>
                        <div className="skill-container">
                            <div className="skill-content">
                                <h4>UI/UX Design</h4>
                                <div className="skill-tech">
                                    <div className="tech-icon">
                                        <img src={AdobexdImg} alt="adobexd icon" />
                                    </div>
                                </div>
                            </div>
                            <div className="skill-content">
                                <h4>frontend</h4>
                                <div className="skill-tech">
                                    <div className="tech-icon">
                                        <img src={HtmlImg} alt="html icon" />
                                    </div>
                                    <div className="tech-icon">
                                        <img src={CssImg} alt="css icon" />
                                    </div>
                                    <div className="tech-icon">
                                        <img src={ReactImg} alt="reactjs icon" />
                                    </div>
                                </div>
                            </div>
                            <div className="skill-content">
                                <h4>Backend</h4>
                                <div className="skill-tech">
                                    <div className="tech-icon">
                                        <img src={SymfonyImg} alt="symfony icon" />
                                    </div>
                                    <div className="tech-icon">
                                        <img src={SpringImg} alt="spring icon" />
                                    </div>
                                </div>
                            </div>
                            <div className="skill-content">
                                <h4>tools</h4>
                                <div className="skill-tech">
                                    <div className="tech-icon">
                                        <img src={SassImg} alt="sass icon" />
                                    </div>
                                    <div className="tech-icon">
                                        <img src={GithubImg} alt="github icon" />
                                    </div>
                                    <div className="tech-icon">
                                        <img src={NpmImg} alt="npm icon" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="skill-section skill-desktop" data-aos="fade-in">
                    <SectionForm />
                    <div className="skill-main">
                        <h3>Desktop sections :</h3>
                        <div className="skill-container">
                            <h4>java swing</h4>
                            <h4>javaFx</h4>
                        </div>
                    </div>
                </div>
                <a href="#" className="link">See more on my GitHub</a>
            </div>
        </div>
    )

}