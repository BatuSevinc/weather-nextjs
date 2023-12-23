import Image from 'next/image'
import React from 'react'

const Cards = ({allForecastsAt12Hour}) => {

  if(!allForecastsAt12Hour) {
    return <div>Yükleniyor..</div>
  }
  else {

  return (
    <div className='flex justify-center flex-wrap overflow-auto max-h-[320px] gap-5 lg:mx-24 mt-12 sm:mt-24 p-2' >
{allForecastsAt12Hour.map((forecastsAt12Hour, index) => (
  <div key={index} style={{minHeight: "min-content"}} className={`relative rounded-3xl text-center min-w-[200px] ${forecastsAt12Hour.weather && forecastsAt12Hour.weather[0] && forecastsAt12Hour.weather[0].main === "Clouds" ? "bg-gradient-to-r from-violet-500 to-fuchsia-500" : forecastsAt12Hour.weather[0].main === "Rain" ? "bg-gradient-to-r from-purple-500 to-pink-500" : forecastsAt12Hour.weather[0].main === "Clear" ? "bg-gradient-to-r from-cyan-500 to-blue-500" : "bg-gradient-to-r from-sky-500 to-indigo-500"} `}>
    {forecastsAt12Hour.weather && forecastsAt12Hour.weather[0] && forecastsAt12Hour.weather[0].icon && (
      <div className='flex justify-center relative'>
        <Image
          src={`http://openweathermap.org/img/wn/${forecastsAt12Hour.weather[0].icon}@2x.png`}
          alt='weather icon'
          width='140'
          height='140'
          className='z-10 ml-4 p-2 m-2 rounded-full'
          priority={true}
          placeholder='empty'
          loading="eager"
        />
      </div>
    )}
    {forecastsAt12Hour.main && forecastsAt12Hour.main.temp && (
      <div className='text-4xl pl-5 -mt-10 text-white'>
        {(forecastsAt12Hour.main.temp - 273.15).toFixed(0)}&#176;
      </div>
    )}
    {forecastsAt12Hour.weather && forecastsAt12Hour.weather[0] && forecastsAt12Hour.weather[0].main && (
      <div className='text-white font-semibold'>{forecastsAt12Hour.weather[0].main}</div>
    )

    }
    {forecastsAt12Hour.dt_txt && (
      <>
      <p className='text-white text-[10px]'>
        {new Date(forecastsAt12Hour.dt_txt).toLocaleDateString('tr-TR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
    
    <p className='text-white text-[10px]'>
    {new Date(forecastsAt12Hour.dt_txt).toLocaleDateString('tr-TR', { weekday: 'long' })}
    </p>
    </>
    )}
    {
      (forecastsAt12Hour.main && forecastsAt12Hour.wind && forecastsAt12Hour.wind.speed) && 
      <div className='flex justify-between p-1 text-white text-[10px]'>
        <p>
          Hissedilen Sıcaklık <br />
          {(forecastsAt12Hour.main.feels_like -273.15).toFixed(0)}&#176;
        </p>
        <p>
          Rüzgar Hızı <br />
        {forecastsAt12Hour.wind.speed}
        </p>
      </div>
    }
    <div className='absolute top-1 right-3 text-[11px] text-white'>12:00</div>
  </div>
))}
</div>
  )
}
}

export default Cards

