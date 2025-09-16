"use client"

import React, { useState } from 'react'
import { League, SeasonYear } from '../types/types'
import { getAllLeagues, getAllSeasons } from '../services/api'

const LeagueContainer = () => {
  const [selectedSeason, setSelectedSeason] = useState("")
  const [filteredSeasons, setFilteredSeasons] = useState<SeasonYear[]>([])
  const [leagues, setLeagues] = useState<League[]>([])

  const handleSearch = async () => {
    const seasons = await getAllSeasons();
    setFilteredSeasons(seasons.response);
  
    const apiResponse = await getAllLeagues(selectedSeason || undefined);
  
    if (apiResponse.response.length > 0) {
      setLeagues(apiResponse.response);
      console.log(apiResponse,"istek atılan yer")
    } else {
      const allLeagues = await getAllLeagues();
      const filtered = (allLeagues.response as League[]).filter(league =>
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
            <option value="">Sezon Seç</option>
            {filteredSeasons.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <button onClick={handleSearch}>Search</button>
      </div>
      {/* Ligleri göstermek için örnek */}
      <div>
        {leagues.map((league) => (
          <div key={league.id}>
            {league.name} - {league.type}
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeagueContainer