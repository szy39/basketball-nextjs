"use client"

import React, { useState, useEffect, useRef } from 'react'
import { getTeams, getAllLeagues } from '../services/api'
import { Team } from '../types/types'
import LoadingSpinner from '../utils/LoadingSpinner'
import '../CSS/TeamContainer.css'
import Link from 'next/link'

const TeamContainer = () => {
  const [teams, setTeams] = useState<Team[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  const searchTeams = async (query: string) => {
    if (query.length < 3) {
      setTeams([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Önce takım araması
      const teamResults = await getTeams({ search: query })
      
      if (teamResults.response.length > 0) {
        setTeams(teamResults.response)
      } else {
        // Takım bulunamazsa lig araması
        const leagueResults = await getAllLeagues({ name: query })
        if (leagueResults.response.length > 0) {
          const leagueId = leagueResults.response[0].id
          const teamsFromLeague = await getTeams({ league: Number(leagueId) })
          setTeams(teamsFromLeague.response)
        } else {
          setTeams([])
        }
      }
    } catch (err) {
      setError('Arama sırasında hata oluştu')
      console.error('Search error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    
    // Önceki timeout'u temizle
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }
    
    // Yeni timeout oluştur (300ms gecikme - daha hızlı)
    debounceTimeout.current = setTimeout(() => {
      searchTeams(query)
    }, 300)
  }

  // Component unmount olduğunda timeout'u temizle
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }
    }
  }, [])

  return (
   <div className="teams-container">
    <div className="teams-header">
        <h1>Teams</h1>
    </div>
    <div className="teams-searchbar">
        <input 
          type="text"
          placeholder="Takım veya lig ara... (örn: Lakers, NBA)"
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
    </div>
    <div className="teams-list">
      {loading && <LoadingSpinner message="Takımlar aranıyor..." />}
      {error && <div className="error-message">{error}</div>}
      {!loading && !error && teams.length === 0 && searchQuery.length >= 3 && (
        <div className="no-results">Sonuç bulunamadı</div>
      )}
      {!loading && !error && teams.map((team, index) => (
        <Link key={`${team.id}-${index}`} className="team-item" href={`/teams/${team.id}`}>
          <img 
            src={team.logo || "../assets/basketball.png"} 
            alt={team.name}
            width={80}
            height={80}
          />
          <h3>{team.name}</h3>
          <p>{team.country.name}</p>
        </Link>
      ))}
    </div>
   </div>
  )
}

export default TeamContainer