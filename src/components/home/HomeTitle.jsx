import React, { useEffect } from "react";
import Img from '../../assets/img/img.jpg'
import { Btn } from "../utils/Btn";
import { SectionForm } from "../utils/Section";
import Aos from "aos";

export function HomeTitle() {

    useEffect(() => {
        Aos.init({duration: 2000})
    })

    return(
        <div className="home-container" id="home">
            <div className="home-title-container">
                <div className="l-container">
                    <div className="home-title">
                        <div className="image-section">
                            <div className="image-content" data-aos="fade-left" >
                                <div className="image-content-border">
                                    <img src={Img} alt="profil-image" />
                                </div>
                            </div>
                        </div>
                        <section className="title-section" data-aos="fade-right" >
                            <SectionForm />
                            <div className="title-content">
                                <h2>fullstack developper</h2>
                                <h1>ANDRY RAMANITRARIVO</h1>
                                <h1>Faniriniaina</h1>
                                <p>I'm a Fullstack Developper and made this portfolio with React js for the Frontend and spring for the Backend.</p>
                                <Btn>hire me</Btn>
                            </div>
                        </section>
                    </div>
                </div>
                <div className="image-bg-container">
                    <div className="image-bg"></div>
                    <div className="image-bg-square"></div>
                </div>
            </div>
            <div className="home-round-bg"></div>
        </div>
    )
}