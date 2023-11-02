import React, { useState, useEffect } from "react";
import styles from "./hourlyWeatherItem.module.css";

function HourlyWeatherItem({ weather }) {
    const [hourWeather, setHourWeather] = useState({});
    const [time, setTime] = useState("");

    useEffect(() => {
        const convertEpochToDateTime = (epoch) => {
            return new Date(epoch * 1000);
        }
        // convert time to 12 hour clock
        const convertTime = (time) => {
            let currTime = convertEpochToDateTime(time).getHours();
            let hour12 = currTime % 12;
            if(currTime < 12 || currTime === 24) {
                return `${hour12} AM`;
            } else {
                return `${hour12} PM`
            }
        }

        setHourWeather(weather);
        setTime(convertTime(weather.dt));
    }, [])

    return (
        <div className={styles.hourItemContainer}>
            <div className={styles.itemWrapper}>
                <div>{time}</div>
                <div>{Math.round(hourWeather.temp)}&deg;C</div>
            </div>
        </div>
    );
}

export default HourlyWeatherItem;