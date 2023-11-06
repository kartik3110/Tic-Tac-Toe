import { useState } from "react"


export default function Player ({initialName, initialSymbol = 'X', isActive = true, saveName}) 
{
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(initialName)       //cant move this state up as it would cause app to rerender on every key stroke.

    const handleInputChange = (e) => {
        setName(e.target.value);
    }

    let playerName = <span className="player-name">{name}</span>
    if(isEditing)
        playerName = <input type="text" value={name} onChange={handleInputChange} required/>

    const handleClick = () => {
        setIsEditing(isEditing => !isEditing)
        
        saveName(initialSymbol,name)
    }   

    return (
        <li className={`player ${isActive && 'active'}`}>
            {playerName}
            <span className="player-symbol">
                {initialSymbol}
            </span>
            <button onClick={handleClick}>{isEditing? 'save': 'edit'}</button>
        </li>
    )
}