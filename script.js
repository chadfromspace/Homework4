$(document).ready(function(){
    //Variables to define the different classes and ID's.
    var defineCardBody = $(".card-body");
    var startQuiz = $(".startQuiz");
    var button1 = $("#button1");
    var button2 = $("#button2");
    var button3 = $("#button3");
    var button4 = $("#button4");
    var answerButtons = $(".answerButtons");
    var highscoreButtons = $(".highscorebuttons");
    var listIdentifier = $("#list");
    var buttonArray = [button1,button2,button3,button4];
    var h1Selector = $("H1");
    var h2Selector = $("H2");
    var timer = document.querySelector(".timer");
    //Variables to keep track of the state of the game.
    var gameStarted = false;
    var questionNumber = 0;
    var startTime = 75;
    var elapsedTime = 0;
    var timerInterval;
    var scoreArray = [];
    //Arrays to keep track of the questions and answers.
    var questionArray = ["Commonly used data types <strong>DO NOT</strong> include:",
    "The condition in an if / else statement is enclosed within_____.",
    "Arrays in JavaScript can be used to store_____.",
    "String values must be enclosed within _____ when being assigned to variables.",
    "A very useful tool used during development and debugging for printing content to the debugger is:",
    ""
    ];
    var answerArray = [["1. Strings","2. Booleans","3. Alerts","4. Numbers"],
    ["1. Quotes","2. Curly Brackets","3. Parentheses","4. Square Brackets"],
    ["1. Numbers and Strings","2. Other Arrays","3. Booleans","4. All of the Above"],
    ["1. Commas","2. Curly Brackets","3. Quotes","4. Parentheses"],
    ["1. JavaScript","2. Terminal / Bash","3. For Loops","4. Console.log"],
    []
    ];
    scoreArray.push(localStorage.getItem("highscore"));
    if(scoreArray[0]!=null){
        var scoreArraySplit = scoreArray[0].split(",");
        scoreArray = [];
        for(i=1;i<scoreArraySplit.length;i++){
            scoreArray.push(scoreArraySplit[i]);
        }
    }
    //Answer buttons function
    $(".answerButtons").on("click",
        function(event){
            score = timer.innerHTML;
            if(gameStarted){
                questionNumber++;
                h1Selector.html(questionArray[questionNumber]);
                updateButtons();
            }
            if(event.target.id==="button3" && questionNumber===1){
                $(".correct").css("display","block");
                setTimeout(hideAnswerResponse,700);
            } else if (event.target.id!=="button3" && questionNumber===1){
                $(".wrong").css("display","block");
                setTimeout(hideAnswerResponse,700);
                timer.innerHTML = timer.innerHTML-10;
            }
            if(event.target.id==="button3" && questionNumber===2){
                $(".correct").css("display","block");
                setTimeout(hideAnswerResponse,700);
            } else if (event.target.id!=="button3" && questionNumber===2){
                $(".wrong").css("display","block");
                setTimeout(hideAnswerResponse,700);
                timer.innerHTML = timer.innerHTML-10;
            }
            if(event.target.id==="button4" && questionNumber===3){
                $(".correct").css("display","block");
                setTimeout(hideAnswerResponse,700);
            } else if (event.target.id!=="button4" && questionNumber===3){
                $(".wrong").css("display","block");
                setTimeout(hideAnswerResponse,700);
                timer.innerHTML = timer.innerHTML-10;
            }
            if(event.target.id==="button3" && questionNumber===4){
                $(".correct").css("display","block");
                setTimeout(hideAnswerResponse,700);
            } else if (event.target.id!=="button3" && questionNumber===4){
                $(".wrong").css("display","block");
                setTimeout(hideAnswerResponse,700);
                timer.innerHTML = timer.innerHTML-10;
            }
            if(event.target.id==="button4" && questionNumber===5){
                $(".correct").css("display","block");
                setTimeout(hideAnswerResponse,700);
                gameOver();
                clearInterval(timerInterval);
            } else if (event.target.id!=="button4" && questionNumber===5){
                $(".wrong").css("display","block");
                setTimeout(hideAnswerResponse,700);
                timer.innerHTML = timer.innerHTML-10;
                score = score-10;
                gameOver();
                clearInterval(timerInterval);
            }
            
        }
    )
    //Start quiz button function
    $(startQuiz).on("click", 
        function(event){
            event.preventDefault();
            if(!gameStarted){
                timerInterval = setInterval(startTimer,1000);
                timer.innerHTML = startTime;
                startGame();     
            }
        }
    )
    //High score button function
    $(".highscore").on("click",viewHighscores);
    //Go back button function
    $("#goback").on("click",
        function(event){
            location.reload();
        }
    )
    //Function to hide the answer responses.
    function hideAnswerResponse(){
        $(".correct").css("display","none");
        $(".wrong").css("display","none");
    }
    //Function to instantiate the submit button and input box.
    function instantiateSubmitButton(){
        var newForm = document.createElement("form");
        var newSubmitButton = document.createElement("button");
        var newInputBox = document.createElement("input");
        newSubmitButton.textContent = "Submit";
        newForm.innerHTML = "Enter Initials:"
        defineCardBody.append(newForm);
        newForm.append(newInputBox);
        newForm.append(newSubmitButton);
        $(newForm).on("submit", function(event){
            scoreArray.push(newInputBox.value+" - "+score);
            localStorage.setItem("highscore",scoreArray);
            newInputBox.remove();
            newSubmitButton.remove();
            viewHighscores();
        })
    }
    //Function to view high scores.
    function viewHighscores(){
        clearInterval(timerInterval);
        clearQuestion();
        hideButtons();
        $("#startQuiz").css("display","none");
        $(highscoreButtons).css({"display":"inline","text-align":"left"});
        $("H2").html("");
        h1Selector.html("High Scores");
        for(i=0;i<scoreArray.length;i++){
            var newScore = document.createElement("div");                    
            $(newScore).addClass("highscores");
            x=i+1;
            newScore.innerHTML = x+". "+scoreArray[i];
            $(".card-body").append(newScore);
        }
    }
    //Function to start the game.
    function startGame(){
        gameStarted = true;
        clearQuestion();
        updateButtons();
        h1Selector.html(questionArray[questionNumber]);
        startQuiz.css("display","none");
        answerButtons.css({"justify-content":"left","display":"block"});
        $("#inputIdentifier").css("display","block");
        $("#submitButton").css("display","block");
    }
    //Function to end the game.
    function gameOver(){
        clearQuestion();
        hideButtons();
        h1Selector.html("All done!");
        h2Selector.html("Your final score is " + score + ".");
        h1Selector.css("text-align","left");
        h2Selector.css({"text-align":"left","font-size":"15px"});
        instantiateSubmitButton();
    }
    //Function to update the answer buttons.
    function updateButtons(){
        for(i=0;i<buttonArray.length;i++){
            buttonArray[i].html(answerArray[questionNumber][i]);
        }
    }
    //Function to hide the answer buttons.
    function hideButtons(){
        answerButtons.css("display","none");
    }
    //Function to clear the html content of the card body and the answer buttons.
    function clearQuestion(){
        defineCardBody.html("");
        answerButtons.html("");
    }
    //Function to start the timer.
    function startTimer(){
        if(elapsedTime>=75){
            timer.innerHTML=0;
            clearInterval(timerInterval);
            gameOver();
        } else {timer.innerHTML--;
                elapsedTime++;
        }
    }
    //Clear scores button function.
    $("#clearscores").on("click",function(){
            var updateScores = localStorage.setItem("highscore",[]);
            $(".card-body").remove();
        }
    )
})