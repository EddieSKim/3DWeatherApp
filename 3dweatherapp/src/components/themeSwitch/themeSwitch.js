import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/themeContext";
import { Switch } from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness5Icon from '@mui/icons-material/Brightness5';

function ThemeSwitch() {
    const { switchTheme, theme } = useContext(ThemeContext);

    return (
        <div>
            <Switch 
            onClick={switchTheme} 
            checked={theme==="dark"}/>
        </div>
    );
}

export default ThemeSwitch;
