import {useEffect} from 'react'

export default function Log({turns}) {
    return (
        <ol id="log">
            {turns.map((turn, turnIndex) => {
                return(
                    <li key={turnIndex}>
                        {`${turn.player} selected ${turn.square.rowInd}, ${turn.square.colInd}`}
                    </li>
                )
            })}
        </ol>
    )
}