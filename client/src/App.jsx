//import { useState } from 'react'
import { Scoreboard, GameBoard, Controls, NavBar } from './components'
import './App.css'

//import { ethers } from 'hardhat';
import Web3 from 'web3';
import contractABI from './ticTacToeABI.json';



const web3 = new Web3('http://localhost:8545'); //I'm connecting this to the same port that our local react app is running on.
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const contract = new web3.eth.Contract(contractABI, contractAddress);

const demoGame = async () => {

  //const metaMask = new ethers.providers.Web3Provider(window.ethereum);
 
  const addressess = await web3.eth.getAccounts();
  const receipt = await contract.methods.startNewGame().send({
    from: addressess[0]
  })

  console.log(receipt.events['NewGame'].returnValues);
  console.log(receipt.events.returnValues);

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
