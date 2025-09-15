import React from 'react';
import CountriesCard from '../components/CountriesCard';
import { getAllCountries } from '../services/api';
import { CountryCard, Country } from '../types/types';

// API'den gelen ülkeleri CountryCard formatına çeviren fonksiyon
const transformCountries = (countries: Country[]): CountryCard[] => {
  return countries.map((country) => ({
    id: country.id,
    name: country.name,
    code: country.code,
    flag: country.flag,
    description: `${country.name} (${country.code})`
  }));
};

const CountriesPage = async () => {
  try {
    // Tüm ülkeleri çek (search parametresi olmadan)
    const apiResponse = await getAllCountries();
    console.log(apiResponse, "countries api cevabı");
    const countryCardInformations = transformCountries(apiResponse.response);
    
    return (
      <div className="countries-page">
        <CountriesCard countries={countryCardInformations} />
      </div>
    );
  } catch (err) {
    console.error('Ülkeler yüklenirken hata:', err);
    return (
      <div className="countries-page">
        <div className="error-message">Bir hata oluştu</div>
      </div>
    );
  }
};

export default CountriesPage;