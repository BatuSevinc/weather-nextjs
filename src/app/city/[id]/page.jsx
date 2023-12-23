"use client"
import React, { useEffect, useState } from 'react';
import { useCity } from '../../context';
import axios from 'axios';
import {Info, Navbar,
  Cloud,
  Normal,
  Lightning,
  Mist,
  Rain,
  Snow,
  Sun,
  Windy,
  CitySkeleton,
  filterDailyWeather,
  Cards
} from '../../helpers'
import Image from 'next/image';


const Page = () => {
  const { selectedCity } = useCity();
  const [datas,setDatas] = useState(null)
  const [bgImage,setBgImage] = useState(null)
  const [dailyForecast, setDailyForecast] = useState(null);
  const [allForecastsAt12Hour, setAllForecastsAt12Hour] = useState([]);

  useEffect(() => {
    if (selectedCity) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity.name || selectedCity}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
      axios.get(url).then((response) => {
        setDatas(response.data);
      });
  
      const weeklyForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity.name || selectedCity}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
      axios.get(weeklyForecastUrl).then((response) => {
        setDailyForecast(response.data);
      });
    }
  }, [selectedCity]);
  

  useEffect(() => {
    if (dailyForecast && dailyForecast.list) {
      const numberOfDays = 4;
      const daysForecasts = filterDailyWeather(dailyForecast, numberOfDays);

      const updatedAllForecastsAt12Hour = [];

      Object.keys(daysForecasts).forEach(day => {
        const forecastsForDay = daysForecasts[day];

        const forecastsAt12 = forecastsForDay.filter(forecast => {
          const date = new Date(forecast.dt_txt);
          return date.getHours() === 12;
        });

        updatedAllForecastsAt12Hour.push(...forecastsAt12);
      });

      setAllForecastsAt12Hour(updatedAllForecastsAt12Hour);
    }
  }, [dailyForecast]);
  
  useEffect(() => {
    if(datas && datas.weather){
    const determineBgImage = async () => {
      if (datas.weather[0].main === "Clouds") {
        setBgImage(Cloud);
      } else if (datas.weather[0].main === "Rain") {
        setBgImage(Rain);
      } else if (
        datas.weather[0].main === "Mist" ||
        datas.weather[0].main === "Fog" ||
        datas.weather[0].main === "Smoke" ||
        datas.weather[0].main === "Haze"
      ) {
        setBgImage(Mist);
      } else if (datas.weather[0].main === "Snow") {
        setBgImage(Snow);
      } else if (datas.weather[0].main === "Windy") {
        setBgImage(Windy);
      } else if (
        datas.weather[0].main === "Squall" ||
        datas.weather[0].main === "Thunderstorm"
      ) {
        setBgImage(Lightning);
      }
      else{
        setBgImage(Normal);
      }
    }
    determineBgImage()
    }
  }, [datas]);

  if (!bgImage) {
    return <div className='absolute h-screen bg-black text-white w-screen top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
      <CitySkeleton/>
    </div>
  }

  return (
    <div>
       <Image
        src={bgImage}
        quality={100}
        alt='bg-image'
        className="-z-10 object-cover"
        fill
        loading="eager"
        priority={true}
      />
      <Navbar weather={datas} selectedCity={selectedCity}/>
      <Info weather={datas} selectedCity={selectedCity}/>
      <Cards allForecastsAt12Hour={allForecastsAt12Hour}/>
    </div>
  );
};

export default Page;