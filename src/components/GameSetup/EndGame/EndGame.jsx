import './endGame.css'

/**
 - EndGame Component
 - Displays the game result and provides an option to reset the game.
*/

function EndGame({ gameResult, restartGame }) {
  return (
    <section className='end-game-section end-game-transition'>
      <h1 className='text-md'>Game Over!</h1>
      <p className='text-rg'>{gameResult}</p>

      <button className="btn text-rg" onClick={restartGame}>Reset</button>
    </section>
  )
}

export default EndGame