import React from "react";
import styles from "./weatherBlock.module.css";
import WbSunnyIcon from '@mui/icons-material/WbSunny';

function WeatherBlock(props) {
    const apiKey = process.env.REACT_APP_API_KEY;

    return (
        <div className={styles.container}>
            <div className={styles.weatherWrapper}>
                <div className={styles.currWeatherWrapper}>
                    <div className={styles.currTemp}>
                        <WbSunnyIcon />
                        <p>current temperature</p>
                    </div>
                    <div className={styles.currInfo}>
                        <span>humidity</span>
                        <span>Pressue(convert to khPa)</span>
                        <span>wind speed</span>
                        <span>feels like</span>
                    </div>
                </div>
                <div className={styles.weekReport}>
                    Weekly weather
                </div>
            </div>
        </div>
    );
}

export default WeatherBlock;