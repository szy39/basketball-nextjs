import { useState } from 'react'
import { League } from '../types/types'

export const useLeagueData = () => {
  const [leagues, setLeagues] = useState<League[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const setLeaguesData = (newLeagues: League[]) => {
    setLeagues(newLeagues)
  }

  const setLoadingState = (isLoading: boolean) => {
    setLoading(isLoading)
  }

  const setErrorState = (errorMessage: string) => {
    setError(errorMessage)
  }

  const clearError = () => {
    setError("")
  }

  const clearData = () => {
    setLeagues([])
    setError("")
  }

  return {
    leagues,
    loading,
    error,
    setLeaguesData,
    setLoadingState,
    setErrorState,
    clearError,
    clearData
  }
}
