import { useState } from 'react';


export default function GameBoard() {
     // const [count, setCount] = useState(0)
     const [xIsNext, setXIsNext] = useState(true);
      
     return( 
        <>
        <h1>GameBoard</h1>
        <div className="board-row">
        <Square coordinate={[0,0]} xIsNext={xIsNext} setXIsNext={setXIsNext}/>
        <Square coordinate={[0,1]} xIsNext={xIsNext} setXIsNext={setXIsNext}/>
        <Square coordinate={[0,2]} xIsNext={xIsNext} setXIsNext={setXIsNext}/>
        </div>
        <div className="board-row">
        <Square coordinate={[1,0]} xIsNext={xIsNext} setXIsNext={setXIsNext}/>
        <Square coordinate={[1,1]} xIsNext={xIsNext} setXIsNext={setXIsNext}/>
        <Square coordinate={[1,2]} xIsNext={xIsNext} setXIsNext={setXIsNext}/>
        </div>
        <div className="board-row">
        <Square coordinate={[2,0]} xIsNext={xIsNext} setXIsNext={setXIsNext}/>
        <Square coordinate={[2,1]} xIsNext={xIsNext} setXIsNext={setXIsNext}/>
        <Square coordinate={[2,2]} xIsNext={xIsNext} setXIsNext={setXIsNext}/>
        </div>
        </>
      );
   }
   

   export function Square({coordinate, handleClick, xIsNext, setXIsNext}) {

    const [value, setValue] = useState(null);
    const [squarePlayed, setSquarePlayed] = useState(false);

    function handleClick() {
      
      if(!squarePlayed) {
        if(xIsNext) {
          setValue("X");
          setXIsNext(!xIsNext)
          setSquarePlayed(true);
        } else {
          setValue("O");
          setXIsNext(!xIsNext)
          setSquarePlayed(true);
        }
      
    }
  }

    return (
      <button className="square" onClick={handleClick}>
        {value}
      </button>
    );
  }