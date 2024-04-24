import getRandomNumber from '../randomNumber'  // - This function generates a random integer between min (inclusive) and max (inclusive).
import './start.css'

/*
  - Start Component
  - This component renders the start section of the game.
  - It allows the user to select the number of chances.
  - It receives a handleClick function as a prop to set playable chance.
*/

function StartGame({ chancesToPlay }) {
  return (
    <section className='start-section start-transition'>
      <h1 className="text-md">Number of Chances</h1>

      <div className='sel-chances'>
        <button className='btn text-rg' onClick={() => chancesToPlay(3)}>3</button>
        <button className='btn text-rg' onClick={() => chancesToPlay(5)}>5</button>
        <button className='btn text-rg' onClick={() => chancesToPlay(10)}>10</button>
        <button className='btn text-rg' 
        onClick={() => chancesToPlay(getRandomNumber(3, 15))}>Random</button>
      </div>
    </section>
  )
}

export default StartGame