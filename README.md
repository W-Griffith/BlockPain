# BlockPain

In order to run everything, it is assumed you have nodeJS installed and updated, as well as hardhat and the web3 javascript library.

Set up 3 terminals.
In the first terminal, run
```
npx hardhat node
```

In the second terminal, run
```
npx hardhat run --network localhost ./scripts/deploy.js
```

In the third terminal, run
```
npm run dev
```

Now, we have a front-end that can interact with out hardhat blockchain! Open the web browser of your choice, and go to the website:

```
http://localhost:5173/
```
 
 The website has additional instructions on how everyhing works, if you are interested.
 
# Front-end
  In order to check the front-end design, cd into the client directory and run the following command: "npm run dev".
  This command will run the React application on a local-host port.
  
# Solidity
 In order to check the Solidity contract that we are writing for the back-end, cd into the smart_contracts directory and run the following command: "npx hardhat test".
 This command will run the test file for the our contract.
 
  
 First, in a temrinal, run 
 ```bash
 npx hardhat node
 ```
 This will start a blockchain network on your localhost.
 If that DOESN'T work, you can try being sure the hardhat toolbox is installed with 
 ```bash
 npm install --save-dev @nomicfoundation/hardhat-toolbox
 ```
 
 Then, in a seperate terminal, cd into smart_contracts and run
 ```bash
 npx hardhat run --network localhost ./scripts/deploy.js
 ```
 
 This runs the deploy script!
