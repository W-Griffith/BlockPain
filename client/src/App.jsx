//import { useState } from 'react'
import { Scoreboard, GameBoard, Controls, NavBar } from './components'
import './App.css'
import { useState } from 'react'

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
  console.log(addressess)
  const receipt = await contract.methods.startNewGame().send({
    from: addressess[0]
  })

  playerOne = addressess[0];
  console.log(receipt.events['NewGame'].returnValues['gameID']);
  currentGameId = receipt.events['NewGame'].returnValues['gameID'];

}

const joinGame = async () => {
  
    const addressess = await web3.eth.getAccounts();
    console.log(addressess)
    const receipt = await contract.methods.joinGame(currentGameId).send({
      from: addressess[1]
    })
  
    playerTwo = addressess[1];
    console.log(receipt.events);
}

// const makeMove = async (coordinates) => {
    
//       row = coordinates[0];
//       col = coordinates[1];
//       const addressess = await web3.eth.getAccounts();
//       console.log(addressess)
//       const receipt = await contract.methods.makeMove(currentGameID, row, col).send({
//         from: addressess[0]
//       })
    
//       console.log(receipt.events);
// }

function App() {

  return (
    
    <div className='Main_background'>
      <NavBar />
      <GameBoard />
      <Controls />
      <Scoreboard />

      <button onClick={demoGame}> Click me!</button>
      <button onClick={joinGame}> Join Game</button>

    </div>

  )
}

export default App
