'use client';

import React, {useMemo, useState} from 'react';
import { useRouter } from 'next/navigation';
import { CountriesCardProps } from '../types/types';
import LoadingSpinner from '../utils/LoadingSpinner';
import "../CSS/CountriesCard.css";


const CountriesCard: React.FC<CountriesCardProps> = ({ countries, loading = false, error = null }) => {
  const router = useRouter()
const [search,setSearch] = useState("")
const [inputValue, setInputValue] = useState("  ")

const handleCountryClick = (countryName: string) => {
  router.push(`/leagues?country=${countryName}`)
}

const filteredCountries = useMemo(() => {
    if (!search.trim()) return countries;
    return countries.filter((country) =>
      (country.code && country.code.toLowerCase().includes(search.toLowerCase())) ||
      (country.name && country.name.toLowerCase().includes(search.toLowerCase()))
      // || (country.description && country.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [countries, search]);


  if (loading) {
    return (
      <div className="countries-container">
        <h2 className="countries-title">Country Search</h2>
        <LoadingSpinner message="Ülkeler yükleniyor..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="countries-container">
        <h2 className="countries-title">Country Search</h2>
        <div className="error-message">
          <p>Hata: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="countries-container">
      <h2 className="countries-title">Country Search</h2>
      <div className="search-bar">
        <input type="text"
        value={inputValue}
         onChange={(e)=>setInputValue(e.target.value)} 
         placeholder='Enter country code..'/>
        <button onClick={()=>setSearch(inputValue)}>Search</button>
      </div>
      <div className="countries-cards-grid">
        {filteredCountries.map((country) => (
          <div
           key={country.id}
            className="country-card" 
            onClick={()=>handleCountryClick(country.name)}>
            <div className="country-flag">
              <img src={country.flag} alt={`${country.name} bayrağı`} />
            </div>
            <div className="country-info">
              <h3 className="country-name">{country.name}</h3>
              <p className="country-code">{country.code}</p>
              {country.description && (
                <p className="country-description">{country.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountriesCard;