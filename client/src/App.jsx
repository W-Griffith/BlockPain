//import { useState } from 'react'
import { GameBoard, Controls,} from './components'
import './App.css'

//import { ethers } from 'hardhat';
import Web3 from 'web3';
import contractABI from './ticTacToeABI.json';



const web3 = new Web3('http://localhost:8545'); //I'm connecting this to the same port that our local react app is running on.
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const contract = new web3.eth.Contract(contractABI, contractAddress);
let currentGameId = 0;
let playerOne;
let playerTwo;


const demoGame = async () => {

  //const metaMask = new ethers.providers.Web3Provider(window.ethereum);
 
  const addressess = await web3.eth.getAccounts();
  const receipt = await contract.methods.startNewGame().send({
    from: addressess[0]
  })

  playerOne = addressess[0];
  console.log(receipt.events['NewGame'].returnValues['gameID']);
  currentGameId = receipt.events['NewGame'].returnValues['gameID'];

}

const joinGame = async () => {
  
    const addressess = await web3.eth.getAccounts();
    const receipt = await contract.methods.joinGame(currentGameId).send({
      from: addressess[1]
    })
  
    playerTwo = addressess[1];
    console.log(receipt.events);
}

  //Function called when move is made.
  /**
   * 
   * @param {*} coordinates - An array of format [row, col] indicating where the move was made
   * @param {*} fromPlayer - An integer indicating which player made the move (1 or 2)
   * @returns - The number of the player who won, or -1 if no one has won yet.
   */
  export async function makeMove(coordinates, fromPlayer){ 
    const addressess = await web3.eth.getAccounts();
      let from;
      if(fromPlayer == 1){
        from = addressess[0];
      }else{
        from = addressess[1];
      }
      const row = coordinates[0];
      const col = coordinates[1];

      const receipt = await contract.methods.makeMove(row, col, currentGameId).send({
        from: from
      })
    
      console.log(receipt.events);
      if(receipt.events['GameOver']){
        console.log("Game Over");
        console.log(receipt.events['GameOver'].returnValues['winner'])
        return receipt.events['GameOver'].returnValues['winner'];
      }
      return -1;
}

function App() {

  return (
    
    <div className='Main_background'>
      <button onClick={demoGame}> Start Game!</button>
      <button onClick={joinGame}> Join Game</button>
      <GameBoard />
      <Controls />
      <b>First, click 'Start Game!'. This will communicate with the smart contract that
        a game is starting, and will assign player 1 a wallet address. The wallet addressess are the hardhat node default
        addressess. Then, click 'Join Game'. This will assign player 2 a wallet address.</b>
    <p></p>
      <b>
        In a real implementation, players would use their own wallets, but with this prototype, we are using the hardhat node wallets all the time. Additionally, it is assumed both players are on the same machine. This would be changed in a real implementation, since the smart contract needs multiple addressess and a gameID, but not for the players to be restricted to the same machine.
        Next, you are ready to start playing! Click on a square to make a move. The game will end when someone wins, or when the board is full. To play again, refresh the page.
      </b>
      <p></p>
      <b>
        All the game logic is actually handled through the smart contract. The react app is just a front end that communicates with the smart contract. This ensures a fair game, as the smart contract is the source of truth for the game state.
        If you are interested, you can view the console in the app. We are logging some of the smart contract events to the console. You can see the game state being updated in real time if you are inclined.
      </b>
      



    </div>

  )
}

export default App