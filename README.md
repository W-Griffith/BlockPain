# BlockPain

In order to run everything, it is assumed you have nodeJS installed and updated, as well as hardhat and the web3 javascript library.

Set up 3 terminals.  
 **1) To start, in the first terminal, cd into smart_contracts and run**
 ```bash
 npx hardhat node
 ```
 This will start a blockchain network on your localhost.
 If that DOESN'T work, you can try being sure the hardhat toolbox is installed with 
 ```bash
 npm install --save-dev @nomicfoundation/hardhat-toolbox
 ```
 An alternative is
 ```
 npm install hardhat
 ```
 
 **2) Then, in the second terminal, cd into smart_contracts and run**
 ```bash
 npx hardhat run --network localhost ./scripts/deploy.js
 ```
  This runs the deploy script!

**3) In the third terminal cd into the client directory (cd client), then run**
```
npm run dev
```

IF you get a message saying 'vite' is not recognized as an internal or external command, operable program or batch file, run the following command:
```
npm install
```
Now, try npm run dev one more time.

Now, we have a front-end that can interact with out hardhat blockchain! Open the web browser of your choice, and go to the website:

```
http://localhost:5173/
```
 
 The website has additional instructions on how everyhing works, if you are interested.
