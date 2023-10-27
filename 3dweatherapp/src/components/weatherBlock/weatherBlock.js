import React from "react";
import styles from "./weatherBlock.module.css";
import WbSunnyIcon from '@mui/icons-material/WbSunny';

function WeatherBlock({ weather }) {
    const apiKey = process.env.REACT_APP_API_KEY;

    return (
        <div className={styles.container}>
            
        </div>
    );
}

export default WeatherBlock;