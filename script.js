$(document).ready(function(){
    var defineCardBody = $(".card-body");
    var startQuiz = $(".startQuiz");
    var button1 = $("#button1");
    var button2 = $("#button2");
    var button3 = $("#button3");
    var button4 = $("#button4");
    var answerButtons = $(".answerButtons");
    var highscoreButtons = $(".highscorebuttons");
    var listIdentifier = $("#list");
    var correctAnswer = $(".correct");
    var wrongAnswer = $(".wrong");
    var buttonArray = [button1,button2,button3,button4];
    var h1Selector = $("H1");
    var h2Selector = $("H2");
    var formIdentifier = $("form");
    var footerSelector = $(".card-footer");
    var highscoreSelector = $(".highscore");
    var timer = document.querySelector(".timer");
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
    var gameStarted = false;
    var questionNumber = 0;
    var startTime = 10;
    var elapsedTime = 0;
    var timerInterval;
    var score = startTime - elapsedTime;

    $(".answerButtons").on("click",
        function(event){
            console.log(event.target);
            event.preventDefault();
            h1Selector.html(questionArray[questionNumber]);
            if(gameStarted){
                questionNumber++;
                h1Selector.html(questionArray[questionNumber]);
                updateButtons();
            }
            if(questionNumber===5)
            {
                gameOver();
            }
        }
    )

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

    $(".highscore").on("click",
        function(event){
            gameOver();
            clearQuestion();
            hideButtons();
            $("#startQuiz").css("display","none");
            $(highscoreButtons).css({"display":"inline","text-align":"left"});
            $("H2").html("");
            h1Selector.html("High Scores");
            var newForm = document.createElement("form");
            var newSubmitButton = document.createElement("button");
            var newInputBox = document.createElement("input");
            newSubmitButton.textContent = "Submit"
            h1Selector.append(newForm);
            newForm.append(newInputBox);
            newForm.append(newSubmitButton);
            $(newForm).on("submit", function(event){
                var highscoreInitials = newInputBox.value;
                var newLine = document.createElement("li");
                newLine.textContent = highscoreInitials;
                formIdentifier.append(newLine);
                console.log(newInputBox.value);
                newInputBox.remove();
                newSubmitButton.remove();
            })
        }
    )

    $("#goback").on("click",
        function(event){
            location.reload();
        }
    )

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

    function gameOver(){
        clearInterval(timerInterval);
        clearQuestion();
        hideButtons();
        h1Selector.html("All done!");
        h2Selector.html("Your final score is " + timer.innerHTML);
        h1Selector.css("text-align","left");
        h2Selector.css({"text-align":"left","font-size":"15px"});
    }

    function updateButtons(){
        for(i=0;i<buttonArray.length;i++){
            buttonArray[i].html(answerArray[questionNumber][i]);
        }
    }

    function hideButtons(){
        answerButtons.css("display","none");
    }

    function clearQuestion(){
        defineCardBody.html("");
        answerButtons.html("");
    }

    function startTimer(){
        timer.innerHTML--;
        elapsedTime++;
        //Change at some point
        if(startTime - elapsedTime<=0){
            gameOver();
        }
    }

    $(document).on("submit",function(event){
            event.preventDefault();
            var lineItem = $("<li></li>");
            listIdentifier.append(lineItem);
        }
    )
})