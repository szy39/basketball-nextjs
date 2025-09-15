
import SeasonGames from '@/app/components/SeasonGames'
import { SeasonGamesTypes } from '@/app/types/types'
import React from 'react'



const page = ({ params }: SeasonGamesTypes) => {
  return (
    <SeasonGames season={params.games} />
  )
}

export default page