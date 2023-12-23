"use client"
import { useRouter } from 'next/navigation';
import TurkeyMap from 'turkey-map-react';
import { useCity } from './context';

export default function Home() {

  const { push } = useRouter();
  const { setCity } = useCity();

  const handleClickCity = (city) => {
    setCity(city);
    push(`city/${city.id}`);
  } 

  return (
    <div className="container relative mx-auto rounded-3xl mt-[80px] h-[80vh] bg-[#393939] md:p-12 lg:p-24 flex flex-col">
    <p className='text-white absolute right-3 bottom-1 text-end text-[10px]'>NOT: Harita üzerinden hava durumunu öğrenmek istediğiniz ili seçiniz.</p>
      <div className="flex-1 relative flex items-center">
      <h1 className='text-center absolute top-12 md:top-0 left-0 right-0 text-[24px] font-bold text-white'>- İllere Göre Hava Durumu -</h1>
        <div className="flex-1">
          <TurkeyMap
            hoverable
            customStyle={{ idleColor: '#96D4E3', hoverColor: '#8eb3f180' }}
            showTooltip={true}
            onClick={(city) => handleClickCity(city)}
          />
        </div>
      </div>
    </div>
  )
}
