"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Team } from '../types/types'
import { getTeams } from '../services/api'
import LoadingSpinner from '../utils/LoadingSpinner'

const TeamDetailPage = () => {
    const { teamsId } = useParams()
    const [team, setTeam] = useState<Team | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                setLoading(true)
                setError(null)
                const response = await getTeams({ id: Number(teamsId) })
                setTeam(response.response[0])
            } catch (err) {
                setError('Takım bilgileri yüklenirken hata oluştu')
                console.error('Team fetch error:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchTeam()
    }, [teamsId])

    if (loading) {
        return <LoadingSpinner message="Takım bilgileri yükleniyor..." />
    }

    if (error) {
        return <div className="error-message">{error}</div>
    }

    if (!team) {
        return <div>Takım bulunamadı</div>
    }

    return (
        <div>
            <h1>{team.name}</h1>
            <p>Ülke: {team.country.name}</p>
            {team.logo && <img src={team.logo} alt={`${team.name} logo`} />}
        </div>
    )
}

export default TeamDetailPage