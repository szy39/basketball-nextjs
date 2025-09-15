import React from 'react'
import { LeagueContainerProps } from '../types/types'

const LeagueContainer:React.FC<LeagueContainerProps> = ({response}) => {
  return (
    <div>{response.map((league)=>(
        <div key={league.id}>
            {league.name}- {league.type}
        </div>
    ))}</div>
  )
}

export default LeagueContainer