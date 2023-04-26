// https://github.com/schemar/TicTacToe/blob/master/contracts/TicTacToe.sol
// https://github.com/0xsergen/tic-tac-toe-dapp/blob/main/hardhat/contracts/TicTacToe.sol
// ^^ Cool contracts I am referencing to set up

pragma solidity ^0.8.10;

contract TicTacToe{

    uint public gameNumber = 0;
    

    struct GameState{
        uint gameId;
        address playerOne;
        address playerTwo;
        bool gameFull;
        PlayerInfo[3][3] board;
        address nextTurn;
        PlayerInfo winner;
    }

    GameState[] public games;

    //All possible players
    enum PlayerInfo{
        None,
        Player1,
        Player2
    }

    function startNewGame() public {
        GameState memory game;
        game.nextTurn = msg.sender;
        game.gameId = gameNumber;
        game.playerOne = msg.sender;
        games.push(game);       //Games at index i will be the ith game played
        gameNumber++;

        emit NewGame(msg.sender, game.gameId);

    }


    //Adds a second player to the game. Player1 will always be the one who started the game.
    //Player2 will be the one who calls this function.
    function addPlayer(uint gameID) public returns (bool flag){
        address newPlayer = msg.sender;
        GameState storage game = games[gameID];

        if(game.gameFull){
            return false;
        }

        game.playerTwo = newPlayer;
        game.gameFull = true;
        emit GameFull(gameID, game.playerOne, game.playerTwo);
        return true;
    }

    function makeMove(uint row, uint col, uint gameID) public returns (bool success){
        GameState storage game = games[gameID];

        if(game.nextTurn != msg.sender){
            return false;   //Not your turn!
        }
        if(game.gameFull == false){
            return false;   //Need two players before making a move
        }
        if(row > 2 || col > 2 || row < 0 || col < 0){
            return false;   //Out of bounds
        }
        if(game.board[row][col] != PlayerInfo.None){      
            return false;   //Not an empty spot
        }

        PlayerInfo currentPlayer;
        if(game.playerOne == msg.sender){
            currentPlayer = PlayerInfo.Player1;
        }else{
            currentPlayer = PlayerInfo.Player2;
        }

        game.board[row][col] = currentPlayer;
        emit MoveMade(gameID, row, col);
        return true;

        //TODO : Check for a winner (probably should be a seperate function call)

    }


    event NewGame(address playerOne, uint gameID);
    event GameFull(uint gameID, address playerOne, address playerTwo);
    event MoveMade(uint gameID, uint row, uint col);



}