import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/themeContext";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import Switch from '@mui/joy/Switch';

function ThemeSwitch() {
    const { switchTheme, theme } = useContext(ThemeContext);

    // Switch from mui/joy allows easier customization
    return (
        <div style={{ marginRight: "10px" }}>
            <Switch
                color={theme === "dark" ? 'primary' : 'warning'}
                onClick={switchTheme}
                checked={theme === "dark"}
                size="lg"
                startDecorator={
                    <Brightness5Icon sx={{
                        color: theme === "dark" ? 'grey' : '#f5ba1d',
                        filter: theme === "dark" ? '' : 'drop-shadow(0 0 10px #ebd088)',
                    }} />
                }
                endDecorator={
                    <DarkModeIcon sx={{
                        color: theme === "dark" ? '#fff' : 'grey',
                        filter: theme === "dark" ? 'drop-shadow(0 0 10px #fff)' : '',
                    }} />
                }
                sx={{
                    "--Switch-trackWidth": "50px",
                    "--Switch-trackRadius": "24px",
                    "--Switch-trackHeight": "25px",
                    "--Switch-gap": "11px",
                    '--Switch-trackBackground': '#f5ba1d',
                    '&:hover': {
                        '--Switch-trackBackground': '#f5ba1d',
                    },
                    '&.Mui-checked': {
                        '--Switch-trackBackground': 'grey',
                    },
                    '&.Mui-checked:hover': {
                        '--Switch-trackBackground': 'grey',
                    },
                }}
            />
        </div>
    );
}

export default ThemeSwitch;
