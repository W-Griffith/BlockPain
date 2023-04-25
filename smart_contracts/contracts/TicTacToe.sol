// https://github.com/schemar/TicTacToe/blob/master/contracts/TicTacToe.sol
// https://github.com/0xsergen/tic-tac-toe-dapp/blob/main/hardhat/contracts/TicTacToe.sol
// ^^ Cool contracts I am referencing to set up

pragma solidity ^0.8.10;

contract TicTacToe{

    uint public gameNumber = 0;

    struct GameState{
        uint gameid;
        address playerOne;
        address playerTwo;
        PlayerInfo[3][3] board;
        PlayerInfo nextTurn;
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
        game.playerTurn = PlayerInfo.PlayerOne;
        game.gameId = gameNumber;
        games[gameNumber] = game;
        gameNumber++;

        emit NewGame(msg.sender, playerOne);

    }


    event NewGame(address playerOne, uint gameID)



}