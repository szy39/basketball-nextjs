import { useState } from 'react'

interface SearchParams {
  season: string
  country: string
  leagueName: string
}

export const useLeagueSearch = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    season: "",
    country: "",
    leagueName: ""
  })

  const updateSearch = (key: keyof SearchParams, value: string) => {
    setSearchParams(prev => ({ ...prev, [key]: value }))
  }

  const resetSearch = () => {
    setSearchParams({
      season: "",
      country: "",
      leagueName: ""
    })
  }

  return {
    searchParams,
    updateSearch,
    resetSearch
  }
}
