var player2Array = [];
var player1Array = [];

var winningArray = [ [0,1,2],
                     [0,3,6],
                     [0,4,8],
                     [1,4,7],
                     [2,4,6],
                     [2,5,8],
                     [3,4,5],
                     [6,7,8],
                    ];

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
    $("#playertwo").css("right", "2.5%");

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

    // $("#player1-name").on("change", function(){
                // var nameOne = $("#player1-name").val();
                // console.log(nameOne);
                // console.log(nameOne.length);
                //     if (nameOne.length === 0) {
                //         $("#player1-name").after("<p id='error-text'>Name can't be empty</p>");
                //     }
                // });

    $("#start .button").on("click", function() {
        $("#error-text").remove();
        if ($("#player1-name").val() == "" || $("#player2-name").val() == "") {

            $("#start .button").before("<p id='error-text'>Name can't be empty</p>");
        } else {
            $("#start").hide();
            $("#board").show();
            playerOneName = $("#player1-name").val();
            playerTwoName = $("#player2-name").val();
            //board();
            if ( $("input[name='choice']:checked").val() == "single" ) {
                playerTwoName = "Computer";
                $("#player1").append("<br>" + playerOneName);
                $("#player2").append("<br>" + playerTwoName);
            } else {
                $("#player1").append("<br>" + playerOneName);
                $("#player2").append("<br>" + playerTwoName);
            
            }
        board(playerOneName, playerTwoName);
        }
    });


}

startScreen();

function turn(player) {
    if (player === "player1") {
        $("#player1").addClass("active");
        $("#player2").removeClass("active");
    } else if (player === "player2") {
        $("#player2").addClass("active");
        $("#player1").removeClass("active");
    }
}

function board(playerOneName, playerTwoName) {
    turn("player1");
    $("li.box").on({
        "click": function() {
            if ($(this).attr("clicked") !== "true" && $("#player1").hasClass("active")) {
                $(this).attr("clicked", "true").addClass("box-filled-1");
                index = $(this).index();
                player1Array.push(index);
                console.log(player1Array);

                winner = checkWinner(player1Array);
                draw = checkDraw();
                if (!winner && !draw) {
                    console.log(winner);
                    turn("player2");
                } else if (winner) {
                    gameOverScreen("screen-win-one");
                } else if (draw) {
                    gameOverScreen("screen-win-tie");
                }

                
            } else if ($(this).attr("clicked") !== "true" && $("#player2").hasClass("active")) {
                $(this).attr("clicked", "true").addClass("box-filled-2");
                index = $(this).index();
                player2Array.push(index);
                console.log(player2Array);

                winner = checkWinner(player2Array);
                draw = checkDraw();
                if (!winner && !draw) {
                    turn("player1");
                } else if (winner) {
                    gameOverScreen("screen-win-two");
                } else if (draw) {
                    gameOverScreen("screen-win-tie");
                }

                
                
            }
        }, "mouseover": function() {
            if ($(this).attr("clicked") !== "true" && $("#player1").hasClass("active")) {
                $(this).css("background-image", "url(./img/o.svg)");
            } else if ($(this).attr("clicked") !== "true" && $("#player2").hasClass("active")) {
                $(this).css("background-image", "url(./img/x.svg)");
            }
        }, "mouseout": function() {
            //if ($(this).attr("clicked") !== true && $("#player1").hasClass("active")) {
                $(this).css("background-image", "");
            //}
        }
    });
}


function checkWinner(player) {
    for (var i=0; i < winningArray.length; i++){    
        var winNums = winningArray[i];
        console.log(winNums);

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

function checkDraw() {
    if (player1Array.length + player2Array.length === 9) {
        return true;
    }
}

function gameOverScreen(result) {
    $("#board").hide();
    $("#start").remove();
    if(result === "screen-win-tie") {
    $("body").append("<div class='screen screen-win " + result + "' id='finish'>" +
         "<header><h1>Tic Tac Toe</h1><p class='message'>It's a Draw</p><a href='#' class='button'>New game</a></header</div>");       
    } else {
    $("body").append("<div class='screen screen-win " + result + "' id='finish'>" +
         "<header><h1>Tic Tac Toe</h1><p class='message'>Winner</p><a href='#' class='button'>New game</a></header</div>");
    }

    $("#finish .button").on("click", function() {
        
        newGame();
        
    });
}


function newGame() {
    //hide game over screen
    $("#finish").remove();
    //show board
    $("#board").show();

    //reset variables, classes and attributes
    player2Array = [];
    player1Array = [];
    $("li.box").removeAttr("clicked").removeClass("box-filled-1").removeClass("box-filled-2");
    // invoke previous game choice
    board(playerOneName, playerTwoName);
    
}