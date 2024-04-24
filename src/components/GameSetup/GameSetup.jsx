import { useState } from 'react'
// Importing components to setup game
import StartGame from './StartGame/StartGame'
import MainGame from './MainGame/MainGame'
import EndGame from './EndGame/EndGame'

import './gameSetup.css'

function GameSetup() {
  // State variables for game setup

  const [playableChance, setPlayableChance] = useState(0) // State for playable chance
  const [gamePhase, setGamePhase] = useState('startGame') // State for game phase
  const [gameResult, setGameResult] = useState(null) // State for game result


  // Function to handle chances to play
  const chancesToPlay = (chance) => {
    setPlayableChance(chance)
    setGamePhase('mainGame')
  }

  // Function to restart the game
  const restartGame = () => {
    setGamePhase('startGame')
  }

  // Function to determine which component to render based on game phase
  const pageShow = () => {
    switch (gamePhase) {
      case 'startGame':
        return <StartGame chancesToPlay={chancesToPlay} />

      case 'mainGame':
        return (
          <MainGame
            playableChance={playableChance}
            setPlayableChance={setPlayableChance}
            setGameResult={setGameResult}
            setGamePhase={setGamePhase}
          />
        )

      case 'endGame':
        return  ( 
        <EndGame 
        gameResult={gameResult} 
        restartGame={restartGame} 
        />
        )

    }
  }


  return (
    <>
      {/* Render the appropriate component based on game phase */}
      {pageShow()}
    </>
  )
}

export default GameSetup