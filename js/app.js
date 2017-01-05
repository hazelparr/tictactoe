
(function() {

    

    // list of all winning conditions
    var winningArray = [ [0,1,2],
                         [0,3,6],
                         [0,4,8],
                         [1,4,7],
                         [2,4,6],
                         [2,5,8],
                         [3,4,5],
                         [6,7,8],
                        ];



    //initialise variable for players' clicked squares
    var player2Array = [];
    var player1Array = [];

    //initialise varaibles to test game conditions
    var winner;
    var draw;

    //initialise varaibles / caching
    var playerOneTab = $("#player1");
    var playerTwoTab = $("#player2");

    var index;

    var playerTwoName = null;

    function startScreen () {
        //on load, hides the board
        $("#board").hide();
        
        //start screen is displayed
        $("body").append("<div class='screen screen-start' id='start'><header><h1>Tic Tac Toe</h1>" + 
            "<div id='game-choice'><p><label> Single Player   </label><input type='radio' name='choice' value='single'></p>"+
            "<p><label> Two Player   </label><input type='radio' name='choice' value='two'></p>"+
            "</div><a href='#' class='button'>Start game</a></header></div>");
        $("#game-choice").css({"margin-top": "2em", "margin-bottom": "2em"});
        
        //Add player names to the board
        $("header").append('<p class="playertext"><span id="playerone"></span><span id="playertwo"></span></ul>');
        $("li.players").css("color", "black");

        //Add radio buttons for user to choose a single player game or two players
        $("input[name='choice']").change( function(){
            if ( ($("input[name='choice']:checked").val()) == "single" ) {
                $("#single-player").remove();
                $("#two-player").remove();
                $("#error-text").remove();
                $("#game-choice").append("<div id='single-player'><p><label for='player1'>Enter Player name:</label></p><p><input type='text' class='player1' name='player1' id='player1-name'</p></div>");
                console.log("single player");

            } else {
                $("#single-player").remove();
                $("#two-player").remove();
                $("#error-text").remove();
                console.log("two player");
                $("#game-choice").append("<div id='two-player'><p><label for='player1'>Enter Player 1 name:</label></p><p><input type='text' class='player1' name='player1' id='player1-name'</p>" + 
                    "<p><label for='player2'>Enter Player 2 name:</label></p><p><input type='text' class='player2' name='player2' id='player2-name'</p></div>");
            }
        });

    //handles the player's game choice, validates if the name field is empty
        $("#start .button").on("click", function() {
            
            //resets error message
            $("#error-text").remove();

            //checks if the name field is empty
            if ($("#player1-name").val() === "" || $("#player2-name").val() === "") {

                $("#start .button").before("<p id='error-text'>Name can't be empty</p>");
            } else {
                $("#start").hide();
                $("#board").show();
                playerOneName = $("#player1-name").val();
                playerTwoName = $("#player2-name").val();
               
               // adds the name inputs to the board
                if ( $("input[name='choice']:checked").val() == "single" ) {
                    playerTwoName = "Computer";
                    playerOneTab.append("<br>" + playerOneName);
                    $("#player2").append("<br>" + playerTwoName);
                } else {
                    playerOneTab.append("<br>" + playerOneName);
                    $("#player2").append("<br>" + playerTwoName);
                
                }
            //if validation is ok, will call the board function which starts the game
            board(playerOneName, playerTwoName);
            }
        });


    }

    //will immediately load the start screen
    startScreen();






            
    //function to determine / toggle the turn of the players
    function turn(player) {
        //debugger;
        if (player === "player1") {
            playerOneTab.addClass("active");
            playerTwoTab.removeClass("active");
        } else if (player === "player2") {
            playerTwoTab.addClass("active");
            playerOneTab.removeClass("active");
        }
        if (playerTwoName === "Computer" && player === "player2") {
            computerMove();
            }

    }



    //function handles all the events in the board
    function board(playerOneName, playerTwoName) {
        turn("player1");
        $("li.box").on({

            //when player clicks, will fill the square with the appropriate symbol
            "click": function() {

                if ($(this).attr("clicked") !== "true" && $("#player1").hasClass("active")) {
                    $(this).attr("clicked", "true").addClass("box-filled-1");
                    index = $(this).index();
                    player1Array.push(index);
                    console.log(player1Array);

                    winner = checkWinner(player1Array);
                    draw = checkDraw();
                    if (!winner && !draw) {
                        //debugger;
                        turn("player2");


                    } else if (winner) {
                        gameOverScreen(playerOneName);
                    } else if (draw) {
                        gameOverScreen("screen-win-tie");
                    }

                    
                } else if ($(this).attr("clicked") !== "true" && $("#player2").hasClass("active")) {
                        $(this).attr("clicked", "true").addClass("box-filled-2");

                        index = $(this).index();
                        player2Array.push(index);  

                        winner = checkWinner(player2Array);
                        draw = checkDraw();
                        if (!winner && !draw) {
                            turn("player1");
                        } else if (winner) {
                            gameOverScreen(playerTwoName);
                        } else if (draw) {
                            gameOverScreen("screen-win-tie");
                        }
                    }

                
            //event handlers when player hovers over empty squares
            }, "mouseover": function() {
                if ($(this).attr("clicked") !== "true" && $("#player1").hasClass("active")) {
                    $(this).css("background-image", "url(./img/o.svg)");
                } else if ($(this).attr("clicked") !== "true" && $("#player2").hasClass("active")) {
                    $(this).css("background-image", "url(./img/x.svg)");
                }
            }, "mouseout": function() {
                
                    $(this).css("background-image", "");
                
            }
        });
    }

    //checks if the game has a winner by checking it against the winning array
    function checkWinner(player) {
        for (var i=0; i < winningArray.length; i++){    
            var winNums = winningArray[i];

            for (var j=0; j < winNums.length; j++) {
                var num = winNums[j];
                var compare = player.indexOf(num);
                console.log(compare);
                

                if (compare === -1) {
                    break;
                }

                if(j === winNums.length - 1) {
                    console.log(player1Array);
                    console.log("we have a winner");
                    return true;
                    
                }
            } 
        }        
    }

    // checks if there is a draws
    function checkDraw() {
        if (player1Array.length + player2Array.length === 9) {
            return true;
        }
    }

    // renders the winner's name or if it's a draw
    function gameOverScreen(result) {
        $("#board").hide();
        $("#start").remove();

        // checks if there is a draw first
        if(result === "screen-win-tie") {
        $("body").append("<div class='screen screen-win " + result + "' id='finish'>" +
             "<header><h1>Tic Tac Toe</h1><p class='message'>It's a Draw</p><a href='#' class='button'>New game</a></header</div>");       
        
        //winning screen for player one
        } else if (result === playerOneName) {
        $("body").append("<div class='screen screen-win screen-win-one' id='finish'>" +
             "<header><h1>Tic Tac Toe</h1><p class='message'>"+ result + " wins</p><a href='#' class='button'>New game</a></header</div>");
        
        //winning screen for player two
        } else {
        $("body").append("<div class='screen screen-win screen-win-two' id='finish'>" +
        "<header><h1>Tic Tac Toe</h1><p class='message'>"+ result + " wins</p><a href='#' class='button'>New game</a></header</div>");
        }

        //resets the game 
        $("#finish .button").on("click", function() {
            newGame();
            
        });
    }

    //resets game, with empty squares
    function newGame() {
        //hide game over screen
        $("#finish").remove();
        //show board
        $("#board").show();

        //reset variables, classes and attributes
        player2Array = [];
        player1Array = [];
        $("li.box").removeAttr("clicked").removeClass("box-filled-1");
        $("li.box").removeClass("box-filled-2");
        // invoke previous game choice
        board(playerOneName, playerTwoName);
        
    }

    // controls the "AI" for the computer
    function computerMove() {
        //find all the unoccupied squares
        var emptySquares = $(".box").not(".box-filled-1, .box-filled-2");
        console.log(emptySquares);

        //get random number from empty squares
        var randomSquare = Math.round(Math.random() * (emptySquares.length - 1));

        var computerChoice = $(emptySquares[randomSquare]);

        setTimeout( function() {
            computerChoice.click().addClass("box-filled-2");
        }, 300);
    }

})();
