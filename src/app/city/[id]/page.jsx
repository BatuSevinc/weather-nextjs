"use client";
import React, { useEffect, useState } from "react";
import { useCity } from "../../context";
import axios from "axios";
import {
  Info,
  Navbar,
  Lightning,
  filterDailyWeather,
  Cards,
} from "../../helpers";
import Image from "next/image";

const Page = () => {
  const { selectedCity } = useCity();
  const [datas, setDatas] = useState(null);
  const [bgImage, setBgImage] = useState(Lightning);
  const [dailyForecast, setDailyForecast] = useState(null);
  const [allForecastsAt12Hour, setAllForecastsAt12Hour] = useState([]);
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    if (selectedCity) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${
        selectedCity.name || selectedCity
      }&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
      axios.get(url).then((response) => {
        setDatas(response.data);
      });

      const weeklyForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${
        selectedCity.name || selectedCity
      }&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
      axios.get(weeklyForecastUrl).then((response) => {
        setDailyForecast(response.data);
      });
      setLoading(false)
    }
  }, [selectedCity]);

  useEffect(() => {
    if (dailyForecast && dailyForecast.list) {
      const numberOfDays = 4;
      const daysForecasts = filterDailyWeather(dailyForecast, numberOfDays);

      const updatedAllForecastsAt12Hour = [];

      Object.keys(daysForecasts).forEach((day) => {
        const forecastsForDay = daysForecasts[day];

        const forecastsAt12 = forecastsForDay.filter((forecast) => {
          const date = new Date(forecast.dt_txt);
          return date.getHours() === 12;
        });

        updatedAllForecastsAt12Hour.push(...forecastsAt12);
      });

      setAllForecastsAt12Hour(updatedAllForecastsAt12Hour);
    }
  }, [dailyForecast]);

  return (
    <div>
      <Image
        src={bgImage}
        quality={100}
        alt="bg-image"
        className="-z-10 object-cover"
        fill
        loading="eager"
        priority={true}
      />
      <Navbar weather={datas} selectedCity={selectedCity} />
      <Info weather={datas} selectedCity={selectedCity} />
      <Cards allForecastsAt12Hour={allForecastsAt12Hour} />
    </div>
  );
};

export default Page;
