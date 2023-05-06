import { useState } from 'react';


export default function GameBoard() {
    // const [count, setCount] = useState(0)
   
     return( 
        <>
        <h1>GameBoard</h1>
        <div className="board-row">
        <Square />
        <Square />
        <Square />
        </div>
        <div className="board-row">
        <Square />
        <Square />
        <Square />
        </div>
        <div className="board-row">
        <Square />
        <Square />
        <Square />
        </div>
        </>
      );
   }
   

   export function Square({handleClick}) {

    const [value, setValue] = useState(null);

    function handleClick() {
      console.log('clicked!');
      setValue("X");
    }

    return (
      <button className="square" onClick={handleClick}>
        {value}
      </button>
    );
  }