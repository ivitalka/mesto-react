import logo from "../images/logo.svg";
import React from "react";


function Header() {
    return(
        <header className="header">
            <div className="logo header__logo" style={{backgroundImage: `url(${logo})`}}/>
        </header>
    )
}

export default Header;