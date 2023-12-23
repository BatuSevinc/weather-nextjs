"use client"
import { createContext, useContext, useEffect, useState } from 'react';

const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(true);

  const setCity = (city) => {
    setSelectedCity(city);
    localStorage.setItem('selectedCity', JSON.stringify(city));
  };

  useEffect(() => {
    const storedCity = localStorage.getItem('selectedCity');
    if (storedCity) {
      setSelectedCity(JSON.parse(storedCity));
    }
    setLoading(false);
  }, []);

  return (
    <CityContext.Provider value={{ selectedCity, setCity, loading }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => {
  return useContext(CityContext);
};
