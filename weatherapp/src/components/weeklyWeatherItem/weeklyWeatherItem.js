import React, { useState, useEffect } from "react";
import styles from "./weeklyWeatherItem.module.css"

const days = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun"
]

function WeeklyWeatherItem({ weather }) {
    const [weatherItem, setWeatherItem] = useState({});
    const [weekDay, setWeekDay] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const convertEpoch = (epoch) => {
            return new Date(epoch * 1000);
        }
        setWeatherItem(weather);
        setWeekDay(days[convertEpoch(weather.dt).getUTCDay()]);
        setIsLoading(false)
    }, [])



    return (
        <div className={styles.weatherItemContainer}>
            {
                !isLoading && (
                    <>
                        <span id={styles.dayName}>{weekDay}</span>
                        <img
                            src={`https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png`}
                            alt="weeklyIcon"
                            className={styles.weekIcon} />
                        <div className={styles.minMaxTemp}>
                            <span id={styles.maxTemp}>
                                {Math.round(weatherItem.temp.max)}&deg;C
                            </span> /
                            <span id={styles.minTemp}>
                                {Math.round(weatherItem.temp.min)}&deg;C
                            </span>
                        </div>
                    </>
                )
            }

        </div>
    );
}

export default WeeklyWeatherItem;