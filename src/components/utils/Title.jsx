import React, { useEffect } from "react";
import Aos from "aos";

export function Title({value}) {

    useEffect(() => {
        Aos.init({duration:2000})
    },[])

    return(
        <div className="main-title-container" data-aos="fade-up">
            <h2 className="main-title-content">
                {value}
            </h2>
        </div>
    )

}