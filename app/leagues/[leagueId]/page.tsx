
"use client"

import React, { useEffect, useState } from 'react'
import "../../CSS/LeagueDetail.css"

const LeagueDetailPage = () => {
  const [leagueData, setLeagueData] = useState<any>(null)

  useEffect(() => {
    const league = localStorage.getItem("league")
    if (league) {
      setLeagueData(JSON.parse(league))
    }
  }, [])

  if (!leagueData) {
    return <div>Loading...</div>
  }

  return (
   <div className='league-detail-container'>
    <div className='league-detail-image-container'>
       <div className="detail-image-country">
        <img src={leagueData.country.flag} alt={leagueData.country.name} />
       </div>
       <div className="detail-image-league">
        <img src={leagueData.logo} alt={leagueData.name} />
       </div>
    </div>
    <div className='league-detail-header'>
        <h1>{leagueData.country.name}</h1> - 
        <h1>{leagueData.name}</h1>
    </div>
    <div className='league-detail-seasons'>
        <h1>Seasons</h1>
        <div className='league-detail-seasons-list'>
            {leagueData.seasons.map((season: any) => (
                <div className='league-detail-seasons-list-item' key={season.id}>
                    <h1>{season.year}</h1>
                </div>
            ))}
        </div>
    </div>
   </div>
  )
}

export default LeagueDetailPage