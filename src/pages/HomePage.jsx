import React, { useRef } from "react";
import { Header } from '../components/home/Header'
import { HomeTitle } from "../components/home/HomeTitle";
import { About } from "../components/home/About";
import { Skills } from "../components/home/Skills";
import { Contact } from "../components/home/Contact";
import { Footer } from "../components/home/Footer";

export function HomePage() {

    const homeRef = useRef(null)
    const aboutRef = useRef(null)
    const skillsRef = useRef(null)
    const contactRef = useRef(null)

    const refs = {
        'home': homeRef,
        'about': aboutRef,
        'skills': skillsRef,
        'contact': contactRef
    }

    const scrollToView = (ref) => {
        refs[ref].current?.scrollIntoView({
            behavior: 'smooth'
        })
    }

    return (
        <>
            <Header onClick={scrollToView} />
            <HomeTitle />
            <About refs={aboutRef} />
            <Skills refs={skillsRef} />
            <Contact refs={contactRef} />
            <Footer />
        </>
    )

}