"use client"

import React, { useEffect, useState } from 'react'
import { Country, League, SeasonYear } from '../types/types'
import { getAllCountries, getAllLeagues, getAllSeasons } from '../services/api'
import "../CSS/LeagueContainer.css"

const LeagueContainer = () => {
  const [selectedSeason, setSelectedSeason] = useState("")
  const [filteredSeasons, setFilteredSeasons] = useState<SeasonYear[]>([])
  const [leagues, setLeagues] = useState<League[]>([])
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [selectedCountry , setSelectedCountry] = useState<string>("")

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

  const handleSearch = async () => {
  
    const apiResponse = await getAllLeagues(selectedSeason || undefined);
  
    if (apiResponse.response.length > 0) {
      setLeagues(apiResponse.response);
      console.log(apiResponse,"istek atılan yer")
    } else {
      const allLeagues = await getAllLeagues();
      const filtered = (allLeagues.response).filter(league =>
        league.seasons &&
        league.seasons.some(
          (s: any) =>
            String(s.season) === selectedSeason ||
            String(s.season).includes(selectedSeason) ||
            selectedSeason.includes(String(s.season))
        )
      );
      setLeagues(filtered);
      console.log(filtered,"ui filtresi")
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
          <select name="country"
           value={selectedCountry} 
           onChange={e => setSelectedCountry(e.target.value)}
           >
            {countryList.map((c)=> (
              <option
               key={c.id}
                value={c.name}>
                  {`${c.code}`|| "None"} - {c.name}
                  </option>
            ))}
          </select>
        </div>
        <input type="name" name="leagueName" id="" />
        <button onClick={handleSearch}>Search</button>
      </div>
      {/* Ligleri göstermek için örnek */}
      <div>
        {leagues.map((league) => (
          <div className='leagues' key={league.id}>
           <div className="league-card-container">
            <div className="league-country">
            <div className="country-card">
            <div className="country-flag">
              <img src={league.country.flag} alt={`${league.country.name} bayrağı`} />
            </div>
            <div className="country-info">
              <h3 className="country-name">{league.country.name}</h3>
              <p className="country-code">{league.country.code}</p>
              {league.country.description && (
                <p className="country-description">{league.country.description}</p>
              )}
            </div>
          </div>
            </div>
            <div className="league-informations"></div>
           </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeagueContainer