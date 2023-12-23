import Link from 'next/link';
import { Datas, IoArrowBack } from '../helpers';
import { useCity } from '../context';
import { useRouter } from 'next/navigation';

const Navbar = ({weather,selectedCity}) => {

  const { setCity } = useCity();
  const router = useRouter();

  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setCity(newCity);
    router.push(`/city/${encodeURIComponent(newCity)}`);
    
  };
  if(!weather) {
   return
  }
  else {

  return (
    <div className='flex justify-between lg:mx-24 mt-24 bg-indigo-400 p-2 rounded-t-2xl border-b border-b-white'>
      <Link href='/' passHref>
        <div className='flex items-center gap-1 text-white font-semibold'>
          <IoArrowBack size={18}/> Geri Dön
        </div>
      </Link>
      <select className='bg-inherit text-white font-semibold' name='citySelector' value={selectedCity.name || selectedCity} onChange={handleCityChange}>
        {Datas &&
          Datas.map((data, index) => (
            <option key={index} value={data.name}>
              {data.name}
            </option>
          ))}
      </select>
    </div>
  )
}
};

export default Navbar;