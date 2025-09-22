import { useState, useEffect } from 'react'
import { Country, SeasonYear } from '../types/types'
import { getAllCountries, getAllSeasons } from '../services/api'

export const useLeagueFilters = () => {
  const [seasons, setSeasons] = useState<SeasonYear[]>([])
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchFilters = async () => {
      setLoading(true)
      try {
        const [seasonsResponse, countriesResponse] = await Promise.all([
          getAllSeasons(),
          getAllCountries()
        ])
        
        setSeasons(seasonsResponse.response)
        setCountries(countriesResponse.response)
      } catch (error) {
        console.error('Filters yüklenirken hata:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFilters()
  }, [])

  return {
    seasons,
    countries,
    loading
  }
}
