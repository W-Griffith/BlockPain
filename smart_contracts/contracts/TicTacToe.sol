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
        bool gameOver;
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
        if(game.gameOver){
            return false;   //Game's over!
        }
        if(game.board[row][col] != PlayerInfo.None){      
            return false;   //Not an empty spot
        }


        PlayerInfo currentPlayer;
        if(game.playerOne == msg.sender){
            currentPlayer = PlayerInfo.Player1;
            game.nextTurn = game.playerTwo;
        }else{
            currentPlayer = PlayerInfo.Player2;
            game.nextTurn = game.playerOne;
        }

        game.board[row][col] = currentPlayer;
        emit MoveMade(gameID, row, col);


        (PlayerInfo winner, bool isGameOver) = gameOver(game.board);

        if(isGameOver){
            game.gameOver = true;
            if(winner == PlayerInfo.Player1){
                emit GameOver(gameID, PlayerInfo.Player1);
            }
            else if(winner == PlayerInfo.Player2){
                emit GameOver(gameID, PlayerInfo.Player2);
            }else{
                emit GameOver(gameID, PlayerInfo.None);
            }
        }

        return true;

    }


    /**
    * @param board : The current board to deterine if there's a winner
    * @return winner isGameOver : Returns the winner of the game, otherwise returns None. Says whether or not the game is over. If there's more moves to be made, it returns false
    * Ex - If it's a tie, it will return PlayerInfo.None, False
    * Ex - If there are more moves to make but no winners, return PlayerInfo.None, True
     */
    function gameOver(PlayerInfo[3][3] memory board) public returns (PlayerInfo winner, bool isGameOver){
        //Is there a winner in each row?
        for(uint i = 0; i < 3; i++){
            if(board[i][0] == board[i][1] && 
                board[i][1] == board[i][2] &&
                board[i][2] != PlayerInfo.None){
                    return (board[i][0], true);
                }
        }

        //Is there a winner in each column?
        for(uint i = 0; i < 3; i++){
            if(board[0][i] == board[1][i] &&
                board[1][i] == board[2][i] && 
                board[2][i] != PlayerInfo.None){
                    return (board[0][i], true);
                }
        }

        //Is there a winner in the diagonals?
        //Yea pretty ugly...
        if((board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[2][2] != PlayerInfo.None)
         || (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[2][0] != PlayerInfo.None)){
            return (board[1][1], true);
         }

    return (PlayerInfo.None, false);
    }




    event NewGame(address playerOne, uint gameID);
    event GameFull(uint gameID, address playerOne, address playerTwo);
    event MoveMade(uint gameID, uint row, uint col);
    event GameOver(uint gameID,  PlayerInfo winner);



}