import {useState} from 'react'
import choices from './Choice' //Importing choices for user and bot moves
import getRandomNumber from '../randomNumber' // Importing getRandomNumber function
import './mainGame.css'


/*
 - playableChance: represents the number of chances the player has to play the game.
 - setPlayableChance: is a function that updates the playableChance state variable. 
 - setGameResult: is a function that sets the result of the game. 
   It's used to update the game result, such as "You Win", "Bot Win", or "Tie".
 - setGamePhase: is a function that sets the next phase of the game.

*/

function MainGame({playableChance, setPlayableChance, setGameResult, setGamePhase}) {

    // State variables for user and bot scores, 
    const [userScore, setUserScore] = useState(0)
    const [botScore, setBotScore] = useState(0)

    // State variables for choices
    const [userChoice, setUserChoice] = useState('scissor')
    const [botChoice, setBotChoice] = useState('rock')

    // move outcome, and transition
    const [moveOutcome, setMoveOutCome] = useState('')
    const [moveTransition, setMoveTransition] = useState('')

    
    // Function to determine game logic
    const gameLogic = (user, bot) => {
        setPlayableChance(prev => prev - 1)
        setMoveTransition('wobble-text')
        if (
            (user === 'rock' && bot === 'scissor') ||
            (user === 'scissor' && bot === 'paper') ||
            (user === 'paper' && bot === 'rock')
        ) {
            setUserScore(prevScore => prevScore + 1)
            setMoveOutCome('user_win')
        }

        else if (
            (bot === 'rock' && user === 'scissor') ||
            (bot === 'scissor' && user === 'paper') ||
            (bot === 'paper' && user === 'rock')
        ) {
            setBotScore(prevScore => prevScore + 1)
            setMoveOutCome('bot_win')
        }
    }

    // Function to get game result
    const gameResult = () =>{
        if(userScore > botScore){
            return 'You Win'
        }

        if(botScore > userScore){
            return 'Bot Win'
        }

        return 'Tie'
    }


    
    // Function to check remaining chances
    const checkRemainingChances = () =>{
        if (playableChance <= 1){
            setGameResult(gameResult)
            setGamePhase('endGame')
        }
    }
    
    // Function to select bot move
    const botMoveSelection = () => {
        const choice = ['rock', 'scissor', 'paper']
        const randomChoice = getRandomNumber(0,2)
        return choice[randomChoice]
    }

    // Function to handle button click
    const handleClick = (e) => {
        checkRemainingChances()
        const user = e.currentTarget.value
        const bot = botMoveSelection()

        setUserChoice(user)
        setBotChoice(bot)
        gameLogic(user, bot)
      
    }

    // Function to get class name for user outcome for every move
    const getUserOutcomeClassName = () => {
        switch (moveOutcome) {
          case 'user_win':
            return 'win'
          case 'bot_win':
            return 'loss'
          default:
            return ''
        }
      }
      
    // Function to get class name for bot outcome for every move
    const getBotOutcomeClassName = () => {
        switch (moveOutcome) {
          case 'user_win':
            return 'loss'
          case 'bot_win':
            return 'win'
          default:
            return ''
        }
    }

    // Function to reset border animation
    const resetBorderAnimation =() =>{
        setMoveOutCome('')
    }

    // Function to reset move transition
    const resetMoveAnimation = (e) =>{
        setMoveTransition('')
        e.stopPropagation() // prevents border aniamation end abruptly
    }
    
      
    return (
        <section className='main-game-section main-game-transition'>
            {/* Display user and bot choices */}

            <div className="choice-display">

                {/* User's choice */}

                <div className='user-info'>
                    <p className='text-md'>{userScore}</p>
                    <div className={`sel-choice ${getUserOutcomeClassName()}`} onAnimationEnd={resetBorderAnimation}>
                        <img src={choices[userChoice]} 
                        alt="" 
                        srcset="" 
                        className={`img-lg ${moveTransition}`} 
                        onAnimationEnd={resetMoveAnimation}
                        />
                        
                    </div>

                    <p className='text-rg'>You</p>
                </div>

                {/* Bot's choice */}
                <div className='bot-info'>
                    <p className='text-md'>{botScore}</p>
                    <div className={`sel-choice ${getBotOutcomeClassName()}`} >
                        <img src={choices[botChoice]} 
                        alt="" 
                        srcset="" 
                        className={`img-lg ${moveTransition}`} 
                        />
                      
                    </div>
          
                    <p className='text-rg'>Bot</p>
                </div>

            </div>

            {/* User's choice buttons */}

            <div className="usr_choice">
                <button className='btn' value='paper' onClick={handleClick}>
                    <img src={choices.paper} className='img-rg' alt="paper" />
                </button>

                <button className='btn' value='rock' onClick={handleClick}>
                    <img src={choices.rock} className='img-rg' alt="rock" />
                </button>

                <button className='btn' value='scissor' onClick={handleClick}>
                    <img src={choices.scissor} className='img-rg' alt="scissor" />
                </button>
            </div>

            {/* Display remaining chances */}

            <p className='text-sm remaining-chance'>Remaining Chances: {playableChance}</p>
        </section>
    )
}

export default MainGame