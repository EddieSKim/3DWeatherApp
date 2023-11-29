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
            if (currTime < 12 || currTime === 24) {
                return `${hour12} AM`;
            } else {
                if (currTime === 12) {
                    return `12 PM`
                }
                return `${hour12} PM`
            }
        }

        setHourWeather(weather);
        setTime(convertTime(weather.dt));
    }, [])

    return (
        <div className={styles.hourItemContainer}>
            <div className={styles.itemWrapper}>
                {
                    hourWeather.weather && (
                        <>
                            <div className={styles.hourlyHeader}>{time}</div>
                            <img className={styles.hourlyIcon}
                                src={`https://openweathermap.org/img/wn/${hourWeather.weather[0].icon}@2x.png`} />
                            <div className={styles.hourlyHeader}>{Math.round(hourWeather.temp)}&deg;C</div>
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default HourlyWeatherItem;