import React from 'react'
import { SeasonGamesProps } from '../types/types'



const SeasonGames = ({ season }: SeasonGamesProps) => {
  return (
    <div className="season-games-container">
        <h2 className='season-games-title'>SEZON {season}</h2>
        <div className="season-games-search-bar"></div>
    </div>
  )
}

export default SeasonGames