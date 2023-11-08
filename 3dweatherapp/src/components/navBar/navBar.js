import React from "react";
import styles from "./navBar.module.css";
import ThemeSwitch from "../themeSwitch/themeSwitch";

function NavBar() {
    return(
        <div className={styles.navBarContainer}>
            NAVBAR
            <ThemeSwitch />
        </div>
    );
}

export default NavBar;