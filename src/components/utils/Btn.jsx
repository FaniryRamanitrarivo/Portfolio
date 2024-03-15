import React from "react";
import { BtnSvg } from "../svg/Svg";

export function Btn({children}) {

    return(
        <button className="btn">
            {children}
            <span><BtnSvg /></span>
        </button>
    )
    
}                        
