"use client"

import React, { useEffect, useState } from 'react'
import { Country, League, LeagueSearchParams, SeasonYear } from '../types/types'
import { getAllCountries, getAllLeagues, getAllSeasons } from '../services/api'
import { useSearchParams, useRouter } from 'next/navigation'
import "../CSS/LeagueContainer.css"

const LeagueContainer = () => {
  const [selectedSeason, setSelectedSeason] = useState("")
  const [filteredSeasons, setFilteredSeasons] = useState<SeasonYear[]>([])
  const [leagues, setLeagues] = useState<League[]>([])
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [selectedCountry , setSelectedCountry] = useState<string>("")
  const [leagueName, setLeagueName] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const countryUrl = searchParams.get("country")

  const router = useRouter()
  const handleLeagueClick = (league: League) => {
    localStorage.setItem("league", JSON.stringify(league))
    router.push(`/leagues/${league.id}`)
  }

  useEffect(() => {
    const fetchSeasons = async () => {
      const seasons = await getAllSeasons();
      setFilteredSeasons(seasons.response);
    };
    const fetchAllLeagues = async () => {
      const country = await getAllCountries()
      setCountryList(country.response)
      console.log(country)
    }
    fetchSeasons();
    fetchAllLeagues()
  }, []);

  useEffect(() => {
    if (countryUrl) {
      setSelectedCountry(countryUrl);
    }
  }, [countryUrl]);

  useEffect(() => {
    if (selectedCountry && countryUrl) {
      handleSearch();
    }
  }, [selectedCountry]);

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      
      // API parametreleri
      const searchParams: LeagueSearchParams = {};
      
      if (selectedSeason) {
        searchParams.season = selectedSeason;
      }
      
      if (selectedCountry) {
        searchParams.country = selectedCountry;
      }
      
      if (leagueName) {
        searchParams.name = leagueName;
      }
      
      
      const apiResponse = await getAllLeagues(searchParams);
      
      if (apiResponse.results === 0) {
        console.log("Arama kriterlerinize uygun lig bulunamadı");
        setErrorMessage("Arama kriterlerinize uygun lig bulunamadı");
        setLeagues([]);
        return;
      }
      
      setErrorMessage(""); 
      setLeagues(apiResponse.response);
      console.log(apiResponse, "API'den gelen veriler");
    } catch (error) {
      console.error("Arama sırasında hata:", error);
      setErrorMessage(`Arama sırasında hata oluştu: ${error}`);
      setLeagues([]);
    } finally {
      setIsLoading(false);
    }
  };

  
  return (
    <div className='league-container'>
      <h2 className="league-title">League Search</h2>
      <div className="league-search-bar">
        <div className="season-selectbox">
          <select
            name="seasons"
            value={selectedSeason}
            onChange={e => setSelectedSeason(e.target.value)}
          >
            <option value="">Season select</option>
            {filteredSeasons.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="country-selectbox">
          <select 
            name="country"
            value={selectedCountry} 
            onChange={e => setSelectedCountry(e.target.value)}
          >
            <option value="">Country select</option>
            {countryList.map((c) => (
              <option key={c.id} value={c.name}>
                {c.code} - {c.name}
              </option>
            ))}
          </select>
        </div>
        <input 
          type="text" 
          name="leagueName" 
          placeholder="League name"
          value={leagueName}
          onChange={e => setLeagueName(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      
      {/* Loading mesajı */}
      {isLoading && (
        <div className='league-loading-message'>
          Loading...
        </div>
      )}

      {/* Hata mesajı */}
      {errorMessage && (
        <div className='league-error-message'>
          {errorMessage}
        </div>
      )}
     
      <div className="leagues-list">
        {leagues.map((league) => (
          <div className="league-item" key={league.id} onClick={() => handleLeagueClick(league)}>
            <img src={league.country.flag} alt={`${league.country.name} bayrağı`} className="flag" />
            <span className="country-name">{league.country.name}</span>
            <span className="country-code">{league.country.code}</span>
           
            <span className="league-name"> <span className="league-logo">
              <img src={league.logo} alt={`${league.name} logo`} />
            </span>{league.name}</span>
            
            <span className="league-type">{league.type}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeagueContainer