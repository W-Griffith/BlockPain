import { useState } from 'react';
import { makeMove } from '../App';

export default function GameBoard() {
     // const [count, setCount] = useState(0)
     const [xIsNext, setXIsNext] = useState(true);
     const [gameOver, setGameOver] = useState(false);
     const [winner, setWinner] = useState(0)
      
     if(gameOver){
      let winnerText;
      if(winner == 1){
        winnerText = "Player 1 Wins!";
      }
      else if(winner == 2){
        winnerText = "Player 2 Wins!";
      }
      else{
        winnerText = "It's a tie!";
      }
        return(
          <>
          <h1>Game Over! </h1>
          <h1> {winnerText} </h1>
          </>
        );
     }
     return( 
        <>
        <h1>GameBoard</h1>
        <div className="board-row">
        <Square coordinate={[0,0]} xIsNext={xIsNext} setXIsNext={setXIsNext} setGameOver={setGameOver} setWinner={setWinner}/>
        <Square coordinate={[0,1]} xIsNext={xIsNext} setXIsNext={setXIsNext} setGameOver={setGameOver} setWinner={setWinner}/>
        <Square coordinate={[0,2]} xIsNext={xIsNext} setXIsNext={setXIsNext} setGameOver={setGameOver} setWinner={setWinner}/>
        </div>
        <div className="board-row">
        <Square coordinate={[1,0]} xIsNext={xIsNext} setXIsNext={setXIsNext} setGameOver={setGameOver} setWinner={setWinner}/>
        <Square coordinate={[1,1]} xIsNext={xIsNext} setXIsNext={setXIsNext} setGameOver={setGameOver} setWinner={setWinner}/>
        <Square coordinate={[1,2]} xIsNext={xIsNext} setXIsNext={setXIsNext} setGameOver={setGameOver} setWinner={setWinner}/>
        </div>
        <div className="board-row">
        <Square coordinate={[2,0]} xIsNext={xIsNext} setXIsNext={setXIsNext} setGameOver={setGameOver} setWinner={setWinner}/>
        <Square coordinate={[2,1]} xIsNext={xIsNext} setXIsNext={setXIsNext} setGameOver={setGameOver} setWinner={setWinner}/>
        <Square coordinate={[2,2]} xIsNext={xIsNext} setXIsNext={setXIsNext} setGameOver={setGameOver} setWinner={setWinner}/>
        </div>
        </>
      );
   }
   

   export function Square({coordinate, handleClick, xIsNext, setXIsNext, gameOver, setGameOver, setWinner}) {

    const [value, setValue] = useState(null);
    const [squarePlayed, setSquarePlayed] = useState(false);

    async function handleClick() {
      
      if(!squarePlayed) {
        if(xIsNext) {
          setValue("X");
          console.log("Calling makeMove with coordinate: " + coordinate + "and value: " + 1);
          let winner = await makeMove(coordinate, 1);
          if(winner != -1){
            console.log("Winner is: " + winner);
            setGameOver(true);
            setWinner(winner);
          }else{
            setXIsNext(!xIsNext)
            setSquarePlayed(true);
          }

        } else {
          setValue("O");
          console.log("Calling makeMove with coordinate: " + coordinate + "and value: " + 2);
          let winner = await makeMove(coordinate, 2);
          if(winner != -1){
            console.log("Winner is: " + winner);
            setGameOver(true);
            setWinner(winner)
          }else{
            setXIsNext(!xIsNext)
            setSquarePlayed(true);
          }
        }
      
    }
  }

    return (
      <button className="square" onClick={handleClick}>
        {value}
      </button>
    );
  }