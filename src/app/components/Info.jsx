import Image from 'next/image';
import { CitySkeleton, getSunRise, getSunSet } from '../helpers';

const Info = ({weather,selectedCity}) => {


  if(!weather){
    <div className='absolute h-screen bg-black text-white w-screen top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
      <CitySkeleton/>
    </div>
  } else {

  return (
    <div className='relative flex flex-wrap justify-between lg:mx-24 px-8'>
      <div className='bg-black absolute left-0 right-0 top-0 bottom-0 -z-10 opacity-60'></div>
      <div className='flex items-center w-full sm:w-auto justify-center text-white font-bold text-[24px]'>
      {selectedCity.name || selectedCity}
      </div>
      <div className='flex flex-col w-full sm:w-auto justify-center gap-2 items-center text-white font-bold text-[16px]'>
        <div>
         Gün Doğumu: {getSunRise(weather.sys.sunrise)}
        </div>
         <div>
         Gün Batımı: {getSunSet(weather.sys.sunset)}
         </div>
      </div>
      <div className='flex justify-between w-full lg:w-auto items-center gap-4 p-3'>
        { weather.wind &&
          <div className='flex flex-col gap-2 text-white text-center text-[10px]'>
        { weather.wind.speed ?
          <div>
          <p>
          Rüzgar Hızı:
          </p>
          {weather.wind.speed} m/s
        </div>
        : ""
        }
        { weather.wind.gust &&
          <div>
          <p>
          Rüzgar Şiddeti:
          </p>
          {weather.wind.gust} m/s
        </div>
        }
        </div>
      }
      <Image 
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
          alt='/'
          width='100'
          height='100'
          className='z-10 p-2 m-2 bg-white/80 rounded-full'
          priority={true}
          />
          {
            weather.main &&
            <div>
          <h3 className='text-white font-bold text-center text-[35px]'>{weather.main.temp ? (Number(weather.main.temp) - 273.15).toFixed(0) : "-"}&#176;</h3>
         { weather.main.feels_like &&
         <div className=' text-[10px] text-white text-center'>
        <p>Hissedilen <br /> Sıcaklık:</p>
        {(weather.main.feels_like - 273.15).toFixed(0)}&#176;
        </div>
        }
          </div>
          }
          </div>
    </div>
  )
}
}

export default Info