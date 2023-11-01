import React, { useState, useEffect } from "react";
import styles from "./weeklyWeatherItem.module.css"

const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
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
                !isLoading ? (
                    <>
                        <span id={styles.dayName}>{weekDay}</span>
                        <span id={styles.minMaxTemp}>{Math.round(weatherItem.temp.max)}&deg;C / 
                        {Math.round(weatherItem.temp.min)}&deg;C</span>
                    </>
                ) : (
                    <div>
                        Loading
                    </div>
                )
            }

        </div>
    );
}

export default WeeklyWeatherItem;