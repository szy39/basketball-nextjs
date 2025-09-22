import { useCallback } from 'react'
import { getAllLeagues } from '../services/api'
import { LeagueSearchParams } from '../types/types'

interface SearchParams {
  season: string
  country: string
  leagueName: string
}

interface UseLeagueSearchLogicProps {
  searchParams: SearchParams
  setLeaguesData: (leagues: any[]) => void
  setLoadingState: (loading: boolean) => void
  setErrorState: (error: string) => void
  clearError: () => void
}

export const useLeagueSearchLogic = ({
  searchParams,
  setLeaguesData,
  setLoadingState,
  setErrorState,
  clearError
}: UseLeagueSearchLogicProps) => {
  
  const handleSearch = useCallback(async () => {
    try {
      setLoadingState(true)
      clearError()
      
      // API parametreleri
      const apiParams: LeagueSearchParams = {}
      
      if (searchParams.season) {
        apiParams.season = searchParams.season
      }
      
      if (searchParams.country) {
        apiParams.country = searchParams.country
      }
      
      if (searchParams.leagueName) {
        apiParams.name = searchParams.leagueName
      }
      
      const apiResponse = await getAllLeagues(apiParams)
      
      if (apiResponse.results === 0) {
        setErrorState("Arama kriterlerinize uygun lig bulunamadı")
        setLeaguesData([])
        return
      }
      
      setLeaguesData(apiResponse.response)
      
    } catch (error) {
      console.error("Arama sırasında hata:", error)
      setErrorState(`Arama sırasında hata oluştu: ${error}`)
      setLeaguesData([])
    } finally {
      setLoadingState(false)
    }
  }, [searchParams, setLeaguesData, setLoadingState, setErrorState, clearError])

  return { handleSearch }
}
