
export default function GameOver ({winner, handleReset}) {
    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            {winner && <p>{winner} won!</p>}
            {!winner && <p>Its a draw! </p>}
            <button onClick={handleReset}>Play Again</button>
        </div>
    )
}