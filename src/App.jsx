import { useState } from 'react'
import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from './components/GameOver';

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

const PLAYERS = {
  'X' : 'Player 1',
  'O' : 'Player 2'
}

const generateBoard = (gameTurns) => {
  let board = [...initialBoard.map(row => [...row])];
  for (let turn of gameTurns) //for...in is used for iterating over keys of an object, not an array.
  {
    const { player, square } = turn;
    const { rowInd, colInd } = square;
    board[rowInd][colInd] = player;
  }
  return board
}

const deriveWinner = (board, players) => {
  let winner;   //initialses as undefined
  for(let combination of WINNING_COMBINATIONS)
  {
    const cellOne = board[combination[0].row][combination[0].column];
    const cellTwo = board[combination[1].row][combination[1].column];
    const cellThree = board[combination[2].row][combination[2].column];

    if(cellOne && cellOne === cellTwo && cellOne === cellThree)
    {
      winner = players[cellOne];
    }
  }
  return winner;
}


function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

 let board = generateBoard(gameTurns)

  // const [activeSymbol, setActiveSymbol] = useState('X'); //redundant state
  // setActiveSymbol((oldSymbol) => (oldSymbol === 'X' ? 'O' : 'X'));

  let activeSymbol = 'X'
  if (gameTurns.length && gameTurns[0].player === 'X') {
    activeSymbol = 'O';
  }

  const handleTurnChange = (r, c) => {
    setGameTurns(oldTurns => {
      let activePlayer = 'X'  // cant use the activeSymbol variable as it is not updated
      if (oldTurns.length && oldTurns[0].player === 'X') {
        activePlayer = 'O';
      }
      const newTurns = [{ player: activePlayer, square: { rowInd: r, colInd: c } }, ...oldTurns];
      return newTurns;
    })
  }

  let isDraw = (gameTurns.length === 9 && !winner);
  const winner = deriveWinner(board, players)
  
  const updatePlayer = (symbol, playerName) => { 
    setPlayers(oldPlayers => {
      return (
        {...oldPlayers,
          [symbol] : playerName
        }
      )
    })
  }
  const resetBoard = () => {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player initialName={PLAYERS.X} initialSymbol='X' isActive={activeSymbol === 'X'} saveName={updatePlayer}/>
          <Player initialName={PLAYERS.O} initialSymbol='O' isActive={activeSymbol === 'O'} saveName={updatePlayer}/>
        </ol>
        <GameBoard handleTurnChange={handleTurnChange} board={board}/>
        {(isDraw || winner) && <GameOver winner={winner} handleReset={resetBoard}/>}
      </div>
      <Log turns={gameTurns}/>

    </main>
  )
}

export default App
