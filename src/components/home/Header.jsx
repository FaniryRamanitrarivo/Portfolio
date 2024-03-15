import React, { useState } from "react";
import { Hamburger } from "../svg/Menu";

export function Header({onClick}) {

    const [currentPage,setCurrentPage] = useState("/")
    const [isMenuActive,SetIsMenuActive] = useState(false)

    const handleClick = (e) => {
        const ref = e.target.href.split("#")[1]
        setCurrentPage(e.target.innerText.toLowerCase())
        onClick(ref)
    }
    
    const setActiveToCurrentPage = (page) => {
        return page === currentPage ? "is-active": ""
    }

    const handleHamburgerClick = (e) => {
        e.preventDefault()
        SetIsMenuActive(!isMenuActive)
    }

    const navClassName =  isMenuActive ? "l-navbar is-menu-active": "l-navbar"  

    return (
        <header className="l-header">
            <div className="l-container">
                <div className="logo">
                    Port<span>Folio.</span>
                </div>
                <nav className={navClassName}>
                    <a href="#" className={setActiveToCurrentPage("/")}>home</a>
                    <a href="#about" className={setActiveToCurrentPage("/#about")} onClick={handleClick}>about</a>
                    <a href="#skills" className={setActiveToCurrentPage("/#skills")} onClick={handleClick}>skills</a>
                    <a href="#projects" className={setActiveToCurrentPage("/#projects")}>projects</a>
                    <a href="#contact" className={setActiveToCurrentPage("/#contact")} onClick={handleClick}>contact</a>
                </nav>
                <div className="menu-hamburger" onClick={handleHamburgerClick} >
                    <a href="#"><Hamburger /></a>
                </div>
            </div>
        </header>
    )

}