
"use client"

import React, { useEffect, useState } from 'react'
import "../../CSS/LeagueDetail.css"
import { League, Team } from '../../types/types'
import { getTeams } from '../../services/api'

const LeagueDetailPage = () => {
  const [leagueData, setLeagueData] = useState<League | null>(null)
  const [teams, setTeams] = useState<Team[]>([])
  const [teamsLoading, setTeamsLoading] = useState(false)
  const [teamsError, setTeamsError] = useState<string | null>(null)
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null)

  useEffect(() => {
    const league = localStorage.getItem("league")
    if (league) {
      const parsedLeague = JSON.parse(league)
      setLeagueData(parsedLeague)
      
      // Takımları getir
      fetchTeams(Number(parsedLeague.id))
    }
  }, [])

  const fetchTeams = async (leagueId: number, season?: string) => {
    setTeamsLoading(true)
    setTeamsError(null)
    try {
      const response = await getTeams({ league: leagueId, season })
      setTeams(response.response)
      console.log(response.response, "takımlar")
    } catch (error) {
      setTeamsError('Takımlar yüklenirken hata oluştu')
      console.error('Teams fetch error:', error)
    } finally {
      setTeamsLoading(false)
    }
  }

  const handleSeasonClick = (season: string) => {
    setSelectedSeason(season)
    if (leagueData) {
      fetchTeams(Number(leagueData.id), season)
    }
  }

  if (!leagueData) {
    return <div>Loading...</div>
  }
  console.log(teams, "takımlar")
  console.log(leagueData, "leagueData")
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
            {leagueData.seasons.map((season, index) => (
                <div 
                    className={`league-detail-seasons-list-item ${selectedSeason === String(season.season) ? 'selected' : ''}`}
                    key={`${leagueData.id}-season-${index}`}
                    onClick={() => handleSeasonClick(String(season.season))}
                >
                    <h1>{season.season}</h1>
                </div>
            ))}
        </div>
    </div>
    
    <div className='league-detail-teams'>
        <h1>Teams {selectedSeason && `- ${selectedSeason}`}</h1>
        {!selectedSeason && <div style={{color: '#666', fontStyle: 'italic'}}>Lütfen bir sezon seçin</div>}
        {teamsLoading && <div>Takımlar yükleniyor...</div>}
        {teamsError && <div style={{color: 'red'}}>{teamsError}</div>}
        {!teamsLoading && !teamsError && selectedSeason && (
            <div className='league-detail-teams-list'>
                {teams.map((team, index) => (
                    <div className='league-detail-teams-list-item' key={`${team.id}-${index}`}>
                        <img src={team.logo || ""} alt={team.name} />
                        <h2>{team.name}</h2>
                    </div>
                ))}
            </div>
        )}
    </div>
   </div>
  )
}

export default LeagueDetailPage