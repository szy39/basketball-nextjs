import React from 'react'
import { getAllLeagues } from '../services/api'
import LeagueContainer from '../components/LeagueContainer'

const LeaguesPage = async () => {

    const apiResponse = await getAllLeagues()
        console.log(apiResponse.response,"ligler")

  return (
   <LeagueContainer response={apiResponse.response}/>
  )
}

export default LeaguesPage