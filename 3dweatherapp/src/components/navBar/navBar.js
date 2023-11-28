import React, { useContext } from "react";
import styles from "./navBar.module.css";
import ThemeSwitch from "../themeSwitch/themeSwitch";
import { ThemeContext } from "../../contexts/themeContext";

function NavBar() {
    const { theme } = useContext(ThemeContext);
    return(
        <div className={styles.navBarContainer} data-theme={theme}>
            <ThemeSwitch />
        </div>
    );
}

export default NavBar;