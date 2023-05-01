//import { useState } from 'react'
import { Scoreboard, GameBoard, Controls, NavBar } from './components'
import './App.css'

import { ethers } from 'hardhat';
import contractABI from './ticTacToeABI.json';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const demoGame = async () => {

  const metaMask = new ethers.providers.Web3Provider(window.ethereum);
  const contract = await hre;

  const firstGame = await contract.method.startNewGame();

  alert(firstGame);


}

function App() {
 // const [count, setCount] = useState(0)

  return (
    
    <div className='Main_background'>
      <NavBar />
      <GameBoard />
      <Controls />
      <Scoreboard />

      <button onClick={demoGame}> Click me!</button>

    </div>

  )
}

export default App
