import { useState } from 'react';


export default function GameBoard() {
     // const [count, setCount] = useState(0)
   
     return( 
        <>
        <h1>GameBoard</h1>
        <div className="board-row">
        <Square coordinate={[0,0]}/>
        <Square coordinate={[0,1]}/>
        <Square coordinate={[0,2]}/>
        </div>
        <div className="board-row">
        <Square coordinate={[1,0]}/>
        <Square coordinate={[1,1]}/>
        <Square coordinate={[1,2]}/>
        </div>
        <div className="board-row">
        <Square coordinate={[2,0]}/>
        <Square coordinate={[2,1]}/>
        <Square coordinate={[2,2]}/>
        </div>
        </>
      );
   }
   

   export function Square({coordinate, handleClick}) {

    const [value, setValue] = useState(null);

    function handleClick() {
      console.log('Square ' + coordinate + ' was clicked!');
      setValue("X");
    }

    return (
      <button className="square" onClick={handleClick}>
        {value}
      </button>
    );
  }