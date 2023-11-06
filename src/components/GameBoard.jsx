// import { useState } from "react" --> eveerything is computed from the 'turns' state variable!


//this child component re-renders whenever its props change.
export default function GameBoard ({ handleTurnChange, board}) {

    // const [board, setBoard] = useState(initialBoard);
    return (
        <ol id="game-board">
            {board.map((row, rowInd) => {
                return (
                    <li key={rowInd}>
                        <ol>
                            {row.map((cell, columnInd) => {
                                return (
                                    <li key={columnInd}>
                                        <button onClick={() => handleTurnChange(rowInd, columnInd)} disabled={board[rowInd][columnInd] !== null}>
                                            {cell}
                                        </button>
                                    </li>
                                )
                            })}
                        </ol>
                    </li>
                )
            })}
        </ol>
    )
}